import DS from 'ember-data';

export default DS.Model.extend({
  listing_id   : DS.attr(),
  title        : DS.attr('string'),
  description  : DS.attr('string'),
  price        : DS.attr('string'),
  creation_tsz : DS.attr('number'),
  url          : DS.attr('string'),
  state        : DS.attr('string'),
  images       : DS.hasMany('listing-image'),

  findShop() {
    const store = this.get('store');
    const listing = this.get('listing_id');
    return store.query('shop', { listing });
  }

});
