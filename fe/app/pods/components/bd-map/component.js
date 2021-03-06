import Ember from 'ember';
import { observes } from 'ember-computed-decorators';
import { check } from 'fe/utils';
const { run: { once } } = Ember;

export default Ember.Component.extend({
  classNames: ['w100p', 'h100p', 'bd-map-container'],
  pos: { coords: {}},
  geo: Ember.inject.service(),
  init() {
    this._super(...arguments);
    let geo = this.get('geo');
    let watchID = geo.watch(pos => {
      this.set('pos', pos);
    });
    this.set('watchID', watchID);
  },

  @observes('pos.bdCoords.firstObject.{lat,lng}')
  bdCoordsChanged() {
    once(null, async () => {
      let coords = this.get('pos.bdCoords.firstObject');
      let point = new BMap.Point(coords.lng, coords.lat);
      let map = await check(() => this.get('map'));
      map.panTo(point);
      // this.addMarker(point);
      let addr = await this.getAddr(point);
      this.set('address', addr);
    });
  },

  async addMarker(point) {
    let marker = new BMap.Marker(point);
    let map = await check(() => this.get('map'));
    map.addOverlay(marker);
  },

  async getAddr(point) {
    let BMap = await check('BMap');
    let geoCoder = new BMap.Geocoder();
    return new Promise((res, rej) => {
      geoCoder.getLocation(point, r => r ? res(r.address): rej('地址解析错误!'));
    })
  },

  async didInsertElement() {
    this._super(...arguments);
    await check('BMap');
    let mapEle = this.$(`#${this.get('componentCssClassName')}`).get(0);
    let map = new BMap.Map(mapEle);
    // let coords = await check(()=> this.get('pos.bdCoords.firstObject.lat') && this.get('pos.bdCoords.firstObject'));
    // let point = new BMap.Point(coords.lng, coords.lat);
    let point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom();
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.GeolocationControl());
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker);
    this.set('map', map);
  }
});
