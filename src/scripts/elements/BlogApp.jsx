'use strict';

require('../../styles/normalize.css');
// require('../../styles/main.css');

var _ = require('lodash')
var BS = require('react-bootstrap');

var AppFactory = require('../factories/AppFactory');
var BlogActions = require('../actions/BlogActions');
var BlogStore = require('../stores/BlogStore');
var TextPost = require('./TextPost');
var QuotePost = require('./QuotePost');
var LinkPost = require('./LinkPost');
var VideoPost = require('./VideoPost');
var AudioPost = require('./AudioPost');
var PhotoPost = require('./PhotoPost');
var PhotosetPost = require('./PhotosetPost');

function getKey(doc) {
    return doc._id + ':' + doc._rev;
}

function renderPost(row) {
    var key = getKey(row.doc);
    switch (row.doc.postType) {
        case 'text':
            return <TextPost key={ key } doc={ row.doc } />;
        case 'photo':
            return <PhotoPost key={ key } doc={ row.doc } />;
        case 'quote':
            return <QuotePost key={ key } doc={ row.doc } />;
        case 'link':
            return <LinkPost key={ key } doc={ row.doc } />;
        case 'video':
            return <VideoPost key={ key } doc={ row.doc } />;
        case 'audio':
            return <AudioPost key={ key } doc={ row.doc } />;
        case 'photoset':
            return <PhotosetPost key={ key } doc={ row.doc } />;
    }
}

var BlogApp = AppFactory.createApp({
    blog: BlogStore
}, {
    _getStateFromStores: function () {
        var state = this.stores.blog.getState();
        return state;
    },
    _createPost: function(e) {
        e.preventDefault();

        var title = this.refs.title,
            body = this.refs.body,
            post = {
                postType: 'text',
                title: title.getValue(),
                body: body.getValue()
            };

        BlogActions.create(post);

        title.getInputDOMNode().value = '';
        body.getInputDOMNode().value = '';
    },
    render: function() {
        var posts = this.state.rows
            .filter(function (row) {
                return row.doc.type == 'post';
            })
            .map(renderPost);

        return  <BS.Grid>
            <BS.Row>
                <BS.Col md="6">
                <p>
                    Connected to {this.stores.blog.options.remote}
                </p>

                <ol id="posts">
                    {posts}
                </ol>
                </BS.Col>

                <BS.Col md="6">
                    <form style={{ marginTop: 12, width: 400 }}>
                        <BS.Input ref="title" type="text" placeholder="Title (optional)" />
                        <BS.Input ref="body" type="textarea" placeholder="Body" />
                        <BS.Input type="submit" value="Create post" onClick={this._createPost}/>
                    </form>
                </BS.Col>
            </BS.Row>
        </BS.Grid>;
    },
    componentDidMount: function() {
        setInterval(function() {
            this.forceUpdate();
        }.bind(this), 1000);
    }
});

module.exports = BlogApp;
