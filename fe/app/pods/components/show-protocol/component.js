import Ember from 'ember';

export default Ember.Component.extend({
  geo: Ember.inject.service(),
  didInsertElement() {
    this._super(...arguments);
    let geo = this.get('geo');
    let watchID = geo.watch(pos => {
      this.set('position', pos);
    });
    this.set('watchID', watchID);
  }
});
