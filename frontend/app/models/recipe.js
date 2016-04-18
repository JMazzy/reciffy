import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  instructions: DS.attr('string'),
  prep_time: DS.attr('number'),
  cook_time: DS.attr('number'),
  user_id: DS.attr('number'),
  original_id: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  recipe_ingredients: DS.attr(),
  ingredients: DS.attr(),
  units: DS.attr(),

  recipe_ingredients: DS.hasMany('recipe_ingredient'),
  ingredients: DS.hasMany('ingredient'),
  units: DS.hasMany('unit'),
});
