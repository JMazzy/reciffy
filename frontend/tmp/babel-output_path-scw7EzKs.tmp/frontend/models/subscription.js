define('frontend/models/subscription', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    subscriber_id: _emberData['default'].attr('number'),
    subscribed_id: _emberData['default'].attr('number'),
    profile: _emberData['default'].attr(),
    subscriptions: _emberData['default'].attr(),
    recipes: _emberData['default'].attr(),
    made_recipes: _emberData['default'].attr(),
    email: _emberData['default'].attr('string'),
    created_at: _emberData['default'].attr('date'),
    updated_at: _emberData['default'].attr('date'),

    user: _emberData['default'].belongsTo('user')

  });
});