"use strict";

var Promise = require('es6-promise').Promise;
var AssesmentServerActionCreators = require('../actions/AssessmentServerActionCreators');
var $ = require('jquery');

// jquery cookie plugin
require('jquery.cookie');

// Add CSRF header to ajax queries
var csrftoken = $.cookie('csrftoken');

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

// Keep track of already loaded community answers
var _communityAnswersLoad = {};

var API_SERVER = "http://localhost:8000",

    INITIAL_DATA = [
        {
            url: '/user-answers',
            callback: AssesmentServerActionCreators.receiveUserAnswers
        },
        {
            url: '/categories',
            callback: AssesmentServerActionCreators.receiveCategories
        },
        {
            url: '/questions',
            callback: AssesmentServerActionCreators.receiveQuestions
        }
    ],

    STATUS = {
        HTTP401_UNATHORIZED: 401
    };

module.exports = {
    persistUserAnswer: function (answer) {
        var data = {
            question: answer.question,
            value: answer.value,
            is_public: answer.is_public
        };

        $.ajax({
            url: API_SERVER + '/answers/',
            type: "POST",
            data: data
        }).done(function (data) {
            AssesmentServerActionCreators.receiveUserAnswer(answer);
        }).fail(function (err) {
            console.log('Error while saving', err);
        });
    },


    loadCommunityAnswer: function (question_id) {

        if (!question_id || _communityAnswersLoad.hasOwnProperty(question_id)) {
            return;
        }

        _communityAnswersLoad[question_id] = true;

        this._promiseLoadJSONData("/questions/" + question_id + "/community_answers")
            .then(function (answers) {
                AssesmentServerActionCreators
                    .receiveCommunityAnswers(question_id, answers);
            }, function (error) {
                delete _communityAnswersLoad[question_id];
                console.log("Promise error", error);
            });
    },

    /**
     * First load data about current user. If logged in, load other data
     * from INITIAL_DATA, else send action about user is not authenticated
     */
    loadInitialData: function () {
        var callbacks = INITIAL_DATA.map(function (data) {
                return data.callback;
            }),

            self = this;

        this._promiseLoadJSONData("/users/current")
            .then(
            function (data) {
                // User authorized in Action
                AssesmentServerActionCreators.receiveCurrentUser(data);

                // Load the rest of initial data, all at once
                Promise.all(
                    INITIAL_DATA.map(function (data) {
                        return this._promiseLoadJSONData(data.url);
                    }, self)
                ).then(function (dataArray) {
                        for (var i = 0; i < dataArray.length; i++) {
                            callbacks[i](dataArray[i]);
                        }
                    }, function (error) {
                        console.log("Initial data promise error", error);
                    });
            },

            function (err) {
                // User not logged in
                if (err.status === STATUS.HTTP401_UNATHORIZED) {
                    AssesmentServerActionCreators.unauthenticateUser();
                }
            }
        );
    },


    _promiseLoadJSONData: function (url, api_server) {
        if (api_server === undefined) {
            api_server = API_SERVER;
        }

        return new Promise(function (resolve, reject) {
            $.getJSON(api_server + url, function (data) {
                resolve(data);
            }).fail(function (err) {
                reject(err);
            });
        });
    }
};