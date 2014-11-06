'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function() {
        var doc = this.props.doc;

        if (doc.source) {
            return <li className="post post-quote">
                "{doc.quote}"
                <div className="source">{ doc.source }</div>
              </li>;
        } else {
            return <li className="post post-quote">
                "{doc.quote}"
              </li>;
        }
    }
});
