import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    this.initF7();
  },
  initF7() {
    window.f7App = new Framework7({
      router: false,
      pushState: true
    });
    window.f7View = f7App.addView('.view-main', {
      dynamicNavbar: true
    });
  }
});
