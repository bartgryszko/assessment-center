/*global jest, describe, it, expect */
jest.dontMock('../AnswerNextButton');
describe('AnswerNextButton', function () {
    "use strict";

    var React = require('react/addons'),
        AnswerNextButton = require('../AnswerNextButton'),
        TestUtils = React.addons.TestUtils,

        render = TestUtils.renderIntoDocument(
            <AnswerNextButton />
        ),

        button = TestUtils.findRenderedDOMComponentWithClass(
            render,
            'answer-next-button'
        ).getDOMNode();

    it('shows properly with default values', function () {
        expect(button.textContent).toBeDefined();
    });
});