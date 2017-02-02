import Ember from 'ember';

const {getOwner: owner} = Ember;

export default Ember.Route.extend({
  model() {
    const delegate = owner(this).lookup('delegates:listings');
    return Ember.RSVP.resolve({delegate});
  }

});
