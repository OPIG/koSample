/// <reference path="../require.js" />
define(["require", "exports", "jquery", "ko", "ViewModels/Controls/TestPane", 'Common/Api', 'Common/Utilities'], function (require, exports, $, ko, TestPane, Api, Utilities) {
    "use strict";
    var HomeIndex = (function () {
        function HomeIndex() {
            var self = this;
            self.selectedRow = ko.observable();
            self.selectedRowId = ko.observable('');
            self.gridData = {
                columns: ko.observableArray([
                    { isCommand: false, visible: true, headerText: "Id", name: "Id" },
                    { isCommand: false, visible: true, headerText: "Title", name: "Title" },
                    { isCommand: false, visible: false, headerText: "Content", name: "Content" },
                    { isCommand: false, visible: true, headerText: "Update Time", name: "UpdateTime" },
                    {
                        visible: true,
                        headerText: "",
                        isCommand: true,
                        commands: ko.observableArray([
                            { text: "Edit", click: function (item) { self.Edit(item); } },
                            { text: "Delete", click: function (item) { self.ShowDelete(item); } }
                        ])
                    }
                ]),
                data: ko.observableArray([]),
                selectRow: ko.observable(),
                isSelected: function (item) {
                    return (item && self.gridData.selectRow() && item.Id == self.gridData.selectRow().Id);
                },
                select: function (item) {
                    self.gridData.selectRow(item);
                }
            };



            self.Save = function (item) {
                self.testAddEditPane.loading(true);
                if (!self.currentItem) {
                    Api.TestApi.AddTest(item).done(function (data) {

                        setTimeout(function () {
                            self.testAddEditPane.loading(false);
                            self.testAddEditPane.close();
                            self.gridData.data.push(self.translate(data));
                        }, 500);

                    });
                } else {
                    Api.TestApi.UpdateTest(item.Id, item).done(function (data) {
                        var entityIdx = Utilities.FindIndexByField(self.gridData.data(), 'Id', data.Id);

                        setTimeout(function () {
                            self.testAddEditPane.loading(false);
                            self.testAddEditPane.close();
                            self.gridData.data.replace(self.gridData.data()[entityIdx], self.translate(data));
                        }, 500);
                    });
                }
            };

            self.selectedRow.subscribe(function (item) {
                _this.testAddEditPane.open();
                item.isEdit = true;
                _this.testAddEditPane.init(item);
            });

            self.Add = function () {
                self.currentItem = null;
                self.testAddEditPane.open();
                self.testAddEditPane.init({ title: 'Add Test' });
            };

            self.Edit = function (item) {
                self.currentItem = item;
                self.testAddEditPane.open();
                self.testAddEditPane.init({ title: 'Edit Test', data: item });
            };
            self.ShowDelete = function (item) {
                self.testDeletePane.open();
                self.testDeletePane.init({ title: 'Delete Test', data: item });
            };
            self.Delete = function (item) {
                self.testDeletePane.loading(true);
                Api.TestApi.DeleteTest(item.Id).done(function () {
                    var entityIdx = Utilities.FindIndexByField(self.gridData.data(), 'Id', item.Id);

                    setTimeout(function () {
                        self.testDeletePane.loading(false);
                        self.testDeletePane.close();
                        self.gridData.data.splice(entityIdx, 1);
                    }, 500);
                });
            };

            self.Init = function () {
                self.loadTests();
            };

            self.loadTests = function () {
                self.gridData.data([]);
                Api.TestApi.GetTests().done(function (tests) {
                    self.gridData.data($.map(tests, function (test) {
                        return self.translate(test);
                    }));
                });
            };

            self.Cancel = function () {
                this.currentItem = null;
            };

            self.translate = function (test) {
                if (test.UpdateTime) {
                    test.UpdateTime = new Date(test.UpdateTime).toLocaleString();
                }
                return test;
            };

            self.testAddEditPane = new TestPane.TestPane({
                container: self,
                id: "testAddEditPane",
                onSaveCallBack: self.Save,
                onCancelCallBack: self.Cancel
            });

            self.testDeletePane = new TestPane.TestPane({
                container: self,
                id: "testDeletePane",
                onSaveCallBack: self.Delete,
                onCancelCallBack: self.Cancel
            });
        }

        return HomeIndex;
    }());
    var homeIndex = new HomeIndex();
    ko.applyBindings(homeIndex);
    homeIndex.Init();
});