import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
  },
  actions: {
    doLogin() {
      f7App.closeModal('#f7-login-screen');
    }
  }
});
