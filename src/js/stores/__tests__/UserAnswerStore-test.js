/*global jest, describe, it, expect, beforeEach, waitsFor, runs */
jest.dontMock('../UserAnswerStore');
jest.dontMock('../../actions/UserAnswerActionCreators');
jest.dontMock('../../actions/AssessmentServerActionCreators');
jest.dontMock('../../constants/Constants');
jest.dontMock('object-assign');
jest.dontMock('../../utils/AssessmentWebApiUtils');

describe('UserAnswerStore', function () {
    "use strict";

    var AppDispatcher,
        UserAnswerStore,
        callback,
        Constants = require('../../constants/Constants'),
        UserAnswerActionCreators;

    beforeEach(function () {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        UserAnswerActionCreators = require('../../actions/UserAnswerActionCreators');
        UserAnswerStore = require('../UserAnswerStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    function performViewAction(method, text) {
        UserAnswerActionCreators[method](text);
        /* Return value from handleView action */
        var lastCall = AppDispatcher.handleViewAction.mock.calls.length - 1,
            action = AppDispatcher.handleViewAction.mock.calls[lastCall][0],
            payload = Constants.viewPayload(action);
        callback(payload);
    }

    function performServerAction(index) {
        jest.runAllTimers();
        var action = AppDispatcher.handleServerAction.mock.calls[index][0],
            payload = Constants.serverPayload(action);
        callback(payload);
    }

    it('registers callback with the dispatcher', function () {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('initialize store with empty answer', function () {
        expect(UserAnswerStore.getCurrentText()).toBe("");
    });

    it('responds to answer change action', function () {
        performViewAction("answerChanged", "test");
        expect(UserAnswerStore.getCurrentText()).toBe("test");
    });

    it('saves answer to server and clears it', function () {
        expect(UserAnswerStore.isAnswerBeingSaved()).toBeFalsy();
        performViewAction("answerChanged", "test");
        performViewAction("saveAnswer", "test");
        expect(UserAnswerStore.getCurrentText()).toBe("test");
        expect(UserAnswerStore.isAnswerBeingSaved()).toBeTruthy();
        performServerAction(0);
        expect(UserAnswerStore.isAnswerBeingSaved()).toBeFalsy();
        expect(UserAnswerStore.getCurrentText()).toBe("");
    });

    it('saves one answer a time', function () {
        expect(UserAnswerStore.isAnswerBeingSaved()).toBeFalsy();
        performViewAction("answerChanged", "test");
        performViewAction("saveAnswer", "test");
        expect(UserAnswerStore.getCurrentText()).toBe("test");
        expect(UserAnswerStore.isAnswerBeingSaved()).toBeTruthy();
        performServerAction(0);

        performViewAction("answerChanged", "test2");
        performViewAction("saveAnswer", "test2");
        expect(UserAnswerStore.getCurrentText()).toBe("test2");
        expect(UserAnswerStore.isAnswerBeingSaved()).toBeTruthy();
        performServerAction(1);

        var saved_answers = UserAnswerStore.getAll();
        expect(saved_answers[0].value).toBe("test");
        expect(saved_answers[1].value).toBe("test2");
    });
});