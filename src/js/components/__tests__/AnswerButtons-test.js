/*global jest, describe, it, expect */
jest.dontMock('../AnswerButtons');
jest.dontMock('../AnswerSaveButton');
jest.dontMock('../AnswerNextButton');
describe('AnswerButtons', function () {
    "use strict";

    var React = require('react/addons'),
        AnswerButtons = require('../AnswerButtons'),
        AnswerSaveButton = require('../AnswerSaveButton'),
        AnswerNextButton = require('../AnswerNextButton'),
        TestUtils = React.addons.TestUtils,
        saveButton,
        nextButton,
        render;

    function scryButtons(component) {
        render = TestUtils.renderIntoDocument(component);
        saveButton = TestUtils.scryRenderedComponentsWithType(
            render,
            AnswerSaveButton
        );
        nextButton = TestUtils.scryRenderedComponentsWithType(
            render,
            AnswerNextButton
        );
    }

    it('shows properly with default values (only save button)', function () {
        scryButtons(<AnswerButtons />);
        expect(saveButton.length).toBe(1);
        expect(nextButton.length).toBe(0);
    });

    it('shows properly for next', function () {
        scryButtons(<AnswerButtons nextEnabled={true} />);
        expect(saveButton.length).toBe(0);
        expect(nextButton.length).toBe(1);
    });

    it('properly disables save button', function () {
        scryButtons(<AnswerButtons saveDisabled={true} />);
        expect(saveButton.length).toBe(1);
        expect(saveButton[0].props.disabled).toBe(true);
        expect(nextButton.length).toBe(0);
    });

});