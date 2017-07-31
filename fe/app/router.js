import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('login');
  this.route('resetpwd');
  this.route('signup');
  this.route('bdmap');
});

export default Router;
