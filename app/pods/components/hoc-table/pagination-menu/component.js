import Ember from 'ember';

const { inject, computed, Component } = Ember;

const options = computed(function() {
  const delegate = this.get('delegate');
  return delegate && typeof delegate.sizes === 'function' ? delegate.sizes() : [];
});

const actions = {
  select(size) {
    const { page } = this.get('pagination');
    this.set('pagination', { size, page });
  }
};

export default Component.extend({ options, actions, popups: inject.service() });
