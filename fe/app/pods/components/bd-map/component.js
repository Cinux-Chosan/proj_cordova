import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['w100p', 'h100p', 'bd-map-container'],
  didInsertElement() {
    this._super(...arguments);
    let mapEle = this.$(`#${this.get('componentCssClassName')}`).get(0);
    let map = new BMap.Map(mapEle);
    let point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
		map.addControl(new BMap.ScaleControl());
		map.addControl(new BMap.GeolocationControl());
		var marker = new BMap.Marker(point);        // 创建标注
		map.addOverlay(marker);
		map.addEventListener("dragend", function(){
 var center = map.getCenter();
 alert("地图中心点变更为：" + center.lng + ", " + center.lat);
});
		this.set('map', map);
	}
});
