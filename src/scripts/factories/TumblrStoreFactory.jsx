'use strict';

var events = require('events');
var dispatcher = require('../dispatcher');
var TumblrStoreActions = require('../actions/TumblrStoreActions');
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
        var emitter = new events.EventEmitter();
        var store = {
            addChangeListener: function (listener) {
                emitter.on(CHANGE_EVENT, listener);
            },
            removeChangeListener: function (listener) {
                emitter.removeListener(CHANGE_EVENT, listener);
            },
            options: options
        };

        store.dispatchToken = dispatcher.register(function (payload) {
            var action = payload.action,
                args = payload.args;

            switch (action) {
                case TumbleStoreActions._constants.CREATE:
                case TumbleStoreActions._constants.EDIT:
                case TumbleStoreActions._constants.REBLOG:
                case TumbleStoreActions._constants.DELETE:
                default:
            };
        });

        return store;
    }
};
