import Ember from 'ember';

const { Service } = Ember;

const uuid = (function() {
  let head = 0;
  return () => `-${++head}-`;
})();

function mount() {
  this.set('pool', []);

  const dispatch = (event) => {
    const pool = this.get('pool');

    for(let i = 0, c = pool.length; i < c; i++) {
      let { handler, context, type } = pool[i];

      if(type !== 'keyup') {
        continue;
      }

      handler.call(context, event);
    }
  };

  document.addEventListener('keyup', dispatch);
}

function keyup(handler, context) {
  const id = uuid();
  const pool = this.get('pool');

  pool.push({ id, handler, context, type: 'keyup' });

  return id;
}

function off(id) {
  const pool = this.get('pool');


  for(let i = 0, c = pool.length; i < c; i++) {
    let { id: registered } = pool[i];

    if(id !== registered) {
      continue;
    }

    pool.splice(i, 1);
    return id;
  }

  return -1;
}

export default Service.extend({ keyup, off, mount });
