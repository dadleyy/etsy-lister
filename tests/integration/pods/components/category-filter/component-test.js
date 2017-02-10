import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('category-filter', 'Integration | Component | category filter', {
  integration: true
});

test('it renders', function(assert) {
  assert.equal((hbs`test` !== undefined), true);
});
