define('frontend/models/ingredient', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    created_at: _emberData['default'].attr('date'),
    updated_at: _emberData['default'].attr('date'),

    recipe_ingredients: _emberData['default'].hasMany('recipe-ingredient')
  });
});