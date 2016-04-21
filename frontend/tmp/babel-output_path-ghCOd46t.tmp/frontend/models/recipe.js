define('frontend/models/recipe', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    instructions: _emberData['default'].attr('string'),
    prep_time: _emberData['default'].attr('number'),
    cook_time: _emberData['default'].attr('number'),
    user_id: _emberData['default'].attr('number'),
    original_id: _emberData['default'].attr('number'),
    created_at: _emberData['default'].attr('date'),
    updated_at: _emberData['default'].attr('date'),

    recipe_ingredients: _emberData['default'].hasMany('recipe-ingredient')
  });
});