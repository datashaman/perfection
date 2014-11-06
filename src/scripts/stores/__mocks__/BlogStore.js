'use strict';

var fs = require('fs');

module.exports = {
    getState: function() {
        return {
            rows: [
                { doc: {
                    _id: '01',
                    type: 'post',
                    postType: 'text',
                    title: 'Title',
                    body: 'Body'
                }},
                { doc: {
                    _id: '02',
                    type: 'post',
                    postType: 'photo',
                    caption: 'Caption',
                    url: 'http://www.example.com',
                    _attachments: {
                    }
                }},
                { doc: {
                    _id: '03',
                    type: 'post',
                    postType: 'quote',
                    quote: 'Quote',
                    source: 'Source'
                }},
                { doc: {
                    _id: '04',
                    type: 'post',
                    postType: 'link',
                    url: 'http://www.example.com',
                    name: 'Name',
                    description: 'Description'
                }},
                { doc: {
                    _id: '05',
                    type: 'post',
                    postType: 'chat',
                    title: 'Title',
                    body: 'Body',
                    dialogue: [
                        { name: 'Name', label: 'Label', phrase: 'Phrase' },
                        { name: 'Other Name', label: 'Other Label', phrase: 'Other Phrase' }
                    ]
                }},
                { doc: {
                    _id: '06',
                    type: 'post',
                    postType: 'audio',
                    url: 'http://www.alchemist.com.au/audio/first-contact.mp3',
                    attachments: {
                    }
                }},
                { doc: {
                    _id: '07',
                    type: 'post',
                    postType: 'video',
                    url: 'http://static.gamespot.com/bundles/phoenixsite/flash/gamesvideo3_9_340.swf',
                    attachments: {
                    }
                }}
            ]
        };
    },
    options: {
        remote: 'https://username.couchappy.com/dbname',
        username: 'username',
        password: 'password',
        requireType: true
    }
};
