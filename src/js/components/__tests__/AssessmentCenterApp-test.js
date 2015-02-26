/*global jest, describe, it, expect, beforeEach */
jest.dontMock('../AssessmentCenterApp');
jest.dontMock('../QuestionSection');
jest.dontMock('../AnswerSection');
describe('AssessmentCenterApp', function () {
    "use strict";

    var React = require('react/addons'),
        TestUtils = React.addons.TestUtils,
        QuestionSection = require('../QuestionSection'),
        AnswerSection = require('../AnswerSection'),
        AssessmentCenterApp = require('../AssessmentCenterApp'),
        render = TestUtils.renderIntoDocument(<AssessmentCenterApp />);

    it('renders question section', function () {
        var section = TestUtils.scryRenderedComponentsWithType(render,
                QuestionSection);
        expect(section.length).toBe(1);
    });

    it('renders answer section', function () {
        var section = TestUtils.scryRenderedComponentsWithType(render,
            AnswerSection);
        expect(section.length).toBe(1);
    });
});