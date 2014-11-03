'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');

module.exports = React.createClass({
    render: function() {
        var doc = this.props.doc;

        if (doc.source) {
            return <li className="post quote">
                "{doc.quote}"
                <div className="source">{ doc.source }</div>
              </li>;
        } else {
            return <li className="post quote">
                "{doc.quote}"
              </li>;
        }
    }
});
