define('frontend/tests/helpers/resolver', ['exports', 'frontend/resolver', 'frontend/config/environment'], function (exports, _frontendResolver, _frontendConfigEnvironment) {

  var resolver = _frontendResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _frontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _frontendConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});