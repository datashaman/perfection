/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    Reflux = require('reflux'),
    PouchStore = require('./../stores/PouchStore');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
// require('../../styles/main.css');

var TodoStore = PouchStore.createStore({
    local: 'todos',
    remote: 'http://localhost:5984/todos'
});

var TodoApp = React.createClass({
    mixins: [ Reflux.connect(TodoStore) ],
    getInitialState: function() {
        return { rows: [] };
    },
    addTodo: function() {
        var title = this.refs.title.getDOMNode(),
            doc = { title: title.value };
        title.value = '';
        TodoStore.actions.add(doc);
    },
    removeTodo: function (e) {
        var dataset = e.target.parentNode.dataset,
            doc = { _id: dataset.id, _rev: dataset.rev };
        TodoStore.actions.remove(doc);
    },
    render: function() {
        var rows = this.state.rows.map(function (todo) {
            return <li
                key={todo.doc._id + '-' + todo.doc._rev}
                data-id={todo.doc._id}
                data-rev={todo.doc._rev}>
                {todo.doc.title} <span onClick={this.removeTodo}>X</span>
            </li>;
        }.bind(this));

        return <div className="main">
                <input type="text" ref="title" placeholder="Enter text here" /><button onClick={this.addTodo}>Submit</button>
                <ul>{rows}</ul>
            </div>;
    }
});

TodoStore.actions.load();

module.exports = TodoApp;
