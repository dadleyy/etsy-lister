import Delegate from 'charcoal/delegates/listings';

export function initialize(application) {
  application.register('delegates:listings', Delegate, {singleton: false});
}

export default {
  name: 'delegates',
  initialize
};
