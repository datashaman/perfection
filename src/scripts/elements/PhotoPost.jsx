'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');

module.exports = React.createClass({
    render: function() {
        var doc = this.props.doc;

        if (doc.caption) {
            return <li className="post photo">
                <img src={ doc.url } width={ doc.width || 500} alt={ doc.alt } />
                <div className="caption">{ doc.caption }</div>
              </li>;
        } else {
            return <li className="post photo">
                <img src={ doc.url } width={ doc.width || 500 } alt={ doc.alt } />
              </li>;
        }
    }
});
