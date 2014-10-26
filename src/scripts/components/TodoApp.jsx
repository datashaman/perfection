/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    Button = require('react-bootstrap/Button'),
    Input = require('react-bootstrap/Input'),
    Reflux = require('reflux'),
    PouchStore = require('../stores/PouchStore');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
// require('../../styles/main.css');

var TodoStore = PouchStore.createStore({
    local: 'todos',
    remote: 'http://localhost:5984/todos',
    username: 'datashaman',
    password: 'Gargle12'
});

var TodoApp = React.createClass({
    mixins: [ Reflux.connect(TodoStore) ],
    getInitialState: function() {
        return { rows: [] };
    },
    postTodo: function(e) {
        e.preventDefault();
        var title = this.refs.title,
            doc = { title: title.getValue() };
        title.getInputDOMNode().value = '';
        TodoStore.actions.post(doc);
        return false;
    },
    putTodo: function() {
        var title = this.refs.title,
            dataset = e.target.parentNode.dataset,
            doc = { _id: dataset.id, _rev: dataset.rev, title: title.getValue() };
        title.getInputDOMNode().value = '';
        TodoStore.actions.put(doc);
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

        return  <div className="app">
                <form style={{ margin: 20, width: 400 }}>
                    <Input ref="title" type="text" placeholder="Enter text here" />
                    <Input type="submit" bsSize="xsmall" bsStyle="primary" onClick={this.postTodo} value="Submit" /><br/>
                </form>
                <ul>{rows}</ul>
                </div>;
    }
});

TodoStore.actions.allDocs();

module.exports = TodoApp;
