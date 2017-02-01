import Ember from 'ember';

export default Ember.Route.extend({
  delegate: Ember.inject.service('listings'),

  model() {
    let delegate = this.get('delegate');
    return Ember.RSVP.resolve({delegate});
  }

});
