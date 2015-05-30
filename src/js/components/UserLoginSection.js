"use strict";

var React = require('react'),
    UserStore = require('../stores/UserStore'),
    UserLoginDialog = require('./UserLoginDialog'),
    Menu = require('material-ui').Menu,
    MenuItem = require('material-ui').MenuItem,
    Classable = require('material-ui').Mixins.Classable,
    ClickAwayable = require('material-ui').Mixins.ClickAwayable,
    UserActionCreators = require('../actions/UserActionCreators'),
    config = require('../config');

function getStateFromStores() {
    return {
        user: UserStore.current(),
        is_unauthenticated: UserStore.isUnauthenticated(),
        is_menu_open: UserStore.isLoginMenuVisibile()
    };
}

var UserLoginSection = React.createClass({

    mixins: [Classable, ClickAwayable],

    propTypes: {
        user: React.PropTypes.object
    },

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        UserStore.addChangeListener(this._stateChange);
    },

    componentWillUnmount: function () {
        UserStore.removeChangeListener(this._stateChange);
    },

    componentClickAway: function () {
        UserActionCreators.loginMenuVisibility(false);
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

        var classes = this.getClasses('mui-drop-down-icon', {
                    'user-login': true,
                    'mui-open': this.state.is_menu_open }
            ),

            menuHeader = (
                <div className="menu-header">
                    <img src={this.state.user.avatar} alt="" />
                    <div className="username">
                        {this.state.user.full_name}
                    </div>
                    <div className="email hint">
                        {this.state.user.email}
                    </div>
                    <div className="clearfix" />
                </div>
            ),

            menuItems = [
                { text: menuHeader, type: MenuItem.Types.SUBHEADER },
                { payload: config.LOGOUT_PATH, text: 'Logout', type: MenuItem.Types.LINK }
            ];

        // User logged in successfully
        return (
            <div className={classes}>
                <div className="mui-menu-control" onClick={this._onLoginMenuClick}>
                    <img className="avatar" src={this.state.user.avatar} alt="" />
                </div>
                <Menu ref="menuItems" menuItems={menuItems} hideable={true}
                    visible={this.state.is_menu_open} autoWidth={false}
                    onItemClick={this._onMenuItemClick}/>
            </div>
        )
    },

    _onLoginMenuClick: function (e) {
        UserActionCreators.loginMenuVisibility(!this.state.is_menu_open);
    },

    _stateChange: function () {
        this.setState(getStateFromStores());
    },

    _onMenuItemClick: function(e, key, payload) {
        console.log(key, payload);
        UserActionCreators.loginMenuVisibility(false);
    }
});

module.exports = UserLoginSection;