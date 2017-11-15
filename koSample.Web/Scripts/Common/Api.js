define(["jquery"], function ($) {
    "use strict";

    var global = window;
    var ajaxCall = function (options) {
        return $.ajax({
            url: options.url,
            type: options.type,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: options.data
        });
    };
    var testApiUrl = apiUrl + "api/Tests/";
    var testApi = (function () {
        var getTests = function () {
            return $.getJSON(testApiUrl);
        };

        var getTest = function (id) {
            return $.getJSON(testApiUrl + id);
        };

        var addTest = function (model) {
            return ajaxCall({
                url: testApiUrl,
                type: 'POST',
                data: JSON.stringify(model)
            });
        };

        var updateTest = function (id, model) {
            return ajaxCall({
                url: testApiUrl + id,
                type: 'PUT',
                data: JSON.stringify(model)
            });
        };

        var deleteTest = function (id) {
            return ajaxCall({
                url: testApiUrl + id,
                type: 'DELETE'
            });
        };

        return {
            GetTests: getTests,
            GetTest: getTest,
            AddTest: addTest,
            UpdateTest: updateTest,
            DeleteTest: deleteTest
        }
    })();

    return {
        TestApi: testApi
    }
});
