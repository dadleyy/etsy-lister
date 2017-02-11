import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('application-footer', 'Integration | Component | application footer', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{application-footer}}`);
  assert.equal(true, true);
});
