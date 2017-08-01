import Ember from 'ember';
import { check, f7Alert } from 'fe/utils';

export default Ember.Service.extend({
  defaultOpts: { timeout: 30000, enableHighAccuracy: true, maximumAge: 0 },
  async watch(onSuccess, opts = {}, onError = e => { f7Alert(e.message) }) {
    await check('deviceready');
    let defaultOpts = this.get('defaultOpts');
    return navigator.geolocation.watchPosition(onSuccess, onError, { ...defaultOpts, ...opts }); // return watchID
  },
  async getCurrentPosition(onSuccess, opts = {}, onError = e => { f7Alert(e.message) }) {
    await check('deviceready');
    let defaultOpts = this.get('defaultOpts');
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { ...defaultOpts, ...opts });
  },
  clearWatch(watchID) {
    navigator.geolocation.clearWatch(watchID);
  }
});
