/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    _ = require('lodash');

var StoresMixin = function (stores) {
    return {
        getInitialState: function () {
            return this._getStateFromStores();
        },
        componentDidMount: function () {
            _.map(stores, function (store) {
                store.addChangeListener(this._onChange);
            }.bind(this));
        },
        componentWillUnmount: function () {
            _.map(stores, function (store) {
                store.removeChangeListener(this._onChange);
            }.bind(this));
        },
        _onChange: function () {
            this.setState(this._getStateFromStores());
        }
    };
};

createApp = function (stores, options) {
    options.stores = stores;
    options.mixins = options.mixins || [];
    options.mixins.unshift(StoresMixin(stores));
    return React.createClass(options);
};

module.exports = {
    createApp: createApp
};
