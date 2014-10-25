/**
 * @jsx React.DOM
 */

'use strict';

var Reflux = require('reflux'),
    createStore = function (options) {
        var actions = Reflux.createActions([ 'add', 'remove', 'load' ]),
            store = Reflux.createStore({
                listenables: actions,
                init: function () {
                    this.local = new PouchDB(options.local);
                    this.remote = new PouchDB(options.remote);
                    this.replicators = [
                        this.replicate('remote', 'local'),
                        this.replicate('local', 'remote')
                    ];
                },
                handleError: function (callback) {
                    var self = this;
                    return function (error, response) {
                        if (error)
                            console.error(error);
                        else
                            callback.call(self, response);
                    };
                },
                onAdd: function (todo) {
                    return this.local.post(todo, this.handleError(actions.load));
                },
                onRemove: function (todo) {
                    return this.local.remove(todo, this.handleError(actions.load));
                },
                onLoad: function () {
                    return this.local.allDocs({ include_docs: true }, this.handleError(this.trigger));
                },
                replicate: function (from, to) {
                    PouchDB.replicate(this[from], this[to], { live: true }).on('change', function () {
                        if (to == 'local') {
                            actions.load();
                        }
                    });
                }
            });

        store.actions = actions;
        return store;
    };

module.exports = {
    createStore: createStore
};
