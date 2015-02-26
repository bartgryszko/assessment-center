"use strict";

var React = require('react'),
    UserStore = require('../stores/UserStore'),
    UserLoginDialog = require('./UserLoginDialog');

function getStateFromStores() {
    return {
        user: UserStore.current(),
        is_unauthenticated: UserStore.isUnauthenticated()
    };
}

var UserLoginSection = React.createClass({

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        UserStore.addChangeListener(this._stateChange);
    },

    componentWillUnmount: function () {
        UserStore.removeChangeListener(this._stateChange);
    },

    propTypes: {
        user: React.PropTypes.object
    },

    render: function () {
        // If unauthenticated action sent
        if (this.state.is_unauthenticated) {
            return <UserLoginDialog />
        }

        // If not initialized yet
        if (this.state.user.id === undefined) {
            return (
                <div className="user-login"></div>
            )
        }

        // User logged in successfully
        return (
            <div className="user-login">
                <span className="username">{this.state.user.full_name}</span>
                <img src={this.state.user.avatar} alt="" />
            </div>
        )
    },

    _stateChange: function () {
        this.setState(getStateFromStores());
    }
});

module.exports = UserLoginSection;