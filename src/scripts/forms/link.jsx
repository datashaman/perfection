var React = require('react/addons');
var BS = require('react-bootstrap');
var BlogActions = require('../actions/BlogActions');

module.exports = React.createClass({
  mixins: [ React.addons.LinkedStateMixin ],
  getInitialState: function () {
      return {
          postType: 'link',
          url: '',
          name: '',
          description: ''
      };
  },
  handleSubmit: function (e) {
      e.preventDefault();
      BlogActions.create(this.state);
  },
  render: function () {
    return <form onSubmit={this.handleSubmit}>
      <BS.Input type="text" valueLink={this.linkState('url')} placeholder="URL" />
      <BS.Input type="text" valueLink={this.linkState('name')} placeholder="Name" />
      <BS.Input type="textarea" valueLink={this.linkState('description')} placeholder="Description" />
      <input type="submit" className="btn btn-primary" value="Post" />
    </form>;
  }
});
