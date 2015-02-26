"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes,
    AssessmentWebApiUtils = require('../utils/AssessmentWebApiUtils');

module.exports = {
    answerChanged: function (value) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.USER_ANSWER_CHANGED,
            value: value
        });
    },

    isAnswerPublicChanged: function () {
        AppDispatcher.handleViewAction({
            type: ActionTypes.USER_ANSWER_IS_PUBLIC_CHANGED
        });
    },

    saveAnswer: function (value) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.USER_ANSWER_SAVE,
            value: value
        });
        AssessmentWebApiUtils.persistUserAnswer(value);
    }
};