import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({

  urlForQuery() {
    return '/v2/listings/active';
  },

});
