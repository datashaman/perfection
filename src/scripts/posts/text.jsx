'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function() {
        var doc = this.props.doc;

        if (doc.title) {
            return <li className="post post-text">
                <h3>{ doc.title }</h3>
                {doc.body}
              </li>;
        } else {
            return <li className="post post-text">
                {doc.body}
              </li>;
        }
    }
});
