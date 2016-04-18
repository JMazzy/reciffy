import Ember from 'ember';
// import Fraction from 'fractional';
import DS from 'ember-data';

export default DS.Model.extend({
  recipe_id: DS.attr('number'),
  ingredient_id: DS.attr('number'),
  unit_id: DS.attr('number'),
  quantity: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  recipe: DS.belongsTo('recipe', {inverse: true}),
  ingredient: DS.belongsTo('ingredient'),
  unit: DS.belongsTo('unit'),

  fract_quant: Ember.computed('quantity', function() {
    // return new Fraction( this.get('quantity') ).toString();
  }),
});
