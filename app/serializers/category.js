import DS from 'ember-data';

const type = 'category';

export default DS.JSONSerializer.extend({

  normalizeArrayResponse(store, Listing, payload) {
    const { results, count } = payload;
    const meta = { count };
    const data = [];

    for(let i = 0, c = results.length; i < c; i++) {
      let category = results[i];
      let { category_id: id } = category;
      let item = { type, id, attributes: category };
      data.push(item);
    }

    return { data, meta };
  }

});
