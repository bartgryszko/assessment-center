"use strict";

var React = require('react');

var UserAvatar = React.createClass({
    propTypes: {
        user: React.PropTypes.object
    },

    render: function () {
        var src = this.props.user.avatar;

        return (
            <img src={src} alt="" className="user-avatar" />
        );
    }
});

module.exports = UserAvatar;