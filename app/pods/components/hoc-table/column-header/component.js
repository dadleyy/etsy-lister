import Ember from 'ember';

const { Component, computed } = Ember;

const tagName = 'th';

const ascending = computed('sorting', 'column', function() {
  const sorting = this.get('sorting');
  const column = this.get('column');
  return column.rel === sorting.rel && sorting.order;
});

const descending = computed('sorting', 'column', function() {
  const sorting = this.get('sorting');
  const column = this.get('column');
  return column.rel === sorting.rel && !sorting.order;
});

const active = computed.or('descending', 'ascending');

const actions = {

  sort() {
    const current = this.get('sorting') || {};
    const column = this.get('column');
    const { rel } = column;
    let { order } = current;

    if(current.rel === column.rel)
      order = !order;

    this.set('sorting', { order, rel });
  }

};

export default Component.extend({ tagName, actions, active, descending, ascending });
