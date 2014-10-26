/**
 * @jsx React.DOM
 */

'use strict';

var Reflux = require('reflux'),
    createStore = function (options) {
        if (typeof options.liveSync == 'undefined') {
            options.liveSync = true;
        }

        var actions = Reflux.createActions([ 'post', 'put', 'remove', 'allDocs' ]),
            store = Reflux.createStore({
                listenables: actions,
                init: function () {
                    this.local = new PouchDB(options.local);

                    this.local.changes().on('change', function () {
                        actions.allDocs();
                    });

                    if (options.remote) {
                        this.remote = new PouchDB(options.remote);

                        if (options.liveSync) {
                            if (options.username && options.password) {
                                this.remoteLogin(options.username, options.password, this.liveSync);
                            } else {
                                this.liveSync();
                            }
                        }
                    }
                },
                handleError: function (callback) {
                    var self = this;
                    return function (error, response) {
                        if (error) {
                            return console.error(error);
                        } else {
                            return callback.call(self, response);
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
                                    return alert(error.message);
                                } else {
                                    return console.error(error);
                                }
                            } else {
                                return callback.call(self, response);
                            }
                        }
                    );
                },
                liveSync: function () {
                    return PouchDB.sync(this.local, this.remote, { live: true })
                        .on('change', function (info) {
                            // console.log('[Change] ', info);
                            if (info.direction == 'pull') {
                                actions.allDocs();
                            }
                        })
                        .on('complete', function (error) {
                            console.error('[Complete]', error);
                        })
                        .on('uptodate', function (info) {
                            // console.log('[Up-to-date]', info);
                        })
                        .on('error', function (error) {
                            console.error('[Error]', error);
                        });
                }
            });

        store.actions = actions;
        return store;
    };

module.exports = {
    createStore: createStore
};
