/**
 * @jsx React.DOM
 */

'use strict';

var Reflux = require('reflux'),
    createStore = function (options) {
        var actions = Reflux.createActions([ 'post', 'put', 'remove', 'allDocs' ]),
            store = Reflux.createStore({
                listenables: actions,
                init: function () {
                    this.local = new PouchDB(options.local);

                    if (options.remote) {
                        this.remote = new PouchDB(options.remote);

                        if (options.username && options.password) {
                            this.remoteLogin(options.username, options.password, this.sync);
                        } else {
                            this.sync();
                        }
                    }
                },
                handleError: function (callback) {
                    var self = this;
                    return function (error, response) {
                        if (error) {
                            console.error(error);
                        } else {
                            callback.call(self, response);
                        }
                    };
                },
                onPost: function (todo) {
                    return this.local.post(todo, this.handleError(actions.allDocs));
                },
                onPut: function (todo) {
                    return this.local.put(todo, this.handleError(actions.allDocs));
                },
                onRemove: function (todo) {
                    return this.local.remove(todo, this.handleError(actions.allDocs));
                },
                onAllDocs: function (response) {
                    return this.local.allDocs({ include_docs: true }, this.handleError(this.trigger));
                },
                remoteLogin: function (username, password, callback) {
                    var self = this;
                    this.remote.login(
                        username,
                        password,
                        function (error, response) {
                            if (error) {
                                if (error.name == "unauthorized") {
                                    alert(error.message);
                                } else {
                                    console.error(error);
                                }
                            } else {
                                callback.call(self, response);
                            }
                        }
                    );
                },
                sync: function () {
                    return PouchDB.sync(this.local, this.remote, { live: true })
                        .on('change', function (info) {
                            actions.allDocs();
                        })
                        .on('complete', function (error) {
                            console.error(error);
                        })
                        .on('uptodate', function (info) {
                            console.log(info);
                        })
                        .on('error', function (error) {
                            console.error(error);
                        });
                }
            });

        store.actions = actions;
        return store;
    };

module.exports = {
    createStore: createStore
};
