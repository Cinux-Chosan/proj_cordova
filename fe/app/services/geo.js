import Ember from 'ember';
import { observes } from 'ember-computed-decorators';
import { check, f7Alert } from 'fe/utils';

const { run: { later } } = Ember;

export default Ember.Service.extend({
  defaultOpts: { maximumAge: 3000, timeout: 15000, enableHighAccuracy: true, retry: true, convert2BD: true },

  @observes('defaultOpts.enableHighAccuracy')
  enableHighAccuracyChanged() {
    let enableHighAccuracy = this.get('defaultOpts.enableHighAccuracy');
    if (!enableHighAccuracy) {
      later(() => this.set('defaultOpts.enableHighAccuracy', true), 3 * 1000 * 60); // 3 分钟后重置定位精确度
    }
  },

  // 监视坐标
  async watch(onSuccess, opts = { retryCount: 0 }, onError = e => { f7Alert(e.message) }) {
    let deviceready = await check('deviceready').catch(e => f7Alert(e));
    if (!deviceready) return '';

    let watchID = null;
    let defaultOpts = this.get('defaultOpts');
    let _opts = { ...defaultOpts, ...opts };
    alert(this.get('defaultOpts.enableHighAccuracy'));

    // watch 失败的时候是否重新尝试
    if (_opts.retry) {
      onError = () => {
        // retrying
        alert('retrying');
        if (_opts.retryCount++ == 3) {
          this.set('defaultOpts.enableHighAccuracy', false);
        }
        this.clearWatch(watchID);
        this.watch(...arguments);
      }
    }

    // 是否默认转换成百度地图坐标
    if (_opts.convert2BD) {
      let _onSuccess = onSuccess;
      onSuccess = async (pos) => {
        let bdCoords = await this.convert2BD(pos.coords);
        _onSuccess({ ...pos, bdCoords });
      };
    }
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, _opts ); // return watchID
    return watchID;
  },

  // 获得当前坐标
  async getCurrentPosition(onSuccess, opts = { retryCount: 0 }, onError = e => { f7Alert(e.message) }) {
    let deviceready = await check('deviceready').catch(e => f7Alert(e));
    if (!deviceready) return;

    let defaultOpts = this.get('defaultOpts');
    let _opts = { ...defaultOpts, ...opts };
    if (_opts.retry) {
      onError = () => {
        if (_opts.retryCount++ == 3) {
          this.set('defaultOpts.enableHighAccuracy', false);
        }
        this.getCurrentPosition(...arguments);
      }
    }

    // 是否默认转换成百度地图坐标
    if (_opts.convert2BD) {
      let _onSuccess = onSuccess;
      onSuccess = async (pos) => {
        let bdCoords = await this.convert2BD(pos.coords);
        _onSuccess({ ...pos, bdCoords });
      };
    }
    return navigator.geolocation.getCurrentPosition(onSuccess, onError, _opts);
  },

  // 清理 watch 生成的 watchID
  clearWatch(watchID) {
    navigator.geolocation.clearWatch(watchID);
  },

  // 转换成百度地图使用的坐标
  async convert2BD(pos, { coords = pos } = pos) {
    let BMap = await check('BMap').catch(e => {
      f7Alert(e);
    });
    return new Promise((res, rej) => {
      if (BMap) {
        let convertor = new BMap.Convertor();
        let point = new BMap.Point(coords.longitude, coords.latitude);
        let pointArr = [point];
        convertor.translate(pointArr, 1, 5, data => {
          if (data.status) {  // 0 为正常
            rej(data);
          }
          res(data.points);
        });
      } else {
        rej('BMap is not defined!');
      }
    });
  }
});
