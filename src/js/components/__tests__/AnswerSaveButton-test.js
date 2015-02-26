/*global jest, describe, it, expect */
jest.dontMock('../AnswerSaveButton');
describe('AnswerSaveButton', function () {
    "use strict";

    var React = require('react/addons'),
        AnswerSaveButton = require('../AnswerSaveButton'),
        RaisedButton = require('material-ui').RaisedButton,
        EnhancedButton = require('material-ui').EnhancedButton,
        Paper = require('material-ui').Paper,
        TestUtils = React.addons.TestUtils,
        UserAnswerActionCreators = require('../../actions/UserAnswerActionCreators');

    beforeEach(function () {
        render = TestUtils.renderIntoDocument(
            <AnswerSaveButton />
        );
    });

    it('shows properly with default values', function () {
        var button = TestUtils.findRenderedDOMComponentWithClass(
            render,
            'answer-save-button'
        ).getDOMNode();
        expect(button.textContent).toBeDefined();
    });

    it('is enabled by default', function () {
        var button = TestUtils.findRenderedDOMComponentWithClass(
            render,
            'answer-save-button'
        ).getDOMNode();
        expect(button.getAttribute('disabled')).toBeFalsy();
    });

    it('is sends save action after click', function () {
        button = TestUtils.findRenderedComponentWithType(
            render,
            EnhancedButton
        ).refs.touchRipple.getDOMNode();

        expect(UserAnswerActionCreators.saveAnswer.mock.calls.length).toBe(0);
        TestUtils.Simulate.click(button);
        expect(UserAnswerActionCreators.saveAnswer.mock.calls.length).toBe(1);
    });

    render = TestUtils.renderIntoDocument(
        <AnswerSaveButton disabled={true} />
    )
});