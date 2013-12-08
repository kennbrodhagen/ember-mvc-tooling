describe('* Application', function() {
	'use strict';
	it('* defines the main app', function() {
		expect(Todos).to.be.ok();
		expect(Todos.ApplicationAdapter).to.be.ok();
		expect(Todos.Store).to.be.ok();
	});
});
/*
window.Todos = Ember.Application.create();
Todos.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'todo-emberjs'
});
Todos.Store = DS.Store.extend({
	adapter: 'Todos.ApplicationAdapter'
});
*/
