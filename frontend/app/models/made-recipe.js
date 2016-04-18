import DS from 'ember-data';

export default DS.Model.extend({
  user_id: DS.attr('number'),
  recipe_id: DS.attr('number'),
  profile: DS.attr(),
  subscriptions: DS.attr(),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  user: DS.belongsTo('user'),
  recipe: DS.belongsTo('recipe'),
});
