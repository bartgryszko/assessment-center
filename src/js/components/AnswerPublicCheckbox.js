"use strict";

var React = require('react'),
    Checkbox = require('material-ui').Checkbox,
    UserAnswerActionCreators = require('../actions/UserAnswerActionCreators'),
    UserAnswerStore = require('../stores/UserAnswerStore');

var AnswerPublicCheckbox = React.createClass({

    propTypes: {
        disabled: React.PropTypes.bool,
        checked: React.PropTypes.bool
    },

    render: function () {
        var label = [
            "Share this answer with others",
            <span className="hint">Your second name won’t be visible to anyone</span>
        ];

        return (
            <Checkbox
                name="AnswerPublicCheckbox"
                label={label}
                checked={this.props.checked}
                disabled={this.props.disabled}
                onCheck={this._onChange}
            />
        );
    },

    _onChange: function (event) {
        UserAnswerActionCreators.isAnswerPublicChanged();
    }
});

module.exports = AnswerPublicCheckbox;