'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');
var BlogStore = require('../stores/BlogStore');

var layouts = {
    1: "1",
    2: "2",
    3: "12",
    4: "13",
    5: "212",
    6: "132",
    7: "1312",
    8: "13121",
    9: "2313",
    10: "12313"
};

module.exports = React.createClass({
    render: function() {
        var doc = this.props.doc,
            attachments = _.map(doc.attachments, function (attachment) {
                return <img src={ attachment } width="500" height="281" />;
            }),
            layout = layouts[attachments.length];

        if (doc.caption) {
            return <li className="post photoset">
                <div ref="grid" class="grid" data-layout={ layout }>{ attachments }</div>
                <div className="caption">{ doc.caption }</div>
            </li>;
        } else {
            return <li className="post photoset">
                <div ref="grid" class="grid" data-layout={ layout }>{ attachments }</div>
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
