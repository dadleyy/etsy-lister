import Ember from 'ember';
import layout from 'charcoal/pods/components/hoc-table/template';
const { computed } = Ember;

const columns = computed('delegate', function() {
  const delegate = this.get('delegate');
  return delegate.columns();
});

const rows = computed('delegate.{filters,pagination,sorting}', function() {
  return this.get('delegate').rows();
});


export default Ember.Component.extend({ layout, columns, rows });
