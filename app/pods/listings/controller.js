import Ember from 'ember';

export default Ember.Controller.extend({

  applySearch() {
    const value    = this.get('title_filter');
    const delegate = this.get('model.delegate');
    delegate.set('filters.title', value);
  },

  actions: {
    search({target}) {
      const {value} = target;
      this.set('title_filter', value);
      Ember.run.debounce(this, this.applySearch, 400);
    }
  }

});
