import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({

  urlForQuery(query) {
    const {listing} = query;
    return listing ? `/v2/listings/${listing}/images` : 'v2/listing-images';
  },


});
