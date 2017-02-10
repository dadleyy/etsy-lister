import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  deferred: inject.service(),
  filters: inject.service('delegates/filters/listings'),
  table: inject.service('delegates/tables/listings'),
  categories: inject.service('delegates/selects/categories'),

  queryParams: { page: true },

  model(params) {
    const page = parseInt(params.page, 10);

    const filters = this.get('filters');
    const table = this.get('table');
    const categories = this.get('categories');

    categories.set('filters', filters);
    table.set('filters', filters.copy());

    const sorting = { rel: 'created' };
    const pagination = { page: page >= 1 ? page : 0, size: 3 };

    const delegates =  { table, categories };
    return this.get('deferred').resolve({ delegates, filters, sorting, pagination });
  }

});
