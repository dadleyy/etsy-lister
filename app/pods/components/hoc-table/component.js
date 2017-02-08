import Ember from 'ember';
import layout from 'charcoal/pods/components/hoc-table/template';
const { computed } = Ember;

const columns = computed('delegate', function() {
  const delegate = this.get('delegate');
  return delegate.columns();
});

const rows = computed('delegate.{filters,pagination,sorting}', 'sorting', function() {
  const sorting = this.get('sorting');
  const pagination = this.get('pagination');
  return this.get('delegate').rows({ sorting, pagination });
});

export default Ember.Component.extend({ layout, columns, rows });
