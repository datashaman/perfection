'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');

module.exports = React.createClass({
    render: function() {
        var doc = this.props.doc;

        if (doc.description) {
            return <li className="post link">
                <a href={doc.url} class="link">{doc.title}</a>
                <div class="description">{doc.description}</div>
              </li>;
        } else {
            return <li className="post link">
                <a href={doc.url} class="link">{doc.title}</a>
              </li>;
        }
    }
});
