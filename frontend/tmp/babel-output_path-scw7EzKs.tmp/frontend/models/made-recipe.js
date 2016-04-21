define('frontend/models/made-recipe', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    user_id: _emberData['default'].attr('number'),
    recipe_id: _emberData['default'].attr('number'),
    profile: _emberData['default'].attr(),
    subscriptions: _emberData['default'].attr(),
    created_at: _emberData['default'].attr('date'),
    updated_at: _emberData['default'].attr('date'),

    user: _emberData['default'].belongsTo('user'),
    recipe: _emberData['default'].belongsTo('recipe')
  });
});