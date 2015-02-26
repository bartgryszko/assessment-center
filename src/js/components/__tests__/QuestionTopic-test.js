/*global jest, describe, it, expect */
jest.dontMock('../QuestionTopic');
describe('QuestionTopic', function () {
    "use strict";
    it('changes it\'s name', function () {
        var React = require('react/addons'),
            QuestionTopic = require('../QuestionTopic'),
            TestUtils = React.addons.TestUtils,
            header = TestUtils.renderIntoDocument(
                <QuestionTopic value="Test question" />
            ),
            headerText = TestUtils.findRenderedDOMComponentWithTag(
                header,
                'h1'
            ).getDOMNode().textContent;

        expect(headerText).toEqual('Test question');
    });
});