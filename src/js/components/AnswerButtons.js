"use strict";

var React = require('react'),
    AnswerNextButton = require('./AnswerNextButton'),
    AnswerSaveButton = require('./AnswerSaveButton'),
    AnswerPublicCheckbox = require('./AnswerPublicCheckbox');

var AnswerButtons = React.createClass({

    propTypes: {
        nextEnabled: React.PropTypes.bool,
        saveDisabled: React.PropTypes.bool,
        saveHidden: React.PropTypes.bool,
        publicChecked: React.PropTypes.bool
    },

    render: function () {
        var save_or_next = [],
            checkbox = [];

        if (this.props.nextEnabled || !this.props.saveHidden) {
            checkbox.push(<AnswerPublicCheckbox
                key="publicCheckbox"
                disabled={this.props.saveDisabled}
                checked={this.props.publicChecked} />);
        }

        if (this.props.nextEnabled) {
            save_or_next.push(<AnswerNextButton
                key="nextButton" />);
        } else if (!this.props.saveHidden) {
            save_or_next.push(<AnswerSaveButton
                key="saveButton"
                disabled={this.props.saveDisabled} />);
        }

        return (
            <div className="answer-buttons">
                <div className="checkbox-wrapper">
                    {checkbox}
                </div>
                <div className="btn-wrapper">
                    {save_or_next}
                </div>
            </div>
        )
    }
});

module.exports = AnswerButtons;