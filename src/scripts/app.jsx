/** @jsx React.DOM */

var React = require('react');
window.React = React;

var TodoApp = require('./components/TodoApp');

React.renderComponent(
    <TodoApp />
, document.getElementById('content'));
