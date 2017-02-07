import Ember from 'ember';

const { RSVP: deferred } = Ember;

const ListingFilters = Ember.Object.extend({

  copy() {
    const title = this.get('title');
    return ListingFilters.create({ title });
  }

});

export default Ember.Object.extend({
  store: Ember.inject.service(),
  i18n: Ember.inject.service(),

  init() {
    const filters = ListingFilters.create({});
    this.set('cache', []);
    this.set('filters', filters);
  },

  columns() {
    const i18n = this.get('i18n');
    return [
      { text: i18n.t('listing_id'), rel: 'listing_id', style: 'width: 12%;' },
      { text: i18n.t('title'), rel: 'title', style: 'width: 66%;' },
      { text: i18n.t('thumbnail'), rel: 'thumbnail', style: 'width: 12%;' }
    ];
  },

  rows() {
    const filters = this.get('filters');
    const cache   = this.get('cache');
    const store   = this.get('store');
    const id_list = [];

    function toRow(listing) {
      const [current] = cache;

      function isAssociated(img) {
        return img.get('listing_id') === listing.get('listing_id');
      }

      return {listing, images: current.images.filter(isAssociated)};
    }

    function next(record) {
      let [current] = cache;

      if(record) {
        const image_records = record.toArray();
        current.images = current.images.concat(image_records);
      }

      if(id_list.length === 0) {
        return deferred.resolve(current.listings.map(toRow));
      }

      const listing = id_list.shift();
      return store.query('listing-image', { listing }).then(next);
    }

    function images(result) {
      const new_cache = {listings: result, images: []};
      cache.replace(0, cache.length, [new_cache]);
      id_list.replace(0, id_list.length, result.mapBy('id'));
      return next();
    }

    function failed(err) {
      console.error(err);
      return deferred.reject(err);
    }

    let query = {limit: 10};

    if(filters.get('title')) {
      query.keywords = filters.get('title');
    }

    return store.query('listing', query).then(images).catch(failed);
  }

});
