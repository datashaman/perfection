'use strict';

var React = require('react');

module.exports = React.createClass({
    renderLink: function (doc) {
        return <a href={doc.url} class="link">{doc.name}</a>;
    },
    render: function () {
        var doc = this.props.doc;

        if (doc.description) {
            return <li className="post post-link">
                {this.renderLink(doc)}
                <div class="description">{doc.description}</div>
            </li>;
        } else {
            return <li className="post post-link">
                {this.renderLink(doc)}}
            </li>;
        }
    }
});
