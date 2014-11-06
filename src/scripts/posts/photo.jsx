'use strict';

var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
    renderPhoto: function(doc) {
        var url = _.size(doc.attachments) ? _.first(doc.attachments) : doc.url;
        return <img src={ url } width={ doc.width || 500} alt={ doc.alt } />
    },
    render: function() {
        var doc = this.props.doc;

        if (doc.caption) {
            return <li className="post post-photo">
                { this.renderPhoto(doc) }
                <div className="caption">{ doc.caption }</div>
              </li>;
        } else {
            return <li className="post post-photo">{ this.renderPhoto(doc) }</li>;
        }
    }
});
