'use strict';

var events = require('events');
var dispatcher = require('../dispatcher');
var BlogActions = require('../actions/BlogActions');
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
    createStore: function (db, options) {
        var emitter = new events.EventEmitter(),
            liveSync = typeof options.liveSync == 'undefined' ? true : options.liveSync,
            requireType = typeof options.requireType == 'undefined' ? false : options.requireType,
            db = new PouchDB(db, { adapter: 'websql' }),
            remote,
            state = {
                rows: []
            },
            store = {
                addChangeListener: function (listener) {
                    emitter.on(CHANGE_EVENT, listener);
                },
                removeChangeListener: function (listener) {
                    emitter.removeListener(CHANGE_EVENT, listener);
                },
                getState: function () {
                    return state;
                },
                options: options
            };

        function updateState () {
            db.allDocs({ include_docs: true }, handleError(function (response) {
                state = response;
                emitter.emit(CHANGE_EVENT);
            }));
        }

        db.changes().on('change', function () {
            updateState();
        });

        store.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action,
                args = payload.args,
                date;

            switch (action) {
                case BlogActions._constants.CREATE:
                    if (!args.postType) {
                        throw new Error('postType must be specified');
                    }

                    args.type = 'post';

                    date = new Date();
                    args._id = date.toISOString();
                case BlogActions._constants.UPDATE:
                    return db.put(args, handleError());
                case BlogActions._constants.DELETE:
                    return db.remove(args, handleError());
                case BlogActions._constants.PUBLISH:
                    args.state = 'published';
                    return db.put(args, handleError());
                case BlogActions._constants.UNPUBLISH:
                    args.state = 'draft';
                    return db.put(args, handleError());
                default:
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
            PouchDB.sync(db, remote, { live: true })
                .on('change', function (info) {
                    // console.log('[Change] ', info);
                    if (info.direction == 'pull') {
                        updateState();
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

        updateState();

        return store;
    }
};
