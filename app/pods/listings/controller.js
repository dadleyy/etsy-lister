import Ember from 'ember';

export default Ember.Controller.extend({

  applySearch() {
    const value    = this.get('title_filter');
    const delegate = this.get('model.delegate');
    const filters  = delegate.get('filters').copy();
    filters.set('title', value);
    delegate.set('filters', filters);
  },

  actions: {
    search({target}) {
      const {value} = target;
      this.set('title_filter', value);
      Ember.run.debounce(this, this.applySearch, 400);
    }
  }

});
