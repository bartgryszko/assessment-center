/*global jest, describe, it, expect, beforeEach */
jest.dontMock('../AnswerSection');
jest.dontMock('../AnswerInput');
jest.dontMock('../AnswerButtons');
describe('AnswerSection', function () {
    "use strict";

    var TEST_VALUE = "Test value",
        React = require('react/addons'),
        TestUtils = React.addons.TestUtils,
        AnswerInput = require('../AnswerInput'),
        AnswerSection = require('../AnswerSection'),
        AnswerButtons = require('../AnswerButtons');

    it('renders current answer', function () {
        var render = TestUtils.renderIntoDocument(
                <AnswerSection currentAnswer={TEST_VALUE} />),
            textfield = TestUtils.scryRenderedComponentsWithType(render,
                AnswerInput);

        expect(textfield.length).toBe(1);
    });

    it('pass button props properly', function () {
        var render = TestUtils.renderIntoDocument(
                <AnswerSection nextEnabled={false} saveDisabled={false} />),

            buttons = TestUtils.scryRenderedComponentsWithType(render,
                AnswerButtons);

        expect(buttons.length).toBe(1);

        expect(buttons[0].props.nextEnabled).toBeFalsy();
        expect(buttons[0].props.saveDisabled).toBeFalsy();

        render = TestUtils.renderIntoDocument(
            <AnswerSection nextEnabled={true} saveDisabled={true} />);
        buttons = TestUtils.scryRenderedComponentsWithType(render,
            AnswerButtons);

        expect(buttons[0].props.nextEnabled).toBeTruthy();
        expect(buttons[0].props.saveDisabled).toBeTruthy();
    });
});