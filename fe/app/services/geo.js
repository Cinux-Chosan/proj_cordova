import Ember from 'ember';
import { check, f7Alert } from 'fe/utils';

export default Ember.Service.extend({
  defaultOpts: { timeout: 30000, enableHighAccuracy: true, maximumAge: 1000 },
  async watch(onSuccess, opts = {}, onError = () => { f7Alert('定位失败!') }) {
    await check('deviceready').catch(e => f7Alert(e));
    let defaultOpts = this.get('defaultOpts');
    return navigator.geolocation.watchPosition(onSuccess, onError, { ...defaultOpts, ...opts }); // return watchID
  },
  async getCurrentPosition(onSuccess, opts = {}, onError = () => { f7Alert('定位失败!') }) {
    await check('deviceready').catch(e => f7Alert(e));
    let defaultOpts = this.get('defaultOpts');
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { ...defaultOpts, ...opts });
  },
  clearWatch(watchID) {
    navigator.geolocation.clearWatch(watchID);
  }
});
