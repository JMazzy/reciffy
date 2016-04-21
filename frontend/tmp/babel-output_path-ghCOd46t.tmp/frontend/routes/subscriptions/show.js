define('frontend/routes/subscriptions/show', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.store.peekRecord('subscription', params.subscription_id);
    }
  });
});