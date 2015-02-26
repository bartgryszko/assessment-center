"use strict";

var React = require('react'),
    Dialog = require('material-ui').Dialog,
    RaisedButton = require('material-ui').RaisedButton,
    config = require('../config');

var UserLoginDialog = React.createClass({

    render: function () {
        var dialogActions = [
            <RaisedButton
                key="signin"
                label="Sign in"
                primary={true}
                onTouchTap={this._onSignInClicked} />
        ];

        return (
            <Dialog ref="dialog" title="Please sign in"
                actions={dialogActions}
                onDismiss={this._onDismiss} openImmediately={true}>
                You nedd to signed in to use application.
            </Dialog>
        )
    },

    _onDismiss: function () {
        this.refs.dialog.show();
    },

    _onSignInClicked: function () {
        window.location = config.LOGIN_PATH;
    }
});

module.exports = UserLoginDialog;