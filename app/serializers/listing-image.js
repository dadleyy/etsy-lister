import DS from 'ember-data';

const type = 'listing-image';

export default DS.RESTSerializer.extend({

  normalizeArrayResponse(store, Listing, payload) {
    let {results} = payload;
    let meta      = {};
    let data      = [];

    for(let i = 0, c = results.length; i < c; i++) {
      let listing = results[i];
      let {listing_image_id: id} = listing;
      let item    = {type, id, attributes: listing};
      data.push(item);
    }

    return {data, meta};
  }

});
