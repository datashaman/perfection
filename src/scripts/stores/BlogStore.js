var BlogStoreFactory = require('../factories/BlogStoreFactory');

module.exports = BlogStoreFactory.createStore('blog', {
    remote: 'https://datashaman.couchappy.com/blog',
    username: 'datashaman',
    password: 'Gargle12',
    requireType: true
});
