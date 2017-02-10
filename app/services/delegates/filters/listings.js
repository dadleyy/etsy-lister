import Ember from 'ember';

export default Ember.Service.extend({
  singleton: false,

  init() {
    this.set('filter', { category: null });
  },

  copy() {
    const { category, title } = this.get('filter');
    return  { category, title };
  }

});
