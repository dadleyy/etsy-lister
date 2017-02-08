import DS from 'ember-data';

const type = 'listing';

export default DS.JSONSerializer.extend({

  normalizeArrayResponse(store, Listing, payload) {
    const { results, count } = payload;
    const meta = { count };
    const data = [];

    for(let i = 0, c = results.length; i < c; i++) {
      let listing = results[i];
      let { listing_id: id } = listing;
      let item = { type, id, attributes: listing };
      data.push(item);
    }

    return { data, meta };
  }

});
