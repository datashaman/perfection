'use strict';

require('../../styles/normalize.css');
// require('../../styles/main.css');

var _ = require('lodash')
var BS = require('react-bootstrap');

var AppFactory = require('../factories/AppFactory');
var BlogActions = require('../actions/BlogActions');
var BlogStore = require('../stores/BlogStore');

function getKey(doc) {
    return doc._id + ':' + doc._rev;
}

function renderPost(row) {
    var doc = row.doc;
    return React.createElement(require('../posts/' + doc.postType), { key: getKey(doc), doc: doc });
}

var BlogApp = AppFactory.createApp({
    blog: BlogStore
}, {
    mixins: [ React.addons.LinkedStateMixin ],
    getState: function () {
        var state = {
            blog: this.stores.blog.getState(),
            type: 'photo'
        };
        return state;
    },
    render: function() {
        var posts = this.state.blog.rows
                .filter(function (row) {
                    return row.doc.type == 'post';
                })
                .map(renderPost);

        var PostForm = require('../forms/' + this.state.type);

        return <BS.Grid style={{ marginTop: 12 }}>
            <BS.Row>
                <BS.Col md="6">
                    <p>Connected to {this.stores.blog.options.remote}</p>
                    <ul id="posts">
                        {posts}
                    </ul>
                </BS.Col>

                <BS.Col md="6">
                    <BS.Input type="select" valueLink={ this.linkState('type') }>
                        <option value="text">Text</option>
                        <option value="photo">Photo</option>
                        <option value="quote">Quote</option>
                        <option value="link">Link</option>
                        <option value="chat">Chat</option>
                        <option value="audio">Audio</option>
                        <option value="video">Video</option>
                    </BS.Input>

                    <PostForm />
                </BS.Col>
            </BS.Row>
        </BS.Grid>;
    },
    componentDidMount: function() {
        return;
        setInterval(function() {
            this.forceUpdate();
        }.bind(this), 1000);
    }
});

module.exports = BlogApp;
