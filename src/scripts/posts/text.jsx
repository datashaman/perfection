'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');

module.exports = React.createClass({
    render: function() {
        var doc = this.props.doc;

        if (doc.title) {
            return <li className="post text">
                <h3>{ doc.title }</h3>
                {doc.body}
              </li>;
        } else {
            return <li className="post text">
                {doc.body}
              </li>;
        }
    }
});
