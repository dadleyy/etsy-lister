import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({

  urlForQuery(query) {
    return query.listing ? `/v2/shops/listing/${query.listing}` : `/v2/shops`;
  }

});
