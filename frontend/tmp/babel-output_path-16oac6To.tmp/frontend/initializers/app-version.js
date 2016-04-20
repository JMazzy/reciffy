define('frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'frontend/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _frontendConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_frontendConfigEnvironment['default'].APP.name, _frontendConfigEnvironment['default'].APP.version)
  };
});