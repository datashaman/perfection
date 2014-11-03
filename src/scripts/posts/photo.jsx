'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');
var BlogStore = require('../stores/BlogStore');

module.exports = React.createClass({
    renderPhoto: function(doc) {
        var url = doc.attachments.length ? doc.attachments[0] : doc.url;
        return <img src={ url } width={ doc.width || 500} alt={ doc.alt } />
    },
    render: function() {
        var doc = this.props.doc;

        if (doc.caption) {
            return <li className="post photo">
                { this.renderPhoto(doc) }
                <div className="caption">{ doc.caption }</div>
              </li>;
        } else {
            return <li className="post photo">{ this.renderPhoto(doc) }</li>;
        }
    }
});
