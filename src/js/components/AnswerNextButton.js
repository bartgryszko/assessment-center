"use strict";

var React = require('react'),
    RaisedButton = require('material-ui').RaisedButton,
    QuestionActionCreators = require('../actions/QuestionActionCreators'),
    UserAnswerStore = require('../stores/UserAnswerStore');

var AnswerNextButton = React.createClass({
    render: function () {
        return (
            <RaisedButton
                label="Next &raquo;"
                primary={true}
                onClick={this._onClick}
            />
        );
    },

    _onClick: function () {
        QuestionActionCreators.next();
    }
});

module.exports = AnswerNextButton;