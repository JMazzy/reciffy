import DS from 'ember-data';

export default DS.Model.extend({
  bio: DS.attr('string'),
  tagline: DS.attr('string'),
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  user_id: DS.attr('number'),
  avatar_file_name: DS.attr('string'),
  avatar_content_type: DS.attr('string'),
  avatar_file_size: DS.attr('number'),
  avatar_updated_at: DS.attr('date'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  user: DS.belongsTo('user'),
});
