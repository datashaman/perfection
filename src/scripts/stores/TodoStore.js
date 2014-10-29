var PouchStoreFactory = require('../factories/PouchStoreFactory');

module.exports = PouchStoreFactory.createStore( 'todos', {
    local: 'todos',
    remote: 'http://localhost:5984/todos',
    username: 'datashaman',
    password: 'Gargle12',
    requireType: true
});
