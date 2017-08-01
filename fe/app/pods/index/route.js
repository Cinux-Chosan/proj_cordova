import Ember from 'ember';

export default Ember.Route.extend({
  xx: Ember.inject.service('service-geo'),
  model() {
    console.log(this.get('xx').getGeo());
  }
});
