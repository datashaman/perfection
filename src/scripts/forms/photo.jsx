'use strict';

var React = require('react/addons');
var BS = require('react-bootstrap');
var BlogActions = require('../actions/BlogActions');

module.exports = React.createClass({
  mixins: [ React.addons.LinkedStateMixin ],
  getInitialState: function() {
      return {
        postType: 'photo',
        url: '',
        attachments: []
      };
  },
  handleSubmit: function (e) {
      var state = this.state,
          attachments = this.refs.attachments.getDOMNode().children[0].files;

      e.preventDefault();

      state = _.extend(state, {
          attachments: attachments
      });

      BlogActions.create(state)
  },
  render: function () {
    return <form onSubmit={this.handleSubmit}>
      <BS.Input type="text" valueLink={this.linkState('url')} placeholder="URL" />
      <BS.Input type="file" ref="attachments" placeholder="File" multiple />
      <input type="submit" className="btn btn-primary" value="Post" />
    </form>;
  }
});
