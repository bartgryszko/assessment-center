"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes;

module.exports = {
    receiveUserAnswer: function (data) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.USER_ANSWER_SAVE_SUCCESS,
            data: data
        });
    },

    receiveQuestions: function (data) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.QUESTIONS_RECEIVE_SUCCESS,
            data: data
        });
    },

    receiveCategories: function (data) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.CATEGORIES_RECEIVE_SUCCESS,
            data: data
        });
    },

    receiveCurrentUser: function (data) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.USER_CURRENT_RECEIVE_SUCCESS,
            data: data
        });
    },

    unauthenticateUser: function (data) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.USER_UNAUTHENTICATED,
            data: data
        });
    },

    receiveUserAnswers: function (data) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.USER_ANSWERS_RECEIVE_SUCCESS,
            data: data
        });
    },

    receiveCommunityAnswers: function (question_id, answers) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.COMMUNITY_ANSWERS_RECEIVE_SUCCESS,
            question_id: question_id,
            answers: answers
        });
    }
};