import Ember from 'ember';
import { check } from 'fe/utils';

export default Ember.Component.extend({
  classNames: ['w100p', 'h100p', 'bd-map-container'],
  pos: { coords: {}},
  geo: Ember.inject.service(),
  init() {
    this._super(...arguments);
    alert('init');
    let geo = this.get('geo');
    let watchID = geo.watch(pos => {
      this.set('pos', pos);
    });
    this.set('watchID', watchID);
  },
  async didInsertElement() {
    this._super(...arguments);
    await check('BMap');
    let mapEle = this.$(`#${this.get('componentCssClassName')}`).get(0);
    let map = new BMap.Map(mapEle);
    let coords = await check(()=> this.get('pos.bdCoords.firstObject.lat') && this.get('pos.bdCoords.firstObject'));
    let point = new BMap.Point(coords.lng, coords.lat);
    map.centerAndZoom(point, 15);
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.GeolocationControl());
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker);
    map.addEventListener("dragend", function() {
      var center = map.getCenter();
      alert("地图中心点变更为：" + center.lng + ", " + center.lat);
    });
    this.set('map', map);
  }
});
