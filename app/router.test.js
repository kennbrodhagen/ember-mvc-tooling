describe('Routes', function() {
  'use strict';

  var mock;
  var route;

  beforeEach(function() {
    mock = {
      store: {
        find: sinon.spy()
      }
    };
  });

  describe('TodosRoute', function() {
    beforeEach(function() {
      route = new Todos.TodosRoute();
      route.store = mock.store;
    });

    it('exists', function() {
      expect(Todos.TodosRoute).to.be.ok;
    });

    it('returns a model for todo', function() {
      route.model();
      route.store.find
        .should.have.been.calledWith('todo');
    });
  });

  describe('TodosIndexRoute', function() {
    beforeEach(function() {
      route = new Todos.TodosIndexRoute();
      route.modelFor = sinon.spy();
    });

    it('exists', function() {
      expect(Todos.TodosIndexRoute).to.be.ok;
    });

    it('returns a model for todos', function() {
      route.model();
      route.modelFor
        .should.have.been.calledWith('todos');
    });
  });

  describe('TodosActiveRoute', function() {
    beforeEach(function() {
      route = new Todos.TodosActiveRoute();
      route.store = mock.store;
    });

    it('exists', function() {
      expect(Todos.TodosActiveRoute).to.be.ok;
    });
  });
});
