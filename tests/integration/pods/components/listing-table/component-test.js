import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { RSVP: deferred } = Ember;

const Stub = Ember.Service.extend({

  rows() {
    return deferred.resolve([ ]);
  },

  columns() {
    return [{ }];
  }

});

moduleForComponent('listing-table', 'Integration | Component | listing table', {
  integration: true,
  beforeEach() {
    this.register('service:listing-delegate', Stub);
    this.inject.service('listing-delegate', { as: 'delegate' });
  }
});

test('it renders', function(assert) {
  this.set('sorting', { });
  this.set('pagination', { });
  this.render(hbs`{{listing-table delegate=delegate sorting=sorting pagination=pagination}}`);
  assert.equal(true, true);
});
