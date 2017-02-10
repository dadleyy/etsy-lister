import Ember from 'ember';

const { inject } = Ember;

const limit = 5;

export default Ember.Service.extend({
  singleton: false,
  store: inject.service(),
  i18n: inject.service(),
  deferred: inject.service(),

  init() {
    this.set('cache', { categories: [] });
  },

  select(item) {
    const filters = this.get('filters');
    const current = filters.get('filter');

    const category = item.get('category_id');

    filters.set('filter', Object.assign({}, current, {category}));
  },

  options(query) {
    const deferred = this.get('deferred');
    let { categories } = this.get('cache');

    function filter(category) {
      const name = (category.get('page_title') || '').toLowerCase();
      return name.indexOf(query.toLowerCase()) !== -1;
    }

    if(categories.warm) {
      let result = (query ? categories.filter(filter) : categories).slice(0,5);
      return deferred.resolve(result);
    }

    function finished(result) {
      categories.warm = true;
      categories.replace(0, categories.length, result.toArray());
      let out = (query ? categories.filter(filter) : categories).slice(0,5);
      return deferred.resolve(out);
    }

    return this.get('store').query('category', { keywords: query, limit }).then(finished);
  }

});

