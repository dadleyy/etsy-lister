import Ember from 'ember';

const { computed } = Ember;

const promise = computed('query', function() {
  const delegate = this.get('delegate');
  const query = this.get('query');
  return delegate.options(query);
});

function init() {
  this._super(...arguments);
  this.set('query', null);
}

export default Ember.Component.extend({
  classNames: ['hoc-select'],
  promise, init
});
