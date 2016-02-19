/// <reference path='./DlhSoft.Data.DatePicker.HTML.Controls.ts'/>
import Calendar = DlhSoft.Controls.Calendar;
import DatePicker = DlhSoft.Controls.DatePicker;

window.onload = () => {
    // Initialize the components.
    var calendarSelectedDate = new Date(2014, 2 - 1, 19);
    var calendarSettings = <Calendar.Settings>{
        // Optionally, initialize a specific theme (supported values: Modern, Standard).
        // theme: "Standard",
        // Optionally, display multiple months.
        monthRows: 2, monthColumns: 2,
        // Optionally, set allowMultipleSelection or allowRangeSelection to true to enable multiple date or range selection behaviors.
        // allowMultipleSelection: true, // allowRangeSelection: true, 
        // Optionally, specify highlighting styles for calendar days based on date values.
        highlightingStyleSelector: (date: Date, isSelected: boolean): string => { return (date.getDate() > 15 && date.getDate() <= 20 ? "font-weight: bold; " : "") + (date.getDay() == 2 ? "background-color: Yellow; " + (isSelected ? "color: Red; " : "") : ""); },
        // Optionally, disable specific calendar days based on date values.
        disabledDateSelector: (date: Date): boolean => { return date.getDay() == 6; },
        // Optionally, handle selected date changes.
        // selectedDateChangeHandler: function (date: Date) { alert("Selected date changed to " + date.toDateString() + "."); }
    };
    var calendar = Calendar.initialize(<HTMLElement>document.querySelector("#calendar"), calendarSelectedDate, calendarSettings);
    // Optionally, further initialize selected dates.
    // calendar.setValueRanges([{ start: new Date(2014, 2 - 1, 19), finish: new Date(2014, 2 - 1, 22) }, { start: new Date(2014, 2 - 1, 25), finish: new Date(2014, 2 - 1, 26) }]);

    var datePickerValue = new Date(2014, 2 - 1, 19);
    var datePickerSettings = <DatePicker.Settings>{
        // Optionally, initialize a specific theme (supported values: Modern, Standard).
        // theme: "Standard",
        isDropDownButtonVisible: true,
        // Optionally, display multiple months.
        // monthRows: 2, monthColumns: 2,
        // Optionally, specify highlighting styles for calendar days based on date values.
        highlightingStyleSelector: (date: Date, isSelected: boolean): string => { return (date.getDate() > 15 && date.getDate() <= 20 ? "font-weight: bold; " : "") + (date.getDay() == 2 ? "background-color: Yellow; " + (isSelected ? "color: Red; " : "") : ""); },
        // Optionally, disable specific calendar days based on date values.
        disabledDateSelector: (date: Date): boolean => { return date.getDay() == 6; }
    };
    var datePicker = DatePicker.initialize(<HTMLInputElement>document.querySelector("#datePicker"), datePickerValue, datePickerSettings);
};
