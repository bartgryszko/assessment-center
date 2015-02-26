"use strict";

var React = require('react'),
    UserAvatar = require('./UserAvatar'),
    UserTitle = require('./UserTitle');

var CommunityAnswer = React.createClass({

    propTypes: {
        answer: React.PropTypes.object
    },

    render: function () {
        return (
            <div className="community-answer">
                <div className="actions">
                    <UserAvatar user={this.props.answer.user} />
                </div>
                <div className="content">
                    <UserTitle user={this.props.answer.user} />
                    <div className="text">
                    {this.props.answer.value}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CommunityAnswer;