"use strict";

var dispatcher = require('../dispatcher');
var _ = require('lodash');

module.exports = {
    createActions: function (definition) {
        var actions = _.zipObject(_.values(definition), _.map(definition, function (name, constantName) {
            return function (args) {
                dispatcher.dispatch({
                    action: name,
                    args: args
                });
            };
        }));
        actions._constants = definition;
        return actions;
    }
};
