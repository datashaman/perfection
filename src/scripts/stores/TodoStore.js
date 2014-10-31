var process = require('process');
var PouchStoreFactory = require('../factories/PouchStoreFactory');

module.exports = PouchStoreFactory.createStore(process.env.LOCAL, {
    remote: process.env.REMOTE,
    username: process.env.REMOTE_USERNAME,
    password: process.env.REMOTE_PASSWORD,
    requireType: true
});
