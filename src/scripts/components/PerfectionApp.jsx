/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var localCouch = new PouchDB('todos');
var remoteCouch = new PouchDB('http://localhost:5984/todos');

var PerfectionApp = React.createClass({
    getInitialState: function () {
        return { rows: [] };
    },
    updateState: function () {
        localCouch.allDocs({ include_docs: true, descending: true }, function (err, state) {
            if(err) return console.error(err);
            this.setState(state);
        }.bind(this));
    },
    componentDidMount: function () {
        PouchDB.sync(localCouch, remoteCouch, { live: true }).on('change', this.updateState);
        this.updateState();
    },
    removeItem: function (e) {
        var dataset = e.target.parentNode.dataset,
        doc = { _id: dataset.id, _rev: dataset.rev };
        localCouch.remove(doc, function (err, response) {
            this.updateState();
        }.bind(this));
    },
    render: function() {
        var rows = this.state.rows.map(function (row) {
            return <li
                    key={row.doc._id + '-' + row.doc._rev}
                    data-id={row.doc._id}
                    data-rev={row.doc._rev}>
                    {row.doc.title} <span onClick={this.removeItem}>X</span>
                </li>;
        }.bind(this));

        return (
            <div className='main'>
            <ul>{rows}</ul>
            </div>
        );
    }
});

module.exports = PerfectionApp;
