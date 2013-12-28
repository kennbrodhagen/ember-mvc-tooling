window.Todos = Ember.Application.create({
  LOG_TRANSITIONS: true
});
Todos.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'todo-emberjs'
});

Todos.Store = DS.Store.extend({
  adapter: 'Todos.ApplicationAdapter'
});

