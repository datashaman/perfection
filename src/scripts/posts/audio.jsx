'use strict';

var React = require('react');
var play = require('play-audio');

module.exports = React.createClass({
    renderCaption: function (doc) {
        return <div className="caption">{ doc.caption }</div>;
    },
    render: function() {
        var doc = this.props.doc;

        return <li className="post post-audio">
            { doc.caption ? this.renderCaption(doc) : '' }
            <div ref="player" className="player" />
        </li>;
    },

    componentDidMount: function() {
        var container = this.refs.player.getDOMNode();
        this.player = play(this.props.doc.url, container).controls();
    },

    componentWillUnmount: function() {
    }
});
