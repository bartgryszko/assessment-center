"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes;

module.exports = {
    next: function () {
        AppDispatcher.handleViewAction({
            type: ActionTypes.QUESTION_NEXT
        });
    }
};