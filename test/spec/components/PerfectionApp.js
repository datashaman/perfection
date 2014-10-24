'use strict';

describe('Main', function () {
  var PerfectionApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    PerfectionApp = require('../../../src/scripts/components/PerfectionApp.jsx');
    component = PerfectionApp();
  });

  it('should create a new instance of PerfectionApp', function () {
    expect(component).toBeDefined();
  });
});
