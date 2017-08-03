import Ember from 'ember';

export function set([context, propName, prop]/*, hash*/) {
  Ember.set(context, propName, prop);
  return;
}

export default Ember.Helper.helper(set);
