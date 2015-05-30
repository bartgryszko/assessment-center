"use strict";

module.exports = {
    ActionTypes: {
        CATEGORIES_RECEIVE_SUCCESS : "CATEGORIES_RECEIVE_SUCCESS",

        QUESTION_NEXT: "QUESTION_NEXT",
        QUESTIONS_RECEIVE_SUCCESS: "QUESTIONS_RECEIVE_SUCCESS",

        USER_ANSWER_CHANGED: "USER_ANSWER_CHANGED",
        USER_ANSWER_IS_PUBLIC_CHANGED: "USER_ANSWER_IS_PUBLIC_CHANGED",
        USER_ANSWER_SAVE: "USER_ANSWER_SAVE",
        USER_ANSWER_SAVE_SUCCESS: "USER_ANSWER_SAVE_SUCCESS",
        USER_ANSWERS_RECEIVE_SUCCESS: "USER_ANSWERS_RECEIVE_SUCCESS",

        USER_CURRENT_RECEIVE_SUCCESS: "USER_CURRENT_RECEIVE_SUCCESS",
        USER_UNAUTHENTICATED: "USER_UNAUTHENTICATED",

        USER_LOGIN_MENU_VISIBILITY_CHANGED: "USER_LOGIN_MENU_CLICK_AWAY",

        COMMUNITY_ANSWERS_RECEIVE_SUCCESS: "COMMUNITY_ANSWERS_RECEIVE_SUCCESS"
    },

    PayloadSources: {
        SERVER_ACTION: "SERVER_ACTION",
        VIEW_ACTION: "VIEW_ACTION"
    },

    viewPayload: function (action) {
        var self = this;

        return {
            source: self.PayloadSources.VIEW_ACTION,
            action: action
        };
    },

    serverPayload: function (action) {
        var self = this;

        return {
            source: self.PayloadSources.SERVER_ACTION,
            action: action
        };
    }
};