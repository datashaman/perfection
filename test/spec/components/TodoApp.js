'use strict';

describe('Main', function () {
  var TodoApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    TodoApp = require('../../../src/scripts/components/TodoApp.jsx');
    component = TodoApp();
  });

  it('should create a new instance of TodoApp', function () {
    expect(component).toBeDefined();
  });
});
