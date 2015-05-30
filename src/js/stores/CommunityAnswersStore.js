"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes,
    QuestionStore = require('../stores/QuestionStore'),
    UserAnswerStore = require('../stores/UserAnswerStore'),
    UserStore = require('../stores/UserStore'),
    EventEmmiter = require('events').EventEmitter,
    assign = require('object-assign'),
    AssessmentWebApiUtils = require('../utils/AssessmentWebApiUtils');

var CHANGE_EVENT = 'change';

var _community_answers = {};

function _communityAnswersReceive(question_id, answers) {
    _community_answers[question_id] = answers;
}

function _addUserAnswer(answer) {
    var i, canswers = _community_answers[answer.question];

    // Merge with current user to fit the API
    answer.user = UserStore.current();

    // Add if answer is public
    if (answer.is_public) {
        for (i = 0; i < canswers.length; i += 1) {
            if (canswers[i].id === answer.id) {
                canswers[i] = answer;
                return;
            }
        }

        // If didn't find push to the beginning of answers array
        canswers.unshift(answer);
    } else {
        // Remove if was public and now isn't
        for (i = 0; i < canswers.length; i += 1) {
            if (canswers[i].id === answer.id) {
                canswers.splice(i, 1);
                return;
            }
        }
    }
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

        case ActionTypes.USER_ANSWER_SAVE_SUCCESS:
            AppDispatcher.waitFor([UserAnswerStore.dispatchToken]);
            _addUserAnswer(action.data);
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