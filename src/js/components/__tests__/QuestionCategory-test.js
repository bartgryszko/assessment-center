/*global jest, describe, it, expect */
jest.dontMock('../QuestionCategory');
describe('QuestionCategory', function () {
    "use strict";

    it('changes category name', function () {
        var React = require('react/addons'),
            QuestionCategory = require('../QuestionCategory'),
            TestUtils = React.addons.TestUtils,
            category = {
                id: 1,
                name: "Java",
                slug: "java"
            },
            render = TestUtils.renderIntoDocument(
                <QuestionCategory category={category} />
            ),
            renderText = TestUtils.findRenderedDOMComponentWithClass(
                render,
                'question-category'
            ).getDOMNode().textContent;

        expect(renderText).toEqual('Java');
    });
});