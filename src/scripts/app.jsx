var React = require('react');
window.React = React;

var BlogApp = require('./elements/BlogApp');

React.render(<BlogApp />, document.getElementById('content'));
