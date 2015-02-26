/*global jest, describe, it, expect, beforeEach */
jest.dontMock('../AnswerInput');
describe('AnswerInput', function () {
    "use strict";

    var TEST_VALUE = "Test value",
        TEST_VALUE_2 = "Second test value",
        React = require('react/addons'),
        TestUtils = React.addons.TestUtils,
        AnswerInput = require('../AnswerInput'),
        TextField = require('material-ui').TextField,
        UserAnswerActionCreators = require('../../actions/UserAnswerActionCreators'),
        render;

    function renderNode() {
        render = TestUtils.renderIntoDocument(
            <AnswerInput value={TEST_VALUE} />);
    }

    it('changes value on input', function () {
        renderNode();
        /**
         * Get [1] as TextField material-ui component renders
         * two different textarea components
         */
        var textarea = TestUtils.scryRenderedDOMComponentsWithTag(render,
            'textarea');
        var node = textarea[1].getDOMNode();
        expect(node.textContent).toEqual(TEST_VALUE);
    });

    it('fires change action while typing', function () {
        expect(UserAnswerActionCreators.answerChanged.mock.calls.length)
            .toBe(0);
        renderNode();
        var textarea = TestUtils.scryRenderedDOMComponentsWithTag(render,
            'textarea');
        var node = textarea[1].getDOMNode();

        TestUtils.Simulate.change(node, {target: {value: TEST_VALUE_2}});
        expect(UserAnswerActionCreators.answerChanged.mock.calls.length)
            .toBe(1);
    });
});