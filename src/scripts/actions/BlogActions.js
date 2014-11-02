"use strict";

var ActionsFactory = require('../factories/ActionsFactory');

module.exports = ActionsFactory.createActions({
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    PUBLISH: 'publish',
    UNPUBLISH: 'unpublish'
});
