import Ember from 'ember';

const { run, inject, Service } = Ember;

const ESCAPE_KEY = 27;

const uuid = (function() {
  let head = 0;
  return () => `-${++head}-`;
})();

function mount() {
  this.set('pool', []);
}

function open(component, placement, props) {
  const pool = this.get('pool');
  const id = uuid();

  const escape = (evt) => {
    if(evt.keyCode !== ESCAPE_KEY) {
      return;
    }

    return this.close();
  };

  const after = () => {
    this.set('opening', false);
  };

  if(!pool || pool.length === 0) {
    const keys = this.get('keyboard');
    const listeners = { keys: keys.keyup(escape) };
    this.set('listeners', listeners);
  }

  this.set('opening', true);
  this.set('pool', [{ id, component, props, placement }]);

  run.next(after);
  return id;
}

function close() {
  const listeners = this.get('listeners');
  const pool = this.get('pool');

  if(pool.length === 0) {
    return -1;
  }

  this.get('keyboard').off(listeners.keys);
  this.set('pool', []);
}

export default Service.extend({ open, close, mount, 
  keyboard: inject.service(),
  mouse: inject.service() 
});
