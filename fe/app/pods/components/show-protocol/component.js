import Ember from 'ember';

export default Ember.Component.extend({
  geo: Ember.inject.service(),
  init() {
    this._super(...arguments);
    let geo = this.get('geo');
    let i = 1;
    alert('init')
    let watchID = geo.watch(pos => {
      alert('watchSuccess');
      this.set('position', pos);
      alert(pos.coords.latitude + '////' + pos.coords.longitude);
      this.set('i', i++);
    }, { retry: true }, (e) => {

      // alert('onError');
      alert(e.message + '-----bad');
      alert('onErrorEnd');
      this.set('i', i--);
    });
      this.set('watchID', watchID);
  },
  didInsertElement() {
    this._super(...arguments);
  }

});
