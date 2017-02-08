import Ember from 'ember';
import layout from 'charcoal/pods/components/hoc-table/pagination/template';

const { computed } = Ember;

const tagName = 'footer';

const promise = computed('promise', {
  set(key, target_promise) {
    const set = this.set.bind(this);
    const get = this.get.bind(this);

    set('display', false);

    function receive(result) {
      const { count } = result;
      const { page, size } = get('pagination') || {};

      if(!count) {
        return;
      }

      const start = page * size;
      const end = start + size;

      set('display', { total: count, size });
      set('controls', { next: count > end, previous: start > 0 });
    }

    target_promise.then(receive);

    return target_promise;
  }
});

const actions = {

  move(amount) {
    const { size, page } = this.get('pagination');
    this.set('pagination', { size, page: page + amount });
  }

};

export default Ember.Component.extend({ layout, promise, tagName, actions });
