import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Delegate from 'charcoal/delegates/table';

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
