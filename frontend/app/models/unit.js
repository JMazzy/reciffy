import DS from 'ember-data';

export default DS.Model.extend({
  unit_type: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  recipe_ingredients: DS.hasMany('recipe_ingredient'),
});
