'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');

module.exports = React.createClass({
    render: function() {
        var doc = this.props.doc;

        if (doc.caption) {
            return <li className="post video">
                <div className="caption">{ doc.caption }</div>
                <iframe src={ doc.url } width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen />
              </li>;
        } else {
            return <li className="post video">
                <iframe src={ doc.url } width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen />
              </li>;
        }
    }
});
