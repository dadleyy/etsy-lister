import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('listing-table', 'Integration | Component | listing table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  //
  function listings() {
    return Ember.RSVP.resolve([]);
  }

  this.set('delegate', {listings});
  this.render(hbs`{{listing-table delegate=delegate}}`);
   
  assert.equal(true, true);
});