import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('recipes', function() {
    this.route('show', { path: '/:recipe_id' });
  });
  this.route('users', function() {
    this.route('show', { path: '/:user_id' });
  });
  this.route('subscriptions', function() {
    this.route('show', { path: '/:subscription_id' });
  });
  this.route('madeRecipes',  { path: '/:madeRecipes' });
});

export default Router;
