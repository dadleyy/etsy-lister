import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
const { RSVP: deferred } = Ember;

const Delegate = Ember.Object.extend({ 
  rows() {
    return deferred.resolve({ rows: [], count: 0});
  },
  columns() {
  }
});

moduleForComponent('hoc-table', 'Integration | Component | hoc table', {
  integration: true
});

test('it renders', function(assert) {
  const delegate = Delegate.create();
  this.set('delegate', delegate);

  // Template block usage:
  this.render(hbs`
    {{#hoc-table delegate=delegate}}
    {{/hoc-table}}
  `);

  assert.equal(true, true);
});
