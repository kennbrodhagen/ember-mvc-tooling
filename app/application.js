window.Todos = Ember.Application.create();
Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
Todos.Store = DS.Store.extend({
   adapter: 'Todos.ApplicationAdapter'
});

/*
Todos.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'todo-emberjs'
});
*/
