"use strict";

var ActionsFactory = require('../factories/ActionsFactory');

module.exports = ActionsFactory.createActions({
    CREATE: 'create',
    EDIT: 'edit',
    REBLOG: 'reblog',
    DELETE: 'delete',
});
