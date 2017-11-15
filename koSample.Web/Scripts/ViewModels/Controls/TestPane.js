var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

define(["require", "exports", "ko", "ViewModels/Controls/PaneBase", "Common/Api"], function (require, exports, ko, PaneBase_1, Api) {
    "use strict";
    var TestPane = (function (_super) {
        __extends(TestPane, _super);
        function TestPane(options) {
            var _this = _super.call(this, options.container, options.id) || this;
            var self = this;
            this.__Title = ko.observable();
            this.IsSaveClicked = ko.observable(false);
            this.onSaveCallBack = options.onSaveCallBack;
            this.onCancelCallBack = options.onCancelCallBack;

            this.Id = ko.observable();
            this.Title = ko.observable();
            this.Content = ko.observable();

            self.TitleError = ko.computed(function () {
                return (self.Title() && (self.Title().length === 0 || self.Title().length > 50));
            }, self);

        }
        TestPane.prototype.init = function (params) {
            params = params || {};
            var data = params.data || {};
            this.__Title(params.title || '');
            this.Id(data.Id || '');
            this.Title(data.Title || '');
            this.Content(data.Content || '');
        };
        TestPane.prototype.submit = function () {
            var self = this;
            self.IsSaveClicked(true);
            if (!self.validate())
                return;
            self.IsSaveClicked(false);

            self.onSaveCallBack({
                Id: self.Id(),
                Title: self.Title(),
                Content: self.Content()
            });
        };
        TestPane.prototype.validate = function () {
            var self = this;
            var hasError = true;
            hasError = self.TitleError();
            return !hasError;
        };

        return TestPane;
    }(PaneBase_1.PaneBase));
    exports.TestPane = TestPane;
});