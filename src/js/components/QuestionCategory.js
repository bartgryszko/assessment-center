"use strict";

var React = require('react');

var QuestionCategory = React.createClass({
    propTypes: {
        category: React.PropTypes.object
    },
    render: function () {
        return (
            <div className="question-category">
                {this.props.category.name}
            </div>
        )
    }
});

module.exports = QuestionCategory;