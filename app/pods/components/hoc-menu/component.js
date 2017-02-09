import Ember from 'ember';

const { Component, inject } = Ember;

const actions = {
  open() {
    const body = this.get('body');
    const popups = this.get('popups');
    const props = this.get('props');
    const { element } = this;
    const placement = element.getBoundingClientRect();
    popups.open(body, placement, props);
  }
};

export default Component.extend({ popups: inject.service(), actions });
