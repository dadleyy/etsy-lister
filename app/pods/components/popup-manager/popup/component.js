import Ember from 'ember';

const { run, computed, Component, inject } = Ember;
const { htmlSafe: safe } = Ember.String;

function init() {
  this._super(...arguments);
  const doc = this.get('doc');

  const head = doc.createTextNode('');
  const tail = doc.createTextNode('');

  this.set('head', head);
  this.set('tail', tail);
  this.set('sent', false);
}

function willRender() {
  this._super(...arguments);

  if(this.get('sent') !== false || this.get('display') !== true) {
    return false;
  }

  const send = () => {
    if(this.get('isDestroyed')) {
      return false;
    }

    const root = this.get('popups.root');

    if(!root) {
      return false;
    }

    let head = this.get('head');
    let tail = this.get('tail');

    while(head) {
      root.insertBefore(head, null);
      head = head && head !== tail ? tail.parentNode.firstChild : null;
    }
  };

  this.set('sent', true);
  run.schedule('afterRender', send);
}

function clean() {
  const { element } = this;
  let head = this.get('head');
  let tail = this.get('tail');
  let cursor = tail;

  do {
    let next = cursor.previousSibling;

    if(!cursor.parentNode) {
      continue;
    }

    cursor.parentNode.removeChild(cursor);
    element.insertBefore(cursor, null);

    if(cursor === head) {
      break;
    }

    cursor = next;
  } while(cursor);

  this.set('sent', false);
}

function willUpdate() {
  this._super(...arguments);

  if(this.get('display') === true) {
    return false;
  }

  clean.call(this);
}

function willDestroyElement() {
  this._super(...arguments);
  clean.call(this);
}

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

  return safe(`position: absolute; left: ${left}px; top: ${top}px;`);
});

export default Component.extend({
  classNames: ['popup-manager__wormhole'],
  init, style, display,
  willRender, willUpdate, willDestroyElement,
  popups: inject.service(),
  doc: inject.service('-document')
});
