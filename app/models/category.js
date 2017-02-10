import DS from 'ember-data';

export default DS.Model.extend({
  category_id : DS.attr(),
  name        : DS.attr(),
  meta_title  : DS.attr(),
  page_title  : DS.attr()
});
