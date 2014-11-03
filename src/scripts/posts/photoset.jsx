'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');
var BlogStore = require('../stores/BlogStore');

module.exports = React.createClass({
    render: function() {
        var doc = this.props.doc,
            photos = _.map(doc.attachments, function (attachment) {
                return <img src={ attachment } width="500" height="281" />;
            }),
            layout = "1321";

        if (doc.caption) {
            return <li className="post photoset">
                <div ref="grid" class="grid" data-layout={ layout }>{ photos }</div>
                <div className="caption">{ doc.caption }</div>
            </li>;
        } else {
            return <li className="post photoset">
                <div ref="grid" class="grid" data-layout={ layout }>{ photos }</div>
            </li>;
        }
    },
    componentDidMount: function() {
        $(this.refs.grid.getDOMNode()).photosetGrid({
            highresLinks: true,
            gutter: '5px'
        });
    }
});
