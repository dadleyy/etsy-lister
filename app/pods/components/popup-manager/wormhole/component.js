import Ember from 'ember';

const { run, Component, inject } = Ember;

function init() {
  this._super(...arguments);
  const doc = this.get('doc');

  const head = doc.createTextNode('');
  const tail = doc.createTextNode('');

  this.set('nodes', { head, tail });
  this.set('flags', { sent: false });
}

function willRender() {
  this._super(...arguments);

  const { isDestroyed: destroyed } = this;
  const { sent } = this.get('flags');
  const root = this.get('popups.root');

  if(destroyed || !root || sent) {
    return false;
  }

  function send() {
    const { head, tail } = this.get('nodes');
    let cursor = head;
    const { parentNode: parent } = cursor;

    while(cursor) {
      parent.removeChild(cursor);
      root.insertBefore(cursor, null);
      cursor = cursor && cursor !== tail ? parent.firstChild : null;
    }

    this.set('flags', { sent: true });
  }

  run.schedule('afterRender', send.bind(this));
}

function willDestroyElement() {
  this._super(...arguments);
  const { isDestroyed: destroyed } = this;

  if(destroyed) {
    return false;
  }

  const { element } = this;
  const { head, tail } = this.get('nodes');
  let cursor = head;
  const { parentNode: parent } = cursor;

  while(cursor) {
    const next = cursor.nextSibling;
    parent.removeChild(cursor);
    element.insertBefore(cursor, null);

    if(cursor === tail) {
      break;
    }

    cursor = next;
  }

  this.set('flags', { sent: false });
}

export default Component.extend({
  classNames: ['popup-manager__wormhole'],
  init, willRender, willDestroyElement,
  popups: inject.service(),
  doc: inject.service('-document'),
});
