'use strict';

jest.dontMock('../BlogApp.jsx');

describe('BlogApp', function() {
    it('displays a list of docs in the database', function() {
        var BlogApp = require('../BlogApp.jsx');

        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var blog = TestUtils.renderIntoDocument(<BlogApp />);

        var remote = TestUtils.findRenderedDOMComponentWithClass(blog, 'remote');
        expect(remote.getDOMNode().textContent).toEqual('https://username.couchappy.com/dbname');

        var posts = TestUtils.findRenderedDOMComponentWithClass(blog, 'posts');

        TestUtils.findRenderedDOMComponentWithClass(blog, 'post-text');
        TestUtils.findRenderedDOMComponentWithClass(blog, 'post-photo');
        TestUtils.findRenderedDOMComponentWithClass(blog, 'post-quote');
        TestUtils.findRenderedDOMComponentWithClass(blog, 'post-link');
        TestUtils.findRenderedDOMComponentWithClass(blog, 'post-chat');
        TestUtils.findRenderedDOMComponentWithClass(blog, 'post-audio');
        TestUtils.findRenderedDOMComponentWithClass(blog, 'post-video');
    });
});
