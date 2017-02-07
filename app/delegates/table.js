import Ember from 'ember';

const { RSVP: deferred } = Ember;

export default Ember.Object.extend({

  rows() {
    return deferred.resolve([]);
  },

  columns() {
  }

});
