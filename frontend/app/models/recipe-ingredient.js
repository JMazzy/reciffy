import DS from 'ember-data';

export default DS.Model.extend({
  recipe_id: DS.attr('integer'),
  ingredient_id: DS.attr('integer'),
  unit_id: DS.attr('integer'),
  quantity: DS.attr('integer'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  recipe: DS.belongsTo('recipe'),
  ingredient: DS.belongsTo('ingredient'),
  unit: DS.belongsTo('unit'),

  fract_quant: Ember.computed('quantity', function() {
    return new Fraction( this.get('quantity') ).toString();
  }),
});
