import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      this.store.peekRecord('recipe', params.recipe_id);
    })

  }
});
