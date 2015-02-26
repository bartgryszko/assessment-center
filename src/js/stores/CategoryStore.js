"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    QuestionStore = require('../stores/QuestionStore'),
    ActionTypes = require('../constants/Constants').ActionTypes,
    EventEmmiter = require('events').EventEmitter,
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _categories = {};

function _categoriesReceive(data) {
    for (var i = 0; i < data.length; i++) {
        var cat = data[i];
        _categories["" + cat.id] = cat;
    }
}

var CategoryStore = assign({}, EventEmmiter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function (id) {
        return _categories[id];
    },

    getAll: function () {
        return _categories;
    }
});

CategoryStore.dispatchToken = AppDispatcher.register(
    function (payload) {
        var action = payload.action;

        switch (action.type) {

        case ActionTypes.CATEGORIES_RECEIVE_SUCCESS:
            _categoriesReceive(action.data);
            CategoryStore.emitChange();
            break;
        }

        return true;
    }
);

module.exports = CategoryStore;