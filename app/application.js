window.Todos = Ember.Application.create();
Todos.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'todo-emberjs'
});

Todos.Store = DS.Store.extend({
	adapter: 'Todos.ApplicationAdapter'
});

