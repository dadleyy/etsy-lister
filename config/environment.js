/* jshint node: true */
const pkg = require('../package.json');

module.exports = function(environment) {
  var ENV = {
    author          : pkg.author && pkg.author.name ? pkg.author.name : pkg.author,
    modulePrefix    : 'charcoal',
    podModulePrefix : 'charcoal/pods',
    environment     : environment,
    rootURL         : '/',
    locationType    : 'auto',

    EmberENV: {
      FEATURES: {
      },
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {
    }
  };

  ENV.i18n = {
    defaultLocale: 'en'
  };

  if (environment === 'development') {
    ENV.API_HOME = '/v2';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.API_HOME = '/api';
  }

  return ENV;
};
