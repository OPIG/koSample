// utilities module
define(["ko", "jquery"], function (ko, $) {
    "use strict";
    var findIndexByField = function (list, field, value) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].hasOwnProperty(field)) {
                if (list[i][field] === value)
                    return i;
            }
        }
        return -1;
    };

    var findItemByField = function (list, field, value) {
        var idx = findIndexByField(list, field, value);
        if (idx === -1) {
            return null;
        }
        return list[idx];
    };

    var isNumber = function (obj) {
        return !isNaN(obj - 0) && obj !== null && obj !== "" && obj !== false;
    }

    var isNormalInteger = function (input, isPositive) {
        var lowerbound = 0;
        if (!!isPositive) {
            lowerbound = 1;
        }
        if (typeof input === "number") {
            return input % 1 === 0 && input >= lowerbound;
        } else {
            var n = ~~Number(input);
            return String(n) === input && n >= lowerbound;
        }
    }

    String.format = function () {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }

        return s;
    }

    function areDifferentArrays(list1, list2) {
        if (list1.length !== list2.length) {
            return true;
        }

        loop1: for (var i = 0; i < list1.length; ++i) {
            for (var j = 0; j < list2.length; ++j) {
                if (list1[i] === list2[j]) {
                    continue loop1;
                }
            }
            return true;
        }
        return false;
    }

    var dateToString = function (inputDateStr) {
        return new Date(inputDateStr).toLocaleString();
    }

    var convertToObservableObject = function (obj) {
        var newObj = {};
        Object.keys(obj).forEach(function (key) {
            newObj[key] = ko.observable(obj[key]);
        });
        return newObj;
    }

    // only convert one level to observable
    var convertToObservableArray = function (list) {
        var newList = [];
        $.each(list, function (i, obj) {
            newList.push(convertToObservableObject(obj));
        });
        return newList;
    }

    return {
        DateToString: dateToString,
        FindItemByField: findItemByField,
        FindIndexByField: findIndexByField,
        IsNumber: isNumber,
        IsInteger: isNormalInteger,
        ConvertToObservableObject: convertToObservableObject,
        ConvertToObservableArray: convertToObservableArray,
        AreDifferentArrays: areDifferentArrays
    }
});
