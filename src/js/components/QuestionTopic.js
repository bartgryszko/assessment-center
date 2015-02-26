"use strict";

var React = require('react');

var QuestionTopic = React.createClass({
    propTypes: {
        value: React.PropTypes.string
    },
    render: function () {
        return (
            <h1>
            {this.props.value}
            </h1>
        )
    }
});

module.exports = QuestionTopic;