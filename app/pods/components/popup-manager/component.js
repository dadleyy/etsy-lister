import Ember from 'ember';

const { Component, inject } = Ember;

function willDestroyElement() {
  const mouse = this.get('mouse');
  const { mouse: id } = this.get('listeners');
  mouse.off(id);
}

function init() {
  this._super(...arguments);
  const mouse = this.get('mouse');

  const check = (evt) => {
    const popups = this.get('popups');
    const { active } = popups.get('pool');

    if(!active.length || this.get('popups.opening')) {
      return false;
    }

    const [ latest ] = active;
    const { bounding } = latest;
    const x = bounding.left < evt.clientX && bounding.right > evt.clientX;
    const y = bounding.top < evt.clientY && bounding.bottom > evt.clientY;

    if(x && y) {
      return false;
    }

    return x && y ? false : popups.close(latest.handle);
  };

  const listeners = { mouse: mouse.click(check) };
  this.set('listeners', listeners);
}

function didRender() {
  const popups = this.get('popups');
  const { element } = this;
  popups.mount(element);
}

export default Component.extend({ 
  classNames: ['popup-manager'],
  willDestroyElement, didRender, init,
  mouse: inject.service(), 
  popups: inject.service(), 
});
