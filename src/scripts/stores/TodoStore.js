var PouchStoreFactory = require('../factories/PouchStoreFactory');

module.exports = PouchStoreFactory.createStore( 'dbname', {
    remote: 'https://username.couchappy.com/dbname',
    username: 'username',
    password: 'password',
    requireType: true
});
