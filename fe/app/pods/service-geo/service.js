import Ember from 'ember';
import { check, f7Alert } from 'fe/utils';
export default Ember.Service.extend({
  async getGeo() {
    let geo = await check('deviceready').catch(e => f7Alert(e));
  }
});
