/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    'ember-cli-babel': {
      includePolyfill: true
    },
    babel: {
      plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.


  ///////////////////////  import f7
  app.import('vendor/framework7/dist/css/framework7.ios.min.css');
  // app.import('vendor/framework7-icons/css/framework7-icons.css');

  app.import('vendor/framework7/dist/js/framework7.min.js');

  return app.toTree();
};
