/// <reference path="../require.js" />
define(["require", "exports", "ko"], function (require, exports, ko) {
    "use strict";
    var GridBase = (function () {
        function GridBase(params) {
            var self = this;

            self.gridData = self.gridData || {};
            self.gridData.columns = params.gridData.columns || {};
            self.gridData.data = params.gridData.data;
            self.selectedRowId = params.selectedRowId;
            self.selectedRow = params.selectedRow ? params.selectedRow : ko.observable();
        }

        GridBase.prototype.rowSelected = function (item, event) {
            var self = this;
            if (self.selectedRowId() !== item.Id && self.selectedRow() !== item) {
                self.selectedRowId(item.Id);
                self.selectedRow(item);
            } else {
                self.selectedRow('');
                self.selectedRowId('');
            }
        };
        return GridBase;
    }());
    exports.GridBase = GridBase;
});