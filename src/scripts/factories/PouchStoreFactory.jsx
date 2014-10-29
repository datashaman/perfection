'use strict';

var events = require('events');
var dispatcher = require('../dispatcher');
var PouchStoreActions = require('../actions/PouchStoreActions');
var CHANGE_EVENT = 'change';

function handleError (callback) {
    return function (error, response) {
        if (error) {
            return console.error(error);
        } else if (callback) {
            return callback(response);
        }
    }
};

module.exports = {
    createStore: function (local, options) {
        var emitter = new events.EventEmitter(),
            liveSync = typeof options.liveSync == 'undefined' ? true : options.liveSync,
            requireType = typeof options.requireType == 'undefined' ? false : options.requireType,
            local = new PouchDB(local, { adapter: 'websql' }),
            remote,
            allDocs = {
                rows: []
            },
            store = {
                addChangeListener: function (listener) {
                    emitter.on(CHANGE_EVENT, listener);
                },
                removeChangeListener: function (listener) {
                    emitter.removeListener(CHANGE_EVENT, listener);
                },
                getAllDocs: function () {
                    return allDocs;
                },
                options: options
            };

        function updateAllDocs () {
            local.allDocs({ include_docs: true }, handleError(function (response) {
                allDocs = response;
                emitter.emit(CHANGE_EVENT);
            }));
        }

        local.changes().on('change', function () {
            updateAllDocs();
        });

        store.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action,
                args = payload.args;

            if (requireType && !args.type) {
                throw new Error('type must be specified');
            }

            switch (action) {
                case PouchStoreActions._constants.POST:
                case PouchStoreActions._constants.PUT:
                    return local.put(args, handleError());
                case PouchStoreActions._constants.REMOVE:
                    return local.remove(args, handleError());
                default:
                    // ignore
            };
        });

        function remoteLogin (username, password, callback) {
            remote.login(
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
                        return callback();
                    }
                }
            );
        }

        function setupLiveSync () {
            PouchDB.sync(local, remote, { live: true })
                .on('change', function (info) {
                    // console.log('[Change] ', info);
                    if (info.direction == 'pull') {
                        updateAllDocs();
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

        if (options.remote) {
            remote = new PouchDB(options.remote);

            if (liveSync) {
                if (options.username && options.password) {
                    remoteLogin(options.username, options.password, setupLiveSync);
                } else {
                    setupLiveSync();
                }
            }
        }

        updateAllDocs();

        return store;
    }
};
