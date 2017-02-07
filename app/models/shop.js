import DS from 'ember-data';

export default DS.Model.extend({
  title             : DS.attr(),
  image_url_760x100 : DS.attr(),
  shop_name         : DS.attr(),
  url               : DS.attr(),
  shop_id           : DS.attr()
});
