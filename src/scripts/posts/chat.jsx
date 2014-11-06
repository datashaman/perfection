var React = require('react');

module.exports = React.createClass({
    renderTitle: function (doc) {
        return <h3><a href={doc.url}>{ doc.title }</a></h3>;
    },
    renderLabel: function (line) {
        return <span class="label">{line.label}</span>
    },
    renderDialogue: function (doc) {
        var dialogue = doc.dialogue.map(function (line) {
            return <li className={ 'user_' + line.name }>
                { line.label ? this.renderLabel(line) : '' }
                { line.phrase }
            </li>;
        }.bind(this));

        return <ul class="dialogue">
            { dialogue }
        </ul>;
    },
    render: function () {
        var doc = this.props.doc;

        return <li className="post post-chat">
            { doc.title ? this.renderTitle(doc) : '' }
            { doc.dialogue ? this.renderDialogue(doc) : doc.body }
        </li>;
    }
});
