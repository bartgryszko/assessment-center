"use strict";

var React = require('react'),
    Menu = require('material-ui').Menu,
    MenuItem = require('material-ui').MenuItem,
    Classable = require('material-ui').Mixins.Classable,
    ClickAwayable = require('material-ui').Mixins.ClickAwayable;


var UserLoginMenu = React.createClass({

    mixins: [Classable, ClickAwayable],

    getInitialState: function () {
        return {
            is_open: false
        };
    },

    propTypes: {
        user: React.PropTypes.object,
        menuItems: React.PropTypes.array
    },

    render: function () {
        return (
            <div className="user-login mui-open mui-drop-down-icon">
                <Menu ref="menuItems" menuItems={menuItems}
                    hideable={true} visible={true} />
            </div>
        )
    },

    _onControlClick: function(e) {
        this.setState({ is_open: !this.state.is_open });
    }
});

module.exports = UserLoginMenu;