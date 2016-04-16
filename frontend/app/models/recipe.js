import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  instructions: DS.attr('string'),
  prep_time: DS.attr('integer'),
  cook_time: DS.attr('integer'),
  user_id: DS.attr('integer'),
  original_id: DS.attr('integer'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  recipe_ingredients: DS.hasMany('recipe-ingredient'),
});
