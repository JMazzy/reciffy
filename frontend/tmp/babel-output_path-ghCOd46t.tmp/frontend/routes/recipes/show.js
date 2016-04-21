define('frontend/routes/recipes/show', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.store.peekRecord('recipe', params.recipe_id);
    }
  });
});