import DS from 'ember-data';
import ENV from 'charcoal/config/environment';

export default DS.JSONAPIAdapter.extend({

  urlForQuery() {
    const {API_HOME} = ENV;
    return `${API_HOME}/listings/active`;
  },

});
