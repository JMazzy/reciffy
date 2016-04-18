import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      recipe: this.store.findRecord('recipe', params.recipe_id),
      recipe_ingredients: this.store.findRecord('recipe_ingredient')
    });
  }
});
