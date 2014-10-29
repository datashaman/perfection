"use strict";

var ActionsFactory = require('../factories/ActionsFactory');

module.exports = ActionsFactory.createActions({
    START: 'start',
    CANCEL: 'cancel',
    SUBMIT: 'submit'
});
