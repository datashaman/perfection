var PouchStoreFactory = require('../factories/PouchStoreFactory');

module.exports = PouchStoreFactory.createStore( 'todos', {
    local: 'todos',
    remote: 'https://datashaman.couchappy.com/todos',
    username: 'datashaman',
    password: 'Gargle12',
    requireType: true
});
