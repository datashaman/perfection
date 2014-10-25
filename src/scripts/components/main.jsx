/** @jsx React.DOM */

var React = require('react'),
    {DefaultRoute, Route, Routes} = require('react-router'),
    TodoApp = require('./TodoApp');

React.renderComponent((
    <Routes location="history">
        <Route path="/" handler={TodoApp} />
    </Routes>
), document.getElementById('content'));
