import Ember from 'ember';
const {computed} = Ember;

const Table = Ember.Component.extend({

  listings: computed('delegate.filters.title', function() {
    let delegate = this.get('delegate');
    return delegate.listings();
  })

});

export default Table;
