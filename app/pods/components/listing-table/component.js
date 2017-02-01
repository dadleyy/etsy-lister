import Ember from 'ember';
const {computed} = Ember;

const Table = Ember.Component.extend({

  listings: computed(function() {
    let delegate = this.get('delegate');
    console.log(delegate);
    return delegate.listings();
  })

});

export default Table;
