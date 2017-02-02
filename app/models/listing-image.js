import DS from 'ember-data';

export default DS.Model.extend({
  listing_id  : DS.attr(),
  url_75x75   : DS.attr(),
  url_170x135 : DS.attr()
});
