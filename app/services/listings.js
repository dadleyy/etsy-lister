import Ember from 'ember';
const {RSVP: deferred} = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service(),

  listings() {
    let store = this.get('store');

    function finish(result) {
      let {content: listings} = result;
      return deferred.resolve(listings);
    }

    return store.findAll('listing').then(finish);
  }

});
