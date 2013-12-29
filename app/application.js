window.Todos = Ember.Application.create({
  LOG_TRANSITIONS: true
});
Todos.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'todo-emberjs'
});

Todos.Store = DS.Store.extend({
  adapter: 'Todos.ApplicationAdapter'
});

var opts = {
  App: Todos,
  DS: DS,
  Ember: Ember,
  window: window
};

require('./router')(opts);
require('./todo/todo')(opts);
require('./todo/todo-controller')(opts);
require('./todo/todo-edit-view')(opts);
require('./todos/todos-controller')(opts);
