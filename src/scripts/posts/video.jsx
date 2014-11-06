'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');

module.exports = React.createClass({
    renderCaption: function (doc) {
        return <div className="caption">{ doc.caption }</div>;
    },
    render: function() {
        var doc = this.props.doc;

        return <li className="post post-video">
            { doc.caption ? this.renderCaption(doc) : '' }
            <iframe src={ doc.url } width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen />
            </li>;
    }
});
