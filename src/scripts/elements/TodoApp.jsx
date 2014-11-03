'use strict';

require('../../styles/normalize.css');
// require('../../styles/main.css');

var _ = require('lodash')
var BS = require('react-bootstrap');

var AppFactory = require('../factories/AppFactory');
var EditActions = require('../actions/EditActions');
var PouchStoreActions = require('../actions/PouchStoreActions');
var BlogActions = require('../actions/BlogActions');
var TodoStore = require('../stores/TodoStore');
var BlogStore = require('../stores/BlogStore');
var Todo = require('./Todo');

var moment = require('moment');

var TodoApp = AppFactory.createApp({
    todos: TodoStore,
    blog: BlogStore
}, {
    getState: function () {
        var state = {
            todos: this.stores.todos.getAllDocs().rows,
            posts: this.stores.blog.getState().posts
        };
        return state;
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
    render: function() {
        var todos = this.state.todos
            .filter(function (row) {
                return row.doc.type == 'todo';
            })
            .map(function (todo) {
                return <Todo key={ todo.doc._id + ':' + todo.doc._key }
                            styles={{ marginBottom: 12 }}
                            doc={todo.doc}
                            username={this.stores.todos.options.username} />
            }.bind(this));

        return  <div className="app">
        <BS.Panel>
            <p>
                Connected to {this.stores.todos.options.remote}
            </p>

            {todos}

            <form style={{ marginTop: 12, width: 400 }} onSubmit={this._createTodo}>
                <BS.Input ref="create" type="text" placeholder="Enter text here" />
            </form>
        </BS.Panel>
        </div>;
    },
    componentDidMount: function() {
        setInterval(function() {
            this.forceUpdate();
        }.bind(this), 1000);
    }
});

module.exports = TodoApp;
