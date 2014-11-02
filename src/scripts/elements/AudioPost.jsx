'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');
var play = require('play-audio');

module.exports = React.createClass({
    render: function() {
        var doc = this.props.doc;

        if (doc.caption) {
            return <li className="post audio">
                <div className="caption">{ doc.caption }</div>
                <div ref="player" class="player" />
              </li>;
        } else {
            return <li className="post audio">
                <div ref="player" class="player" />
              </li>;
        }
    },

    componentDidMount: function() {
        var container = this.refs.player.getDOMNode();
        this.player = play([ this.props.doc.url ], container).controls();
    },

    componentWillUnmount: function() {
    }
});
