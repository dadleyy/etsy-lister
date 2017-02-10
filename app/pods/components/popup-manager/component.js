import Ember from 'ember';

const { Component, inject } = Ember;

const ELEMENT_NODE_TYPE = 1;

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

    const { clientX: ex, clientY: ey } = evt;
    const { childNodes: children } = this.element;

    for(let i = 0, c = children.length; i < c; i++) {
      const { nodeType: type } = children[i];

      if(type !== ELEMENT_NODE_TYPE) {
        continue;
      }

      const bounding = children[i].getBoundingClientRect();

      const x = bounding.left < ex && bounding.right > ex;
      const y = bounding.top < ey && bounding.bottom > ey;

      if(x && y) {
        continue;
      }

      const [{ handle }] = active;

      if(!handle) {
        continue;
      }

      popups.close(handle);
    }
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
