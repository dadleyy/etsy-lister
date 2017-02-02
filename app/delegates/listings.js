import Ember from 'ember';

const {RSVP: deferred} = Ember;

export default Ember.Object.extend({
  store: Ember.inject.service(),

  init() {
    const filters = Ember.Object.create({});
    this.set('cache', []);
    this.set('filters', filters);
  },

  listings() {
    const filters = this.get('filters');
    const cache   = this.get('cache');
    const store   = this.get('store');

    function finish(result) {
      cache.replace(0, cache.length, [result]);
      return deferred.resolve(result);
    }

    function failed(err) {
      console.error(err);
      return deferred.reject(err);
    }

    let query = {keywords: filters.get('title')};
    return store.query('listing', query).then(finish).catch(failed);
  }

});
