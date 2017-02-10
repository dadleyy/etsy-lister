import Ember from 'ember';

const { computed } = Ember;
const tagName = 'tbody';

const promise = computed({
  set(key, value) {
    const set = this.set.bind(this);
    const get = this.get.bind(this);

    set('pending', true);

    function finished() {
      if(get('isDestroyed') === true) {
        return;
      }

      set('pending', false);
    }

    return value.finally(finished);
  }
});

export default Ember.Component.extend({ promise, tagName });
