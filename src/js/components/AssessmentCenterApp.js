"use strict";

var React = require('react'),
    QuestionSection = require('./QuestionSection'),
    AnswerSection = require('./AnswerSection'),
    QuestionStore = require('../stores/QuestionStore'),
    UserAnswerStore = require('../stores/UserAnswerStore'),
    CommunityAnswersStore = require('../stores/CommunityAnswersStore'),
    CommunityAnswersSection = require('./CommunityAnswersSection');

function getStateFromStores() {
    return {
        question: QuestionStore.current(),
        currentAnswer: UserAnswerStore.current(),
        communityAnswers: CommunityAnswersStore.current()
    };
}

var AssessmentCenterApp = React.createClass({
    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        QuestionStore.addChangeListener(this._stateChange);
        UserAnswerStore.addChangeListener(this._stateChange);
        CommunityAnswersStore.addChangeListener(this._stateChange);
    },

    componentWillUnmount: function () {
        QuestionStore.removeChangeListener(this._stateChange);
        UserAnswerStore.removeChangeListener(this._stateChange);
        CommunityAnswersStore.removeChangeListener(this._stateChange);
    },

    render: function () {
        var communityAnswers = "";

        if (this.state.question === false) {
            return (
                <div className="assessment-center loading">
                    Loading...
                </div>
            );
        }

        if (UserAnswerStore.isCurrentAlreadyAnswered()){
            communityAnswers = <CommunityAnswersSection answers={this.state.communityAnswers} />
        }

        return (
            <div className="assessment-center">
                <QuestionSection question={this.state.question} />
                <AnswerSection currentAnswer={this.state.currentAnswer} />
                {communityAnswers}
            </div>
        );
    },

    _stateChange: function () {
        this.setState(getStateFromStores());
    }
});

module.exports = AssessmentCenterApp;