import Ember from 'ember';
import { check, f7Alert } from 'fe/utils';

export default Ember.Service.extend({
  defaultOpts: { maximumAge: 3000, timeout: 600000, enableHighAccuracy: true },
  async watch(onSuccess, opts = {}, onError = e => { f7Alert(e.message) }) {
    await check('deviceready').catch(e => {
      f7Alert(e);
      throw new Error(e);
    });
    let defaultOpts = this.get('defaultOpts');
    if (opts.retry) {
      onError = () => {
        alert('retring');
        navigator.geolocation.watchPosition(onSuccess, onError, { ...defaultOpts, ...opts });
      }
    }
    return navigator.geolocation.watchPosition(onSuccess, onError, { ...defaultOpts, ...opts }); // return watchID
  },
  async getCurrentPosition(onSuccess, opts = {}, onError = e => { f7Alert(e.message) }) {
    await check('deviceready').catch(e => {
      f7Alert(e);
      throw new Error(e);
    });
    let defaultOpts = this.get('defaultOpts');
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { ...defaultOpts, ...opts });
  },
  clearWatch(watchID) {
    navigator.geolocation.clearWatch(watchID);
  }
});
