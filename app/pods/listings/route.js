import Ember from 'ember';

const {getOwner: owner} = Ember;

export default Ember.Route.extend({
  queryParams: { page: true },

  model(params) {
    const page = parseInt(params, 10);
    const delegate = owner(this).lookup('delegates:listings');
    const sorting = { rel: 'created' };
    const pagination = { current: page >= 1 ? page : 1 };
    return Ember.RSVP.resolve({ delegate, sorting, pagination });
  }

});
