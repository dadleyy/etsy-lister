import EmberObject from '@ember/object';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { resolve } from 'rsvp';

const Delegate = EmberObject.extend({
  columns() {
  },
  rows() {
    return resolve([]);
  },
});

describe('Integration | Component | hoc table', function() {
  setupComponentTest('hoc-table', {
    integration: true
  });

  it('renders', function() {
    const delegate = Delegate.create({ });
    this.set('delegate', delegate);
    this.render(hbs`{{hoc-table delegate=delegate}}`);
    expect(this.$()).to.have.length(1);
  });
});
