"use strict";

var React = require('react'),
    TextField = require('material-ui').TextField,
    UserAnswerStore = require('../stores/UserAnswerStore'),
    UserAnswerActionCreators = require('../actions/UserAnswerActionCreators');

var UserAnswerInput = React.createClass({

    propTypes: {
        value: React.PropTypes.string
    },

    render: function () {
        return (
            <TextField
                hintText="Type your answer here"
                multiLine={true}
                onChange={this._onTyping}
                {...this.props}
            />
        )
    },

    _onTyping: function (event) {
        UserAnswerActionCreators.answerChanged(event.target.value);
    }
});

module.exports = UserAnswerInput;