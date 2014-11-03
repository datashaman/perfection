var React = require('react/addons');
var BS = require('react-bootstrap');
var BlogActions = require('../actions/BlogActions');

module.exports = React.createClass({
  mixins: [ React.addons.LinkedStateMixin ],
  getInitialState: function() {
      return {
          postType: 'quote',
          quote: '',
          source: ''
      };
  },
  handleSubmit: function (e) {
      e.preventDefault();
      BlogActions.create(this.state);
  },
  render: function () {
    return <form onSubmit={this.handleSubmit}>
      <BS.Input type="textarea" valueLink={this.linkState('quote')} placeholder="Quote" />
      <BS.Input type="textarea" valueLink={this.linkState('source')} placeholder="Source" />
      <input type="submit" className="btn btn-primary" value="Post" />
    </form>;
  }
});
