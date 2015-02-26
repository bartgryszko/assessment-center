"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/Constants').ActionTypes,
    CategoryStore = require('../stores/CategoryStore'),
    EventEmmiter = require('events').EventEmitter,
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _questions = [];
var _currentIndex = 0;

function _questionsReceive(data) {
    _questions = data;

    for (var i = 0, j = _questions.length; i < j; i++) {
        var catid = _questions[i].category;
        _questions[i].category = CategoryStore.get(catid);
    }
}

function _nextQuestion() {
    if (_currentIndex + 1 === _questions.length) {
        _currentIndex = 0;
    } else {
        _currentIndex += 1;
    }
}

function _previousQuestion() {
    if (_currentIndex - 1 < 0) {
        _currentIndex = _questions.length - 1;
    } else {
        _currentIndex -= 1;
    }
}

var QuestionStore = assign({}, EventEmmiter.prototype, {

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
        if (_questions.length > 0) {
            return _questions[_currentIndex];
        }

        return false;
    },

    get: function (id) {
        return _questions[id];
    },

    getAll: function () {
        return _questions;
    }
});

QuestionStore.dispatchToken = AppDispatcher.register(
    function (payload) {
        var action = payload.action;

        switch (action.type) {
        case ActionTypes.QUESTION_NEXT:
            _nextQuestion();
            QuestionStore.emitChange();
            break;

        case ActionTypes.QUESTIONS_RECEIVE_SUCCESS:
            _questionsReceive(action.data);
            QuestionStore.emitChange();
            break;
        }

        return true;
    }
);

module.exports = QuestionStore;