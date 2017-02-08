import Ember from 'ember';

const {getOwner: owner} = Ember;

export default Ember.Route.extend({
  queryParams: { page: true },

  model(params) {
    const page = parseInt(params.page, 10);
    const delegate = owner(this).lookup('delegates:listings');
    const sorting = { rel: 'created' };
    const pagination = { page: page >= 1 ? page : 0, size: 3 };
    return Ember.RSVP.resolve({ delegate, sorting, pagination });
  }

});
