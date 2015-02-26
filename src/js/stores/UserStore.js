"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes,
    EventEmmiter = require('events').EventEmitter,
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _current_user = {},
    _user_unauthenticated = false;

function _currentUserReceive(data) {
    _current_user = data;
}

function _userUnauthenticated(status) {
    _user_unauthenticated = status;
}

var UserStore = assign({}, EventEmmiter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    current: function () {
        return _current_user;
    },

    isUnauthenticated: function () {
        return _user_unauthenticated;
    }
});

UserStore.dispatchToken = AppDispatcher.register(
    function (payload) {
        var action = payload.action;

        switch (action.type) {

        case ActionTypes.USER_CURRENT_RECEIVE_SUCCESS:
            _currentUserReceive(action.data);
            UserStore.emitChange();
            break;

        case ActionTypes.USER_UNAUTHENTICATED:
            _userUnauthenticated(true);
            UserStore.emitChange();
            break;

        }

        return true;
    }
);

module.exports = UserStore;