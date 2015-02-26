"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes,
    QuestionStore = require('../stores/QuestionStore'),
    EventEmmiter = require('events').EventEmitter,
    assign = require('object-assign'),
    AssessmentWebApiUtils = require('../utils/AssessmentWebApiUtils');

var CHANGE_EVENT = 'change';

var _community_answers = {};

function _communityAnswersReceive(question_id, answers) {
    _community_answers[question_id] = answers;
}

var CommunityAnswersStore = assign({}, EventEmmiter.prototype, {

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
        if (!QuestionStore.current().id) {
            return false;
        }

        return this.get(QuestionStore.current().id);
    },

    get: function (question_id) {
        if (_community_answers.hasOwnProperty(question_id)) {
            return _community_answers[question_id];
        }

        AssessmentWebApiUtils.loadCommunityAnswer(question_id);

        return false;
    }
});

CommunityAnswersStore.dispatchToken = AppDispatcher.register(
    function (payload) {
        var action = payload.action,
            emitChanges = true;

        switch (action.type) {
        case ActionTypes.COMMUNITY_ANSWERS_RECEIVE_SUCCESS:
            _communityAnswersReceive(action.question_id, action.answers);
            break;

        default:
            emitChanges = false;
        }

        if (emitChanges) {
            CommunityAnswersStore.emitChange();
        }

        return true;
    }
);

module.exports = CommunityAnswersStore;