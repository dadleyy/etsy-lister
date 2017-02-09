import Ember from 'ember';

const { Service } = Ember;

let pool = 0;

function generate() {
  return btoa(`-${++pool}-`);
}

export default Service.extend({ generate });
