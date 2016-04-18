import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('recipes', function() {
    this.route('show', { path: '/:recipe_id' });
  });
  this.route('subscriptions', function() {
    this.route('show', { path: '/:subscription_id' });
  });
  this.route('made_recipes');
});

export default Router;
