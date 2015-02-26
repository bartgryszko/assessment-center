"use strict";

var React = require('react'),
    AnswerInput = require('./AnswerInput'),
    AnswerButtons = require('./AnswerButtons');

var AnswerSection = React.createClass({

    propTypes: {
        currentAnswer: React.PropTypes.object
    },

    render: function () {
        var saveHidden = this.props.currentAnswer.value.length === 0,
            saveDisabled = this.props.currentAnswer.is_being_saved,
            nextEnabled = this.props.currentAnswer.is_saved,
            publicChecked = this.props.currentAnswer.is_public,
            classes = ["answer-section"];

        if (nextEnabled || saveDisabled) {
            classes.push("saved");
        }

        return (
            <div className={classes.join(" ")}>
                <AnswerInput
                    disabled={saveDisabled}
                    value={this.props.currentAnswer.value} />
                <AnswerButtons
                    publicChecked={publicChecked}
                    saveHidden={saveHidden}
                    saveDisabled={saveDisabled}
                    nextEnabled={nextEnabled} />
            </div>
        )
    }
});

module.exports = AnswerSection;