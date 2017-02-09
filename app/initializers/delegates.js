import ListingDelegate from 'charcoal/delegates/listings'; 

export function initialize(application) {
  application.register('delegates:listings', ListingDelegate, {singleton: false});
}

export default {
  name: 'delegates',
  initialize
};
