import Ember from 'ember';

const { Component, inject, computed } = Ember;
const { htmlSafe: safe } = Ember.String;

const active = computed('popups.pool', function() {
  const [ top ] = this.get('popups.pool') || [];
  return top;
});

let tag = computed('active', function() { 
  return this.get('active.component.name');
});

let props = computed('active', function() {
  return this.get('active.props');
});

const placement = computed('active', function() {
  const bounding = this.get('active.placement');

  if(!bounding) {
    return safe('left: 100%; top: 100%');
  }

  return safe(`left: ${bounding.left}px; top: ${bounding.top + bounding.height}px;`);
});

// observes changes to the popup pool, adding and removing mouse listeners as needed
function willDestroyElement() {
  const popups = this.get('popups');
  const mouse = this.get('mouse');
  const { mouse: id } = this.get('listeners');
  popups.close();
  mouse.off(id);
}

function init() {
  this._super(...arguments);
  const mouse = this.get('mouse');
  const popups = this.get('popups');

  const check = (evt) => {
    const [ active ] = this.childViews;

    if(!active || this.get('popups.opening')) {
      return false;
    }

    const { element } = active;
    const bounding = element.getBoundingClientRect();
    const x = bounding.left < evt.clientX && bounding.right > evt.clientX;
    const y = bounding.top < evt.clientY && bounding.bottom > evt.clientY;

    if(x && y) {
      return false;
    }

    return x && y ? false : popups.close();
  };

  const listeners = { mouse: mouse.click(check) };
  this.set('listeners', listeners);
}

export default Component.extend({ 
  props, active, tag, placement,
  willDestroyElement, init,
  mouse: inject.service(), 
  popups: inject.service(), 
});
