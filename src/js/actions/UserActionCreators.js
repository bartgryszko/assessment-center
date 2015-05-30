"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes;

module.exports = {
    loginMenuVisibility: function (is_visible) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.USER_LOGIN_MENU_VISIBILITY_CHANGED,
            is_visible: is_visible
        });
    }
};