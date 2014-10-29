/**
 * @jsx React.DOM
 */

'use strict';

require('../../styles/normalize.css');
// require('../../styles/main.css');

var BS = require('react-bootstrap');

var AppFactory = require('../factories/AppFactory');
var PouchStoreActions = require('../actions/PouchStoreActions');
var TodoStore = require('../stores/TodoStore');

var moment = require('moment');

var TodoApp = AppFactory.createApp({
    todos: TodoStore,
}, {
    _getStateFromStores: function () {
        var state = {
            todos: this.stores.todos.getAllDocs().rows
        };
        return state;
    },
    _postTodo: function(e) {
        e.preventDefault();
        var title = this.refs.title,
            date = new Date(),
            doc = {
                _id: date.toISOString(),
                title: title.getValue(),
                type: 'todo'
            };
        title.getInputDOMNode().value = '';
        PouchStoreActions.post(doc);
    },
    _putTodo: function() {
        var title = this.refs.title,
            dataset = e.target.parentNode.dataset,
            doc = {
                _id: dataset.id,
                _rev: dataset.rev,
                title: title.getValue()
            };
        title.getInputDOMNode().value = '';
        PouchStoreActions.put(doc);
    },
    _removeTodo: function (e) {
        var dataset = e.target.parentNode.dataset,
            doc = { _id: dataset.id, _rev: dataset.rev };
        PouchStoreActions.remove(doc);
    },
    render: function() {
        var todos = this.state.todos
            .filter(function (row) {
                return row.doc.type == 'todo';
            })
            .map(function (todo) {
                var date = moment(todo.doc._id),
                    remove;
                if (todo.doc.username == this.stores.todos.options.username) {
                    remove = <BS.Glyphicon onClick={this._removeTodo} glyph="trash" />;
                } else {
                    remove = '';
                }
                return <div key={ todo.doc._id + ':' + todo.doc._key }
                        styles={{ marginBottom: 12 }}
                        data-id={todo.doc._id}
                        data-rev={todo.doc._rev}>
                        <BS.Badge>{ todo.doc.username }</BS.Badge> <b>{todo.doc.title}</b> {remove}<br />
                        <div className="muted">{date.fromNow()}</div>
                    </div>;
            }.bind(this));

        return  <div className="app">
        <BS.Panel>
            {todos}

            <form style={{ marginTop: 12, width: 400 }} onSubmit={this._postTodo}>
                <BS.Input ref="title" type="text" placeholder="Enter text here" />
            </form>
        </BS.Panel>
        </div>;
    }
});

module.exports = TodoApp;
