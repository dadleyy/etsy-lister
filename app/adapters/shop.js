import DS from 'ember-data';
import ENV from 'charcoal/config/environment';

export default DS.JSONAPIAdapter.extend({

  urlForQuery(query) {
    const {API_HOME} = ENV;
    return query.listing ? `${API_HOME}/shops/listing/${query.listing}` : `${API_HOME}/shops`;
  }

});
