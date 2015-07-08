/// <reference path='./DlhSoft.Data.DatePicker.HTML.Controls.ts'/>
var Calendar = DlhSoft.Controls.Calendar;
var DatePicker = DlhSoft.Controls.DatePicker;

angular.module("Sample", ["DlhSoft.Data.Directives"]).controller("MainController", [
    "$scope", function ($scope) {
        // Initialize the components.
        var calendarSelectedDate = new Date(2014, 2 - 1, 19);
        $scope.calendarSelectedDate = calendarSelectedDate;
        var calendarSettings = {
            // Optionally, initialize a specific theme (supported values: Modern, Standard).
            // theme: "Standard",
            // Optionally, display multiple months.
            monthRows: 2, monthColumns: 2,
            // Optionally, set allowMultipleSelection or allowRangeSelection to true to enable multiple date or range selection behaviors.
            // allowMultipleSelection: true, // allowRangeSelection: true,
            // Optionally, specify highlighting styles for calendar days based on date values.
            highlightingStyleSelector: function (date, isSelected) {
                return (date.getDate() > 15 && date.getDate() <= 20 ? "font-weight: bold; " : "") + (date.getDay() == 2 ? "background-color: Yellow; " + (isSelected ? "color: Red; " : "") : "");
            },
            // Optionally, disable specific calendar days based on date values.
            disabledDateSelector: function (date) {
                return date.getDay() == 6;
            }
        };
        $scope.calendarSettings = calendarSettings;

        var datePickerValue = new Date(2014, 2 - 1, 19);
        $scope.datePickerValue = datePickerValue;
        var datePickerSettings = {
            // Optionally, initialize a specific theme (supported values: Modern, Standard).
            // theme: "Standard",
            isDropDownButtonVisible: true,
            // Optionally, display multiple months.
            // monthRows: 2, monthColumns: 2,
            // Optionally, specify highlighting styles for calendar days based on date values.
            highlightingStyleSelector: function (date, isSelected) {
                return (date.getDate() > 15 && date.getDate() <= 20 ? "font-weight: bold; " : "") + (date.getDay() == 2 ? "background-color: Yellow; " + (isSelected ? "color: Red; " : "") : "");
            },
            // Optionally, disable specific calendar days based on date values.
            disabledDateSelector: function (date) {
                return date.getDay() == 6;
            }
        };
        $scope.datePickerSettings = datePickerSettings;
        $scope.datePickerChangeHandler = function (value) {
            console.log("DatePicker date changed to: " + value);
        };
    }]);
