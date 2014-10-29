var React = require('react');
window.React = React;

var TodoApp = require('./elements/TodoApp');

React.render(<TodoApp />, document.getElementById('content'));
