import Ember from 'ember';

const { computed, Component, inject } = Ember;

function init() {
  this._super(...arguments);
  const popups = this.get('popups');
  const handle = popups.allocate();
  this.set('handle', handle);
}

function willDestroyElement() {
  const handle = this.get('handle');
  const popups =this.get('popups');
  console.log('cleaning!');
  popups.free(handle);
  this.set('handle', null);
}

export default Component.extend({
  classNames: ['hoc-menu'],
  init, willDestroyElement,
  popups: inject.service() 
});
