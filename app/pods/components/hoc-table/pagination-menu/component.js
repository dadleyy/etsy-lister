import Ember from 'ember';

const { inject, computed, Component } = Ember;

const options = computed(function() {
  const delegate = this.get('props.delegate');
  return delegate && typeof delegate.sizes === 'function' ? delegate.sizes() : [];
});

const actions = {
  select(size) {
    const popups = this.get('popups');
    const { update } = this.get('props');
    update(size);
    popups.close();
  }
};

export default Component.extend({ options, actions, popups: inject.service() });
