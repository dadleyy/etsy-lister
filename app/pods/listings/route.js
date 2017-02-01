import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    function finished(result) {
      let {content: listings} = result;
      return Ember.RSVP.resolve({listings});
    }

    return this.get('store').findAll('listing').then(finished);
  }

});
