"use strict";

var React = require('react'),
    RaisedButton = require('material-ui').RaisedButton,
    UserAnswerActionCreators = require('../actions/UserAnswerActionCreators'),
    UserAnswerStore = require('../stores/UserAnswerStore');

var AnswerSaveButton = React.createClass({

    propTypes: {
        disabled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            disabled: false
        };
    },

    render: function () {
        return (
            <RaisedButton
                label="Save"
                primary={true}
                disabled={this.props.disabled}
                onClick={this._onClick}
            />
        );
    },

    _onClick: function (event) {
        UserAnswerActionCreators.saveAnswer(
            UserAnswerStore.current()
        );
    }
});

module.exports = AnswerSaveButton;