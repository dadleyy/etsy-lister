import Ember from 'ember';

const { Component, run } = Ember;

const actions = {

  search(event) {
    const { target } = event;
    const { value } = target;
    this.set('-value', value);
    run.debounce(this, this.exec, 400);
  }

};

function exec() {
  const val = this.get('-value');
  this.set('query', val);
}

export default Component.extend({ actions, exec });
