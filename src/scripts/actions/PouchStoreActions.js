"use strict";

var ActionsFactory = require('../factories/ActionsFactory');

module.exports = ActionsFactory.createActions({
    POST: 'post',
    PUT: 'put',
    REMOVE: 'remove',
});
