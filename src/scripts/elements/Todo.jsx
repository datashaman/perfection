'use strict';

var React = require('react');
var _ = require('lodash')
var BS = require('react-bootstrap');

var PouchStoreActions = require('../actions/PouchStoreActions');

var moment = require('moment');

var Todo = React.createClass({
    _editTodo: function(e) {
        var title = e.target.innerHTML,
            doc = _.extend(this.props.doc, {
                state: 'editing',
                title: title
            });
        PouchStoreActions.put(doc);
    },
    _updateTodo: function(e) {
        e.preventDefault();
        var title = this.refs.update,
            doc = _.extend(this.props.doc, {
                title: title.getDOMNode().value,
                state: 'default'
            });
        PouchStoreActions.put(doc);
    },
    _removeTodo: function () {
        PouchStoreActions.remove(this.props.doc);
    },
    render: function() {
        var doc = this.props.doc,
            date = moment(doc._id),
            element,
            remove;

        if (doc.username == this.props.username) {
            remove = <BS.Glyphicon onClick={this._removeTodo} glyph="trash" />;
        } else {
            remove = '';
        }

        if (doc.state == 'editing') {
            element = <form onSubmit={this._updateTodo}><input ref="update" type="text" defaultValue={doc.title} /></form>;
        } else {
            element = <b><span onDoubleClick={this._editTodo}>{doc.title}</span></b>;
        }

        return <div>
                    <BS.Badge>{ doc.username }</BS.Badge> {element} {remove}<br />
                    <div className="muted">{date.fromNow()}</div>
              </div>;
    }
});

module.exports = Todo;
