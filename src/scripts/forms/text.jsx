'use strict';

var React = require('react/addons');
var BS = require('react-bootstrap');
var BlogActions = require('../actions/BlogActions');

module.exports = React.createClass({
    mixins: [ React.addons.LinkedStateMixin ],
    getInitialState: function() {
        return {
            postType: 'text',
            title: '',
            body: ''
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        BlogActions.create(this.state);
    },
    render: function () {
        return <form onSubmit={this.handleSubmit}>
            <BS.Input type="text" valueLink={this.linkState('title')} placeholder="Title" />
            <BS.Input type="textarea" valueLink={this.linkState('body')} placeholder="Body" required />
            <input type="submit" className="btn btn-primary" value="Post" />
        </form>;
    }
});
