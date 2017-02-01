import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: '/v2',

  urlForFindAll() {
    return '/v2/listings/active';
  }
});
