"use strict";

var Constants = require('../constants/Constants'),
    Dispatcher = require('flux').Dispatcher,
    assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {
    handleViewAction: function (action) {
        var payload = Constants.viewPayload(action);
        this.dispatch(payload);
    },

    handleServerAction: function (action) {
        var payload = Constants.serverPayload(action);
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;