"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes,
    QuestionStore = require('../stores/QuestionStore'),
    EventEmmiter = require('events').EventEmitter,
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _user_answers = {},
    _current_answer = {
        value: "",
        is_public: true,
        question: false,
        is_saved: false,
        is_being_saved: false
    };

function _setCurrentText(value) {
    if (!_current_answer.is_being_saved) {
        _current_answer.value = value;
        _current_answer.is_saved = false;
    }
}

function _userAnswerIsPublicChange() {
    _current_answer.is_saved = false;
    _current_answer.is_public = !_current_answer.is_public;
}

function _saveAnswer() {
    if (_current_answer.is_being_saved) {
        return false;
    }
    _current_answer.is_being_saved = true;
}

function _answerSavedSuccessfully() {
    _current_answer.is_being_saved = false;
    _current_answer.is_saved = true;

    var currentId = _current_answer.question;
    if (currentId) {
        _user_answers[currentId] = {
            value: _current_answer.value,
            is_public: _current_answer.is_public,
            question: _current_answer.question
        };
    }
}

function _initUserAnswers(data) {
    for (var i = 0; i < data.length; i++) {
        var question_id = data[i].question;
        _user_answers["" + question_id] = data[i];
    }
}

function _initAnswerForQuestion(questionId) {
    if (_user_answers[questionId] !== undefined) {
        _current_answer.value = _user_answers[questionId].value;
        _current_answer.is_public = _user_answers[questionId].is_public;
        _current_answer.question = questionId;
        _current_answer.is_being_saved = false;
        _current_answer.is_saved = true;
    } else {
        _current_answer.value = "";
        _current_answer.is_being_saved = false;
        _current_answer.is_saved = false;
        _current_answer.is_public = true;
        _current_answer.question = questionId;
    }
}

var UserAnswerStore = assign({}, EventEmmiter.prototype, {

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
        return _current_answer;
    },

    isAnswerBeingSaved: function () {
        return _current_answer.is_being_saved;
    },

    isCurrentAlreadyAnswered: function () {
        var questionId = _current_answer.question;

        if (_current_answer.is_saved) {
            return true;
        } else if (questionId && _user_answers.hasOwnProperty(questionId)) {
            return true;
        }

        return false;
    },

    isAnyText: function () {
        return _current_answer.value ? true : false;
    },

    get: function (id) {
        return _user_answers[id];
    },

    getAll: function () {
        return _user_answers;
    }
});

UserAnswerStore.dispatchToken = AppDispatcher.register(
    function (payload) {
        var action = payload.action,
            emitChanges = true;

        switch (action.type) {

        case ActionTypes.USER_ANSWER_CHANGED:
            _setCurrentText(action.value);
            break;

        case ActionTypes.USER_ANSWER_SAVE:
            _saveAnswer(action.value);
            break;

        case ActionTypes.USER_ANSWER_IS_PUBLIC_CHANGED:
            _userAnswerIsPublicChange();
            break;

        case ActionTypes.USER_ANSWER_SAVE_SUCCESS:
            _answerSavedSuccessfully();
            break;

        case ActionTypes.USER_ANSWERS_RECEIVE_SUCCESS:
            _initUserAnswers(action.data);
            break;

        case ActionTypes.QUESTIONS_RECEIVE_SUCCESS:
        case ActionTypes.QUESTION_NEXT:
            AppDispatcher.waitFor([QuestionStore.dispatchToken]);
            _initAnswerForQuestion(QuestionStore.current().id);
            break;

        default:
            emitChanges = false;
        }

        if (emitChanges) {
            UserAnswerStore.emitChange();
        }

        return true;
    }
);

module.exports = UserAnswerStore;