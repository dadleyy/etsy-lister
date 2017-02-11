import Ember from 'ember';
import layout from 'charcoal/pods/components/hoc-table/pagination/template';

const { inject, computed } = Ember;

const tagName = 'footer';

const promise = computed('promise', 'delegate', {
  set(key, target_promise) {
    const set = this.set.bind(this);
    const get = this.get.bind(this);

    set('display', false);

    function receive(result) {
      const { count } = result;
      const { page, size } = get('pagination') || {};

      if(!count || get('isDestroyed') === true) {
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

function init() {
  this._super(...arguments);
  const deferred = this.get('deferred');

  const options = () => {
    let delegate = this.get('delegate');
    let sizes = delegate.sizes();
    return deferred.resolve(sizes);
  };

  const select = (size) => {
    const { page } = this.get('pagination');
    this.set('pagination', { size, page });
  };

  this.set('sizeDelegate', { options, select });
}

const actions = {

  update(size) {
    const { page } = this.get('pagination');
    this.set('pagination', { size, page });
  },

  move(amount) {
    const { size, page } = this.get('pagination');
    this.set('pagination', { size, page: page + amount });
  }

};

export default Ember.Component.extend({
  deferred: inject.service(),
  layout, promise, tagName, actions, init
});
