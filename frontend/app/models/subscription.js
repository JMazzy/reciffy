import DS from 'ember-data';

export default DS.Model.extend({
  subscriber_id: DS.attr('number'),
  subscribed_id: DS.attr('number'),
  profile: DS.attr(),
  subscriptions: DS.attr(),
  recipes: DS.attr(),
  made_recipes: DS.attr(),
  email: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),


  user: DS.belongsTo('user'),
  
});
