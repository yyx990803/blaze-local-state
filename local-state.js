Blaze.Template.prototype.localState = function (stateGetter) {
  var template = this;
  var state = stateGetter();
  _.each(state, function (val, key) {
    template.__helpers.set(key, function () {
      var self = Template.instance();
      return self.__stateVars[key].get();
    });
  });
  template.onCreated(function () {
    var self = this;
    self.__stateVars = self.__stateVars || {};
    var initialState = stateGetter();
    _.each(initialState, function (val, key) {
      var store = new ReactiveVar();
      store.set(val);
      self.__stateVars[key] = store;
    });
  });
};

Blaze.TemplateInstance.prototype.get = function (key) {
  var store = this.__stateVars[key];
  return store && store.get();
};

Blaze.TemplateInstance.prototype.set = function (key, val) {
  var store = this.__stateVars[key];
  store && store.set(val);
};