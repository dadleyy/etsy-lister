import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: '/v2',

  urlForQuery() {
    return '/v2/listings/active';
  },

  urlForFindAll() {
    return '/v2/listings/active';
  }
});
