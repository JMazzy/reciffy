//= require jquery
//= require jquery_ujs
//= require ./environment
//= require ember
//= require ember-data
//= require ember-rails/application
//= require ./reciffy
//= require_self

import Application from 'ember-rails/application'
// import Reciffy from 'reciffy';
// import config from 'environment'; // You can use `config` for application specific variables such as API key, etc.

const Reciffy = Application.extend({
  config.ember.app_name: "Reciffy",
});

Reciffy.create();
