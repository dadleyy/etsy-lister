import Ember from 'ember';

export default Ember.Service.extend({
  singleton: false,
  store: Ember.inject.service(),
  i18n: Ember.inject.service(),
  deferred: Ember.inject.service(),

  init() {
    this.set('filters', { });
    this.set('cache', [ ]);
  },

  sizes() {
    return [3, 5, 10];
  },

  columns() {
    const i18n = this.get('i18n');
    return [
      { text: i18n.t('listing_id'), rel: 'listing_id', style: 'width: 10%;' },
      { text: i18n.t('title'), rel: 'title', style: 'width: 35%;' },
      { text: i18n.t('shop'), rel: 'shop', style: 'width: 20%;' },
      { text: i18n.t('date_created'), rel: 'created', style: 'width: 15%;', sortable: true },
      { text: i18n.t('price'), rel: 'price', style: 'width: 8%;', sortable: true, align: 'right' },
      { text: i18n.t('thumbnail'), rel: 'thumbnail', style: 'width: 13%', align: 'center' }
    ];
  },

  rows({ pagination, sorting }) {
    const filters  = this.get('filters');
    const cache    = this.get('cache');
    const store    = this.get('store');
    const deferred = this.get('deferred');
    let id_list  = [];

    // need to keep track of which listing was reponsible for loading a given shop - the models themselves
    // have no direct relationship - api provides `/shops/listing/:id` endpoint to retreive the shop.
    let shop_map = {};

    function toRow(listing) {
      const [current] = cache;

      function findImages(img) {
        return img.get('listing_id') === listing.get('listing_id');
      }

      let images = current.images.filter(findImages);
      let shop = shop_map[listing.get('listing_id')];
      return { listing, images, shop };
    }

    function next(results) {
      const [image_records, shop_records] = results || [];
      const [current] = cache;

      if(image_records) {
        const image_array = image_records.toArray();
        current.images = current.images.concat(image_array);
      }

      if(shop_records) {
        const shop = shop_records.get('firstObject');
        current.shops.push(shop);
      }

      // end case - all other stuff has been loaded
      if(id_list.length === 0) {
        const rows = current.listings.map(toRow);
        return deferred.resolve({ rows, count: current.count });
      }

      const listing_record = store.peekRecord('listing', id_list.shift());
      const listing = listing_record.get('listing_id');
      const iter = deferred.delay(next, 850);

      function associate(shop_result) {
        shop_map[listing] = shop_result.get('firstObject');
        return deferred.resolve(shop_result);
      }

      return deferred.all([
        store.query('listing-image', { listing }),
        listing_record.findShop().then(associate)
      ]).then(iter);
    }

    function receive(listings) {
      // prepare new relation arrays for our shops and images
      let images = [];
      let shops = [];

      const { count } = listings.get('meta');
      const new_cache = { listings, images, shops, count };

      if(count === 0) {
        return deferred.resolve([{ empty: true }]);
      }

      // replace the existing cache w/ the new one
      cache.replace(0, cache.length, [new_cache]);

      // loop over each listing, getting their
      for(let i = 0, c = listings.get('length'); i < c; i++) {
        let { id } = listings.objectAt(i);
        id_list.push(id);
      }

      return next();
    }

    function failed(err) {
      console.error(err);
      return deferred.reject(err);
    }

    const sort_order = sorting.order ? 'up' : 'down';
    const { size: limit, page } = pagination;
    const offset = limit * page;

    let query = { offset, limit, sort_on: sorting.rel, sort_order };

    if(filters.title) {
      query.keywords = filters.title;
    }

    if(filters.category) {
      query.category = filters.category;
    }

    return store.query('listing', query).then(receive).catch(failed);
  }

});
