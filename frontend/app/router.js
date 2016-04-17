import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('recipes', function() {
    this.route('show', { path: '/:recipe_id' });
  });
});

export default Router;
