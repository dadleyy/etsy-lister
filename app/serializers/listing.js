import DS from 'ember-data';

const type = 'listing';

export default DS.RESTSerializer.extend({
  primaryKey: 'listing_id',

  normalizeArrayResponse(store, Listing, payload) {
    let {results} = payload;
    let meta      = {};
    let data      = [];

    for(let i = 0, c = results.length; i < c; i++) {
      let listing = results[i];
      let {listing_id: id} = listing;
      data.push(Object.assign({type, id}, listing));
    }

    return {data, meta};
  }

});
