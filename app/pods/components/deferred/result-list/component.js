import Ember from 'ember';
const { computed, RSVP: deferred } = Ember;
const { not } = computed;

const tagName = '';

let id_pool = 0;

function uuid() {
  return `-${++id_pool}-`;
}

const promise = computed({
  set(key, target_promise) {
    const set = this.set.bind(this);
    const get = this.get.bind(this);
    const id = uuid();

    set('current_request', id);

    set('complete', null);
    set('result', null);
    set('failed', null);
    set('ready', false);

    function success(result) {
      const current = get('current_request');

      if(get('isDestroyed') === true || current !== id) {
        return false;
      }

      set('failed', false);
      set('ready', true);

      set('result', result);
      return deferred.resolve(result);
    }

    function failed(error) {
      const current = get('current_request');

      if(get('isDestroyed') === true || current !== id) {
        return false;
      }

      set('failed', true);
      set('ready', false);

      return deferred.reject(error);
    }

    function finished() {
      const current = get('current_request');

      if(get('isDestroyed') === true || current !== id) {
        return false;
      }

      set('complete', true);
    }

    return target_promise.then(success)
      .catch(failed)
      .finally(finished);
  }
});

const pending = not('ready');

export default Ember.Component.extend({tagName, promise, pending});
