define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _frontendConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('recipes', function () {
      this.route('show', { path: '/:recipe_id' });
    });
    this.route('subscriptions', function () {
      this.route('show', { path: '/:subscription_id' });
    });
    this.route('made_recipes');
  });

  exports['default'] = Router;
});