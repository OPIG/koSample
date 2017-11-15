/// <reference path="../require.js" />
define(["require", "exports", "ko"], function (require, exports, ko) {
    "use strict";
    var PaneBase = (function () {
        function PaneBase(container, id) {
            this.id = id;
            this.container = container;
            this.paneVisible = ko.observable(false);
            this.firstFieldHasFocus = ko.observable(false);
            this.errorDetailsVisible = ko.observable(false);
            this.formErrors = ko.observable();
            this.title = ko.observable();
            this.formErrorsDetails = ko.observable();
            this.isExecuting = ko.observable(false);
            this.loading = ko.observable(false);
        }

        PaneBase.prototype.cancel = function () {
            this.close();
        };
        PaneBase.prototype.close = function () {
            this.paneVisible(false);
            this.resetData();
        };
        PaneBase.prototype.hideErrorDetails = function () {
            this.errorDetailsVisible(false);
        };
        PaneBase.prototype.open = function () {
            this.loading(false);
            this.paneVisible(true);
            this.firstFieldHasFocus(true);
        };
        PaneBase.prototype.resetData = function () {
            this.firstFieldHasFocus(false);
            this.errorDetailsVisible(false);
            this.formErrors(null);
            this.formErrorsDetails(null);
        };
        PaneBase.prototype.showErrorDetails = function () {
            this.errorDetailsVisible(true);
        };
        PaneBase.prototype.submit = function () {
            this.loading(true);
            var self = this;
            setTimeout(function () {
                self.close();
            }, 600);

        };
        PaneBase.prototype.onCloseKeyPress = function (source, event) {
            if (event.key === " " || event.key === "Enter") {
                this.close();
            }
        };
        PaneBase.prototype.onPaneKeyDown = function (source, event) {
            if (event.key === "Escape") {
                this.close();
                return false;
            }
            return true;
        };
        return PaneBase;
    }());
    exports.PaneBase = PaneBase;
});