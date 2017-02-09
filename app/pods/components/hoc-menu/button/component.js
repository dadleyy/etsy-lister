import Ember from 'ember';

const { Component, inject } = Ember;

const actions = {
  open() {
    const { element } = this;
    const popups = this.get('popups');
    const handle = this.get('handle');
    let { top, left, height } = element.getBoundingClientRect();

    top += height;

    popups.open(handle, { top, left });
  }
};

export default Component.extend({ popups: inject.service(), actions }); 
