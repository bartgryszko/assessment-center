"use strict";

var DEFAULT_ACTION_HANDLER_NAME = "handleViewAction";

module.exports = {
    defaultActionHandler: null,
    appDispatcher: null,
    action: null,

    /**
     * Method iterates through Actions and creates ActionCreators from them,
     * action parameter named 'options' is used for callback function and
     * custom handler options
     */
    create: function (AppDispatcher, Actions) {
        this.appDispatcher = AppDispatcher;
        this.defaultActionHandler = AppDispatcher[DEFAULT_ACTION_HANDLER_NAME];
        this.action = Actions;

        var key, ActionCreators = {};
        for (key in Actions) {
            if (Actions.hasOwnProperty(key) && key !== "options") {
                ActionCreators[key] = this._makeActionHandler(key);
            }
        }

        return ActionCreators;
    },

    _makeActionHandler: function (key) {
        return function (text) {
            var action = this.action[key](text),
                actionHandler = this.defaultActionHandler;

            if (typeof action.options[key].actionHandler === "function") {
                actionHandler = action.actionHandler;
            }

            actionHandler(action);

            if (typeof action.options[key].callback === "function") {
                action.options[key].callback();
            }
        }.bind(this);
    }
};