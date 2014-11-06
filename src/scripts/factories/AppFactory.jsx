'use strict';

var React = require('react/addons'),
    _ = require('lodash');

var createApp = function (stores, options) {
    options.stores = stores;
    options.mixins = options.mixins || [];
    options.mixins.unshift(StoresMixin(stores));
    return React.createClass(options);
};

module.exports = {
    createApp: createApp
};
