'use strict';

var _ = require('lodash');

var StoresMixin = {
    componentDidMount: function () {
        _.map(this.stores, function (store) {
            store.addChangeListener(this._onChange);
        }.bind(this));
    },
    componentWillUnmount: function () {
        _.map(this.stores, function (store) {
            store.removeChangeListener(this._onChange);
        }.bind(this));
    },
    _onChange: function () {
        this.setState(this.getState());
    }
};

module.exports = StoresMixin;
