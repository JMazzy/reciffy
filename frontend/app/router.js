import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('recipes' function() {
    this.route('owned');
    this.route('made');
    this.route('saved');
  });
  this.route('recipe', { path: 'recipes/:id'});
});

export default Router;
