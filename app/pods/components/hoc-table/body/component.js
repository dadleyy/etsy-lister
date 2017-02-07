import Ember from 'ember';
const { computed, RSVP: deferred } = Ember;
const { not } = computed;

const tagName = '';

const rows = computed({
  set(key, promise) {
    const set = this.set.bind(this);
    const get = this.get.bind(this);

    set('complete', null);
    set('result', null);
    set('failed', null);
    set('ready', false);

    function success(result) {
      set('failed', false);
      set('ready', true);

      set('result', result);
      return deferred.resolve(result);
    }

    function failed(error) {
      set('failed', true);
      set('ready', false);

      return deferred.reject(error);
    }

    function finished() {
      if(get('isDestroyed') !== true) {
        set('complete', true);
      }
    }

    return promise.then(success)
      .catch(failed)
      .finally(finished);
  }
});

const pending = not('ready');

export default Ember.Component.extend({tagName, rows, pending});
