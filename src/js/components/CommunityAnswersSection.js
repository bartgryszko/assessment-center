"use strict";

var React = require('react'),
    CommunityAnswer = require('./CommunityAnswer'),
    Paper = require('material-ui').Paper;

var CommunityAnswersSection = React.createClass({

    propTypes: {
        answers: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.array
        ])
    },

    render: function () {
        var answers = "";

        if (!(this.props.answers instanceof Array)){
            answers = <div className="loading">Loading...</div>;
        } else if (this.props.answers.length > 0){
            answers = this.props.answers.map(function (answer) {
                return <CommunityAnswer key={answer.id} answer={answer} />;
            });
        } else {
            answers = (
                <div className="community-answers-zero">
                    There are no community answers yet. Be the first to share your answer!
                </div>
            )
        }

        return (
            <Paper zDepth={1} className="community-answers">
                <h2>Community answers</h2>
                {answers}
            </Paper>
        );
    }
});

module.exports = CommunityAnswersSection;