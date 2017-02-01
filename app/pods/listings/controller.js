import Ember from 'ember';
const {computed} = Ember;

export default Ember.Controller.extend({

  listings: computed(function() {
    const model = this.get('model');
    return model.listings;
  })

});
