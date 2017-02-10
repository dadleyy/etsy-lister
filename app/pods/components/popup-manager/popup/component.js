import Ember from 'ember';

const { computed, Component, inject } = Ember;
const { htmlSafe: safe } = Ember.String;

const display = computed('popups.active', 'popups.{active}', function() {
  return this.get('popups.active') && this.get('handle').open;
});

const style = computed('display', function() {
  const popups = this.get('popups');
  const handle = this.get('handle');
  const { top, left } = popups.bounding(handle) || { };

  if(!top || !left) {
    return safe(`display: none;`);
  }

  return safe(`position: fixed; left: ${left}px; top: ${top}px;`);
});

export default Component.extend({
  classNames: ['popup-manager__popup'],
  style, display,
  popups: inject.service(),
});
