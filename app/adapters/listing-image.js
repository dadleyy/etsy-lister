import DS from 'ember-data';
import ENV from 'charcoal/config/environment';

export default DS.JSONAPIAdapter.extend({

  urlForQuery(query) {
    const {API_HOME} = ENV;
    const {listing} = query; 
    return listing ? `${API_HOME}/listings/${listing}/images` : '';
  },


});
