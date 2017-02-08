import Ember from 'ember';

const { computed } = Ember;

const tagName = 'tbody';

const creation = computed('row.listing.creation_tsz', function() {
  const ts = this.get('row.listing.creation_tsz');
  return ts >= 1 ? (ts * 1000) : null;
});

export default Ember.Component.extend({ tagName, creation });
