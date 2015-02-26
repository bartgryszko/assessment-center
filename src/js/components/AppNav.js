"use strict";

var React = require('react'),
    Router = require('react-router'),
    LeftNav = require('material-ui').LeftNav,

    MENU_ITEMS = [
        { route: 'assessment', text: 'Assesment' }
    ];

var AppNav = React.createClass({

    mixins: [Router.Navigation, Router.State],

    getInitialState: function () {
        return {
            selectedIndex: null
        };
    },

    render: function () {
        var header = (<div className="logo"
            onClick={this._onHeaderClick}>material ui</div>);

        return (
            <LeftNav ref="mainNav"
                docked={false}
                header={header}
                menuItems={MENU_ITEMS}
                selectedIndex={this._getSelectedIndex()}
                onChange={this._onLeftNavChange}/>
        );
    },

    toggle: function() {
        this.refs.mainNav.toggle();
    },

    _getSelectedIndex: function() {
        var currentItem;

        for (var i = MENU_ITEMS.length - 1; i >= 0; i--) {
            currentItem = MENU_ITEMS[i];
            if (currentItem.route && this.isActive(currentItem.route)) return i;
        }
    },

    _onLeftNavChange: function(e, key, payload) {
        this.transitionTo(payload.route);
    },

    _onHeaderClick: function() {
        this.transitionTo('app');
        this.refs.mainNav.close();
    }

});

module.exports = AppNav;