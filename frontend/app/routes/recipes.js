import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      this.store.findAll('recipe'),
      this.store.findAll('ingredient'),
      this.store.findAll('unit'),
      this.store.findAll('recipe_ingredient'),
    })

  }
});
