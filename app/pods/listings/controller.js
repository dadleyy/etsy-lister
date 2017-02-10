import Ember from 'ember';

const { run, observer } = Ember;

export default Ember.Controller.extend({

  update: observer('model.filters.{filter}', function() {
    const { table } = this.get('model.delegates');
    const filter = this.get('model.filters').copy();
    table.set('filters', filter);
  }),

  applySearch() {
    const value    = this.get('title_filter');
    const filters = this.get('model.filters');
    const current  = filters.get('filter');
    filters.set('filter', Object.assign({}, current, {title: value }));
  },

  actions: {
    search({target}) {
      const {value} = target;
      this.set('title_filter', value);
      run.debounce(this, this.applySearch, 400);
    }
  }

});
