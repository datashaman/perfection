'use strict';

// require('../../styles/normalize.css');
// require('../../styles/main.css');

var _ = require('lodash')
var React = require('react/addons');
var BS = require('react-bootstrap');

var StoresMixin = require('../mixins/StoresMixin');
var BlogActions = require('../actions/BlogActions');
var BlogStore = require('../stores/BlogStore');

var PostTypes = {
    text: require('../posts/text'),
    photo: require('../posts/photo'),
    photoset: require('../posts/photoset'),
    quote: require('../posts/quote'),
    link: require('../posts/link'),
    chat: require('../posts/chat'),
    audio: require('../posts/audio'),
    video: require('../posts/video')
};

function getKey(doc) {
    return doc._id + ':' + doc._rev;
}

function renderPost(row) {
    var doc = row.doc;
    var PostType = PostTypes[doc.postType];
    var element = React.createElement(PostType, { key: getKey(doc), doc: doc });
    return element;
}

var BlogApp = React.createClass({
    stores: {
        blog: BlogStore
    },
    mixins: [ StoresMixin, React.addons.LinkedStateMixin ],
    getInitialState: function () {
        return this.getState();
    },
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
                    <p>Connected to <span className="remote">{this.stores.blog.options.remote}</span></p>
                    <ul className="posts">
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
    }
});

module.exports = BlogApp;
