/** @jsx React.DOM */

var PerfectionApp = require('./PerfectionApp');
var React = require('react');
var {DefaultRoute, Route, Routes} = require('react-router');

React.renderComponent((
  <Routes location="history">
    <Route path="/" handler={PerfectionApp}>
    </Route>
  </Routes>
), document.getElementById('content'));
