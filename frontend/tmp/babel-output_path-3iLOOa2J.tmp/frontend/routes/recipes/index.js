define('frontend/routes/recipes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.peekAll('recipe');
    }
  });
});