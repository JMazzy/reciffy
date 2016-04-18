import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      recipes: this.store.findAll('recipe'),
      ingredients: this.store.findAll('ingredient'),
      units: this.store.findAll('unit'),
      recipe_ingredients: this.store.findAll('recipe_ingredient'),
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  }
});
