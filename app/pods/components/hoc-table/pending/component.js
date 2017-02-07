import Ember from 'ember';

const { computed } = Ember;
const tagName = 'tbody';

const promise = computed({
  set(key, value) {
    const set = this.set.bind(this);

    set('pending', true);

    function finished() {
      set('pending', false);
    }

    return value.finally(finished);
  }
});

export default Ember.Component.extend({ promise, tagName });
