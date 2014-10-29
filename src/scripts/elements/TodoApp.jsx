'use strict';

require('../../styles/normalize.css');
// require('../../styles/main.css');

var _ = require('lodash')
var BS = require('react-bootstrap');

var AppFactory = require('../factories/AppFactory');
var EditActions = require('../actions/EditActions');
var PouchStoreActions = require('../actions/PouchStoreActions');
var TodoStore = require('../stores/TodoStore');

var moment = require('moment');

var TodoApp = AppFactory.createApp({
    todos: TodoStore,
}, {
    _createDoc: function (dataset, overrides) {
        var doc = _.extend({
            type: 'todo',
            username: this.stores.todos.options.username,
            _id: dataset.id,
            _rev: dataset.rev
        }, overrides);
        return doc;
    },
    _getStateFromStores: function () {
        var state = {
            todos: this.stores.todos.getAllDocs().rows
        };
        return state;
    },
    _editTodo: function(e) {
        var title = e.target.innerHTML,
            dataset = e.target.parentNode.parentNode.dataset,
            doc = this._createDoc(dataset, {
                state: 'editing',
                title: title
            });
        console.log(doc);
        PouchStoreActions.put(doc);
    },
    _createTodo: function(e) {
        e.preventDefault();
        var title = this.refs.create,
            date = new Date(),
            doc = {
                _id: date.toISOString(),
                title: title.getValue(),
                type: 'todo',
                username: this.stores.todos.options.username,
                state: 'default'
            };
        title.getInputDOMNode().value = '';
        PouchStoreActions.put(doc);
    },
    _updateTodo: function(e) {
        e.preventDefault();
        var title = this.refs.update,
            b = console.log(title),
            dataset = e.target.parentNode.dataset,
            doc = this._createDoc(dataset, {
                title: title.getDOMNode().value,
                state: 'default'
            });
        PouchStoreActions.put(doc);
    },
    _removeTodo: function (e) {
        var dataset = e.target.parentNode.dataset,
            doc = this._createDoc(dataset);
        PouchStoreActions.remove(doc);
    },
    render: function() {
        var todos = this.state.todos
            .filter(function (row) {
                return row.doc.type == 'todo';
            })
            .map(function (todo) {
                var date = moment(todo.doc._id),
                    element,
                    remove;

                if (todo.doc.username == this.stores.todos.options.username) {
                    remove = <BS.Glyphicon onClick={this._removeTodo} glyph="trash" />;
                } else {
                    remove = '';
                }
                if (todo.doc.state == 'editing') {
                    element = <form onSubmit={this._updateTodo}><input ref="update" type="text" defaultValue={todo.doc.title} /></form>;
                } else {
                    element = <b><span onDoubleClick={this._editTodo}>{todo.doc.title}</span></b>;
                }

                return <div key={ todo.doc._id + ':' + todo.doc._key }
                            styles={{ marginBottom: 12 }}
                            data-id={todo.doc._id}
                            data-rev={todo.doc._rev}
                            data-title={todo.doc.title}>
                            <BS.Badge>{ todo.doc.username }</BS.Badge> {element} {remove}<br />
                            <div className="muted">{date.fromNow()}</div>
                       </div>;
            }.bind(this));

        return  <div className="app">
        <BS.Panel>
            {todos}

            <form style={{ marginTop: 12, width: 400 }} onSubmit={this._createTodo}>
                <BS.Input ref="create" type="text" placeholder="Enter text here" />
            </form>
        </BS.Panel>
        </div>;
    }
});

module.exports = TodoApp;
