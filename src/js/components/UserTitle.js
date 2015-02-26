"use strict";

var React = require('react');

var UserTitle = React.createClass({

    propTypes: {
        user: React.PropTypes.object
    },

    render: function () {
        var title = this.props.user.title ? ", " + this.props.user.title : "";

        return (
            <div className="user-title">
                <b>{this.props.user.full_name}</b>{title}
            </div>
        )
    }
});

module.exports = UserTitle;