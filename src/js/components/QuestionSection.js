"use strict";

var React = require('react'),
    QuestionTopic = require('./QuestionTopic'),
    QuestionCategory = require('./QuestionCategory');

var AnswerSection = React.createClass({

    propTypes: {
        question: React.PropTypes.object
    },

    render: function () {
        return (
            <div className="answer-section">
                <QuestionCategory category={this.props.question.category} />
                <QuestionTopic value={this.props.question.value} />
            </div>
        )
    }
});

module.exports = AnswerSection;