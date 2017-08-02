import Ember from 'ember';
import { check, f7Alert } from 'fe/utils';

export default Ember.Service.extend({
  defaultOpts: { maximumAge: 3000, timeout: 15000, enableHighAccuracy: true, retry: true, convert2BD: true },

  // 监视坐标
  async watch(onSuccess, opts = {}, onError = e => { f7Alert(e.message) }) {
    await check('deviceready').catch(e => {
      f7Alert(e);
      throw new Error(e);
    });
    let watchID = null;
    let defaultOpts = this.get('defaultOpts');
    let _opts = { ...defaultOpts, ...opts };
    // watch 失败的时候是否重新尝试
    if (_opts.retry) {
      onError = () => {
        // retrying
        alert('retrying');
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
  async getCurrentPosition(onSuccess, opts = {}, onError = e => { f7Alert(e.message) }) {
    await check('deviceready').catch(e => {
      f7Alert(e);
      throw new Error(e);
    });
    let defaultOpts = this.get('defaultOpts');
    let _opts = { ...defaultOpts, ...opts };
    if (_opts.retry) {
      onError = () => {
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

  // 清理 watchID
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
