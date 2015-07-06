/* Assembly: DlhSoft.ProjectData.DatePicker.HTML.Controls,
Company: DlhSoft,
Product: Hyper DatePicker,
Version: 5.0.0.0,
Copyright: Copyright © 2015 DlhSoft,
Title: Data DatePicker HTML Controls,
Description: Date picker and related HTML client components */
var DlhSoft;
(function (DlhSoft) {
    (function (Controls) {
        (function (CalendarSelector) {
            function initialize(element, selectedTime, settings) {
                return new Element(element, selectedTime, settings);
            }
            CalendarSelector.initialize = initialize;
            function get(element) {
                return element["component"];
            }
            CalendarSelector.get = get;

            var Element = (function () {
                function Element(host, selectedTime, settings) {
                    this.host = host;
                    this.selectedTime = selectedTime;
                    this.settings = settings;
                    this.isInitialized = false;
                    this.host["component"] = this;

                    if (typeof settings === "undefined")
                        settings = {};
                    this.settings = settings;

                    Element.initializeSettings(this.settings);

                    if (typeof selectedTime === "undefined")
                        selectedTime = settings.minValue;
                    if (selectedTime < settings.minValue)
                        selectedTime = settings.minValue;
                    this.selectedTime = selectedTime;

                    if (this.settings.displayedTime == null) {
                        var pageSize = this.settings.rows * this.settings.columns;
                        this.settings.displayedTime = Math.floor(this.selectedTime / pageSize) * pageSize;
                    }
                    if (this.settings.displayedTime < settings.minValue)
                        this.settings.displayedTime = settings.minValue;

                    this.refresh();

                    this.isInitialized = true;
                }
                Element.initializeSettings = function (settings) {
                    if (typeof settings.theme === "undefined")
                        settings.theme = "Modern";

                    if (typeof settings.rows === "undefined")
                        settings.rows = 4;
                    else if (settings.rows <= 0)
                        settings.rows = 1;
                    if (typeof settings.columns === "undefined")
                        settings.columns = 3;
                    else if (settings.columns <= 0)
                        settings.columns = 1;

                    if (typeof settings.headerProvider === "undefined")
                        settings.headerProvider = function (document, value) {
                            return document.createTextNode(value != null ? value.toString() + " - " + (value + settings.rows * settings.columns - 1).toString() : "?");
                        };

                    if (typeof settings.headerStyle === "undefined")
                        settings.headerStyle = "color: " + (settings.theme == "Modern" ? "#505050" : "Black") + "; background-color: #f0f0f0; padding: 8px; font-size: " + (settings.theme == "Modern" ? "12px" : "small") + "; text-align: center; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: default";
                    if (typeof settings.timeStyle === "undefined")
                        settings.timeStyle = "color: " + (settings.theme == "Modern" ? "#505050" : "Black") + "; min-width: " + Math.max(128 / settings.columns, 64) + "px; height: " + Math.max(80 / settings.rows, 20) + "px; padding: 2px; text-align: center; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: default; font-size: " + (settings.theme == "Modern" ? "12px" : "small");
                    if (typeof settings.selectedTimeStyle === "undefined")
                        settings.selectedTimeStyle = "background-color: #3399ff; color: White; padding: 2px";

                    if (typeof settings.timeFormatter === "undefined")
                        settings.timeFormatter = function (value) {
                            return value.toString();
                        };

                    if (typeof settings.invertMatrix === "undefined")
                        settings.invertMatrix = false;
                    if (typeof settings.minValue === "undefined")
                        settings.minValue = 0;

                    if (typeof settings.scrollingHeight === "undefined")
                        settings.scrollingHeight = "auto";
                };

                Element.prototype.refresh = function () {
                    var _this = this;
                    var document = this.host.ownerDocument;

                    for (var n = this.host.childNodes.length; n-- > 0;)
                        this.host.removeChild(this.host.childNodes[n]);

                    var container = document.createElement("table"), w, d;
                    container.cellSpacing = "0";
                    container.cellPadding = "0";
                    container.setAttribute("style", this.settings.containerStyle);
                    if (this.settings.containerClass)
                        container.setAttribute("class", this.settings.containerClass);

                    var displayedTime = this.settings.displayedTime != null ? this.settings.displayedTime : 0;

                    var headerContainer = document.createElement("tr");
                    headerContainer.setAttribute("style", this.settings.headerStyle);
                    headerContainer.setAttribute("class", this.settings.headerClass);
                    var previousButton = document.createElement("td");
                    previousButton.setAttribute("style", "text-align: left; padding-left: 4px");
                    var previousButtonLink = document.createElement("a");
                    previousButtonLink.setAttribute("href", "javascript://");
                    previousButtonLink.setAttribute("style", "text-decoration: none; color: Gray; font-size: " + (this.settings.theme == "Modern" ? "10px" : "x-small") + "; cursor: pointer");
                    previousButtonLink.appendChild(document.createTextNode("◄"));
                    previousButtonLink.onclick = function (e) {
                        _this.setDisplayedValue(displayedTime - (_this.settings.rows * _this.settings.columns));
                        e.stopPropagation();
                    };
                    previousButton.appendChild(previousButtonLink);
                    headerContainer.appendChild(previousButton);
                    var header = document.createElement("td");
                    header.setAttribute("style", this.settings.headerStyle);
                    header.setAttribute("class", this.settings.headerClass);
                    var headerButton = document.createElement("span");
                    headerButton.appendChild(this.settings.headerProvider(document, this.settings.displayedTime));
                    header.appendChild(headerButton);
                    headerContainer.appendChild(header);
                    var nextButton = document.createElement("td");
                    nextButton.setAttribute("style", "text-align: right; padding-right: 4px");
                    var nextButtonLink = document.createElement("a");
                    nextButtonLink.setAttribute("href", "javascript://");
                    nextButtonLink.setAttribute("style", "text-decoration: none; color: Gray; font-size: " + (this.settings.theme == "Modern" ? "10px" : "x-small") + "; cursor: pointer");
                    nextButtonLink.appendChild(document.createTextNode("►"));
                    nextButtonLink.onclick = function (e) {
                        _this.setDisplayedValue(displayedTime + (_this.settings.rows * _this.settings.columns));
                        e.stopPropagation();
                    };
                    nextButton.appendChild(nextButtonLink);
                    headerContainer.appendChild(nextButton);
                    container.appendChild(headerContainer);

                    var mainCellContainer = document.createElement("tr");
                    container.appendChild(mainCellContainer);
                    var mainCellScrollerContainer = document.createElement("td");
                    mainCellScrollerContainer.colSpan = 3;
                    mainCellContainer.appendChild(mainCellScrollerContainer);
                    var mainCellScroller = document.createElement("div");
                    mainCellScroller.setAttribute("style", "padding: 2px; max-height: " + this.settings.scrollingHeight + "; overflow-y: auto");
                    mainCellScrollerContainer.appendChild(mainCellScroller);

                    var cellContainer = document.createElement("table");
                    cellContainer.cellSpacing = "0";
                    cellContainer.cellPadding = "0";
                    mainCellScroller.appendChild(cellContainer);

                    var time = this.settings.displayedTime != null ? this.settings.displayedTime : 0;
                    var selectedTime = this.selectedTime != null ? this.selectedTime : 0;
                    var rows = this.settings.rows;
                    var columns = this.settings.columns;
                    for (var r = 0; r < rows; r++) {
                        var valuesContainer = document.createElement("tr");
                        for (var c = 0; c < columns; c++) {
                            if (this.settings.invertMatrix)
                                time = displayedTime + c * rows + r;
                            var value = document.createElement("td");
                            value.setAttribute("style", this.settings.timeStyle);
                            value.setAttribute("class", this.settings.timeClass);
                            var valueString;
                            try  {
                                valueString = this.settings.timeFormatter(time);
                            } catch (exc) {
                                valueString = time.toString();
                            }
                            var valueContainer = document.createElement("div");
                            value.appendChild(valueContainer);
                            var valueLink = document.createElement("a");
                            valueLink.setAttribute("href", "javascript://");
                            valueLink.setAttribute("style", "text-decoration: none; display: inline-block; cursor: pointer; color: inherit");
                            valueLink.appendChild(document.createTextNode(valueString));
                            valueContainer.appendChild(valueLink);
                            var isSelected = selectedTime != null && time == selectedTime;
                            if (isSelected) {
                                valueContainer.setAttribute("style", this.settings.selectedTimeStyle);
                                valueContainer.setAttribute("class", this.settings.selectedTimeClass);
                                this["selectedElement"] = valueContainer;
                            }
                            valueLink["value"] = time;
                            valueLink.onclick = function (e) {
                                var valueLinkSource = e.currentTarget;
                                var valueSource = valueLinkSource["value"];
                                _this.setValue(valueSource);
                                e.stopPropagation();
                            };
                            valuesContainer.appendChild(value);
                            time++;
                        }
                        cellContainer.appendChild(valuesContainer);
                    }

                    this.host.appendChild(container);
                };

                Element.prototype.getValue = function () {
                    return this.selectedTime;
                };
                Element.prototype.setValue = function (value) {
                    if (!value || value < this.settings.minValue)
                        value = this.settings.minValue;
                    var timeSource = value;
                    this.selectedTime = timeSource;
                    this.refresh();
                    if (this.settings.selectedTimeChangeHandler)
                        this.settings.selectedTimeChangeHandler(timeSource);
                };
                Element.prototype.setDisplayedValue = function (value) {
                    if (!value || value < this.settings.minValue)
                        value = this.settings.minValue;
                    if (this.settings.displayedTime == null || value != this.settings.displayedTime) {
                        this.settings.displayedTime = value;
                        this.refresh();
                        if (this.settings.displayedTimeChangeHandler)
                            this.settings.displayedTimeChangeHandler(value);
                    }
                };
                return Element;
            })();
            CalendarSelector.Element = Element;
        })(Controls.CalendarSelector || (Controls.CalendarSelector = {}));
        var CalendarSelector = Controls.CalendarSelector;

        (function (Calendar) {
            function initialize(element, selectedDate, settings) {
                return new Element(element, selectedDate, settings);
            }
            Calendar.initialize = initialize;
            function get(element) {
                return element["component"];
            }
            Calendar.get = get;

            var Element = (function () {
                function Element(host, selectedDate, settings) {
                    this.host = host;
                    this.selectedDate = selectedDate;
                    this.settings = settings;
                    this.isInitialized = false;
                    this.host["component"] = this;

                    if (typeof settings === "undefined")
                        settings = {};
                    this.settings = settings;
                    Element.initializeSettings(this.settings);

                    if (typeof selectedDate === "undefined")
                        selectedDate = new Date();
                    if (selectedDate < this.settings.minValue)
                        selectedDate = this.settings.minValue;
                    this.selectedDate = selectedDate;
                    this.selectedDates = this.selectedDate ? [this.selectedDate] : [];
                    this.selectedDateRange = this.selectedDate ? { start: this.selectedDate, finish: this.selectedDate } : null;
                    this.selectedDateRanges = this.selectedDateRange ? [this.selectedDateRange] : null;

                    if (this.settings.displayedDate == null)
                        this.settings.displayedDate = this.selectedDate;
                    if (this.settings.displayedDate < this.settings.minValue)
                        this.settings.displayedDate = this.settings.minValue;

                    this.refresh();

                    this.isInitialized = true;
                }
                Element.initializeSettings = function (settings) {
                    if (typeof settings.theme === "undefined")
                        settings.theme = "Modern";

                    if (typeof settings.isReadOnly === "undefined")
                        settings.isReadOnly = false;
                    if (typeof settings.isTodayLinkVisible === "undefined")
                        settings.isTodayLinkVisible = false;
                    if (typeof settings.defaultTimeOfDay === "undefined")
                        settings.defaultTimeOfDay = 0;

                    if (typeof settings.allowMultipleSelection === "undefined")
                        settings.allowMultipleSelection = false;
                    if (typeof settings.allowRangeSelection === "undefined")
                        settings.allowRangeSelection = false;

                    if (typeof settings.monthYearHeaderStyle === "undefined")
                        settings.monthYearHeaderStyle = "color: " + (settings.theme == "Modern" ? "#505050" : "Black") + "; background-color: #f0f0f0; padding: 8px; font-size: " + (settings.theme == "Modern" ? "12px" : "small") + "; text-align: center; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: default";
                    if (typeof settings.dayOfWeekHeaderStyle === "undefined")
                        settings.dayOfWeekHeaderStyle = "color: " + (settings.theme == "Modern" ? "#505050" : "Black") + "; padding: 3px; padding-top: 4px; padding-bottom: 2px; border-bottom: 1px solid " + (settings.theme == "Modern" ? "#e0e0e0" : "Silver") + "; font-size: " + (settings.theme == "Modern" ? "12px" : "small") + "; text-align: center; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: default";
                    if (typeof settings.dayStyle === "undefined")
                        settings.dayStyle = "color: " + (settings.theme == "Modern" ? "#505050" : "Black") + "; min-width: 24px; padding: 2px; text-align: center; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: default; font-size: " + (settings.theme == "Modern" ? "12px" : "small") + (settings.allowMultipleSelection || settings.allowRangeSelection ? "; height: " + (settings.theme == "Modern" ? "18px" : "20px") : "");
                    if (typeof settings.otherMonthDayStyle === "undefined")
                        settings.otherMonthDayStyle = "color: " + (settings.theme == "Modern" ? "#c0c0c0" : "Silver");
                    if (typeof settings.selectedDayStyle === "undefined")
                        settings.selectedDayStyle = "background-color: #3399ff; color: White; padding: 2px";
                    if (typeof settings.disabledDayStyle === "undefined")
                        settings.disabledDayStyle = "color: " + (settings.theme == "Modern" ? "#c0c0c0" : "Silver");
                    if (typeof settings.todayLinkStyle === "undefined")
                        settings.todayLinkStyle = "color: " + (settings.theme == "Modern" ? "#505050" : "Black") + "; padding: 4px; border-top: 1px solid " + (settings.theme == "Modern" ? "#e0e0e0" : "Silver") + "; font-size: " + (settings.theme == "Modern" ? "12px" : "small") + "; text-align: center; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: default";

                    if (typeof settings.todayString === "undefined")
                        settings.todayString = "Today";

                    if (typeof settings.months === "undefined")
                        settings.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    if (typeof settings.daysOfWeek === "undefined")
                        settings.daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

                    if (typeof settings.monthRows === "undefined")
                        settings.monthRows = 1;
                    if (settings.monthRows < 1)
                        settings.monthRows = 1;
                    if (typeof settings.monthColumns === "undefined")
                        settings.monthColumns = 1;
                    if (settings.monthColumns < 1)
                        settings.monthColumns = 1;
                    if (typeof settings.monthCellSpacing === "undefined")
                        settings.monthCellSpacing = "0";
                    if (typeof settings.applyMonthStyleForSingleCell === "undefined")
                        settings.applyMonthStyleForSingleCell = false;
                    if (typeof settings.applyNextMonthButtonToLastColumn === "undefined")
                        settings.applyNextMonthButtonToLastColumn = true;
                    if (typeof settings.applyNextMonthButtonToLastRow === "undefined")
                        settings.applyNextMonthButtonToLastRow = false;
                    if (typeof settings.containerStyle === "undefined")
                        settings.containerStyle = (settings.theme == "Modern" ? "" : "border: 1px solid #707070; ") + "font-family: Arial" + (typeof settings.monthCellStyle === "undefined" && (settings.monthRows > 1 || settings.monthColumns > 1 || settings.applyMonthStyleForSingleCell) ? (settings.theme == "Modern" ? "; margin: -2px" : "; padding: 2px") : (settings.theme == "Modern" ? "; border: 1px solid #e0e0e0" : ""));
                    if (typeof settings.monthCellStyle === "undefined")
                        settings.monthCellStyle = "margin: 2px; border: 1px solid " + (settings.theme == "Modern" ? "#e0e0e0" : "Silver");

                    if (typeof settings.calendarSelectorLevels === "undefined")
                        settings.calendarSelectorLevels = 0;
                    if (typeof settings.calendarSelectorPopupStyle === "undefined")
                        settings.calendarSelectorPopupStyle = "background-color: White; border: 1px solid " + (settings.theme == "Modern" ? "#e0e0e0" : "#707070") + "; font-family: Arial";

                    if (typeof settings.minValue === "undefined")
                        settings.minValue = new Date(101, 1 - 1, 1);
                };

                Element.prototype.refresh = function () {
                    var _this = this;
                    var document = this.host.ownerDocument;

                    for (var n = this.host.childNodes.length; n-- > 0;)
                        this.host.removeChild(this.host.childNodes[n]);

                    var container = document.createElement("table"), w, d;
                    container.cellSpacing = this.settings.monthCellSpacing;
                    container.cellPadding = "0";
                    container.setAttribute("style", this.settings.containerStyle);
                    if (this.settings.containerClass)
                        container.setAttribute("class", this.settings.containerClass);

                    var displayedDate = Element.getDate(this.settings.displayedDate != null ? this.settings.displayedDate : (this.selectedDate != null ? this.selectedDate : new Date()));
                    if (this.settings.defaultTimeOfDay >= Element.dayDuration)
                        displayedDate = Element.subtractDay(displayedDate);

                    var monthDate = displayedDate;

                    for (var r = 0; r < this.settings.monthRows; r++) {
                        var monthRowContainer = document.createElement("tr");
                        container.appendChild(monthRowContainer);
                        for (var c = 0; c < this.settings.monthColumns; c++) {
                            var monthColumnContainer = document.createElement("td");
                            monthRowContainer.appendChild(monthColumnContainer);
                            var monthCellContainer = document.createElement("table");
                            monthCellContainer.cellSpacing = "0";
                            monthCellContainer.cellPadding = "0";
                            if (this.settings.monthRows > 1 || this.settings.monthColumns > 1 || this.settings.applyMonthStyleForSingleCell) {
                                monthCellContainer.setAttribute("style", this.settings.monthCellStyle);
                                monthCellContainer.setAttribute("class", this.settings.monthCellClass);
                            }
                            monthColumnContainer.appendChild(monthCellContainer);

                            var monthYearHeaderContainer = document.createElement("tr");
                            monthYearHeaderContainer.setAttribute("style", this.settings.monthYearHeaderStyle);
                            monthYearHeaderContainer.setAttribute("class", this.settings.monthYearHeaderClass);
                            var previousButton = document.createElement("td");
                            previousButton.setAttribute("style", "text-align: left; padding-left: 4px");
                            if (r == 0 && c == 0) {
                                var previousButtonLink = document.createElement("a");
                                previousButtonLink.setAttribute("href", "javascript://");
                                previousButtonLink.setAttribute("style", "text-decoration: none; color: Gray; font-size: " + (this.settings.theme == "Modern" ? "10px" : "x-small") + "; cursor: pointer");
                                previousButtonLink.appendChild(document.createTextNode("◄"));
                                previousButtonLink.onclick = function (e) {
                                    var dateSource = displayedDate;
                                    while (dateSource.getMonth() == displayedDate.getMonth())
                                        dateSource = Element.subtractDay(dateSource);
                                    _this.setDisplayedValue(dateSource);
                                    e.stopPropagation();
                                };
                                previousButton.appendChild(previousButtonLink);
                            }
                            monthYearHeaderContainer.appendChild(previousButton);
                            var monthYearHeader = document.createElement("td");
                            monthYearHeader.setAttribute("style", this.settings.monthYearHeaderStyle);
                            monthYearHeader.setAttribute("class", this.settings.monthYearHeaderClass);
                            monthYearHeader.colSpan = 5;
                            var monthYearHeaderButton = document.createElement("span");

                            var monthText = document.createTextNode(this.settings.months[monthDate.getMonth()] + " " + monthDate.getFullYear());
                            if (this.settings.calendarSelectorLevels < 1 || r > 0 || c > 0) {
                                monthYearHeaderButton.appendChild(monthText);
                            } else {
                                var monthLink = document.createElement("a");
                                monthLink.setAttribute("href", "javascript://");
                                monthLink.setAttribute("style", "text-decoration: none; display: inline-block; cursor: pointer; color: inherit");
                                monthLink.appendChild(monthText);
                                monthYearHeaderButton.appendChild(monthLink);
                                var monthPopupSpan = document.createElement("div");
                                monthPopupSpan.setAttribute("style", "display: none; position: absolute; margin-left: -40px");
                                monthLink.appendChild(monthPopupSpan);
                                var monthPopup = document.createElement("div");
                                monthPopup.setAttribute("style", this.settings.calendarSelectorPopupStyle);
                                if (this.settings.calendarSelectorPopupClass)
                                    monthPopup.setAttribute("class", this.settings.calendarSelectorPopupClass);
                                monthPopupSpan.appendChild(monthPopup);
                                monthLink.onclick = function (e) {
                                    if ((e.target || e.srcElement) != monthLink)
                                        return;
                                    if (monthPopupSpan.style.display != "none") {
                                        monthPopupSpan.style.display = "none";
                                        e.stopPropagation();
                                        return;
                                    }
                                    var monthSelectorValue = displayedDate.getFullYear() * 12 + displayedDate.getMonth();
                                    var monthSelectorSettings = {
                                        theme: _this.settings.theme,
                                        headerProvider: function (document, time) {
                                            var yearText = document.createTextNode(Math.floor(time / 12).toString());
                                            if (_this.settings.calendarSelectorLevels < 2)
                                                return yearText;
                                            var yearLink = document.createElement("a");
                                            yearLink.setAttribute("href", "javascript://");
                                            yearLink.setAttribute("style", "text-decoration: none; display: inline-block; cursor: pointer; color: inherit");
                                            yearLink.appendChild(yearText);
                                            var yearPopupSpan = document.createElement("div");
                                            yearPopupSpan.setAttribute("style", "display: none; position: absolute; margin-left: -10px");
                                            yearLink.appendChild(yearPopupSpan);
                                            var yearPopup = document.createElement("div");
                                            yearPopup.setAttribute("style", _this.settings.calendarSelectorPopupStyle);
                                            if (_this.settings.calendarSelectorPopupClass)
                                                yearPopup.setAttribute("class", _this.settings.calendarSelectorPopupClass);
                                            yearPopupSpan.appendChild(yearPopup);
                                            yearLink.onclick = function (e) {
                                                if ((e.target || e.srcElement) != yearLink)
                                                    return;
                                                if (yearPopupSpan.style.display != "none") {
                                                    yearPopupSpan.style.display = "none";
                                                    e.stopPropagation();
                                                    return;
                                                }
                                                var yearSelectorValue = Math.floor(time / 12) - 1;
                                                var yearSelectorSettings = {
                                                    // Optionally, initialize a specific theme (supported values: Modern, Standard).
                                                    // theme: "Standard",
                                                    rows: 5, columns: 2, invertMatrix: true,
                                                    headerProvider: function (document, time) {
                                                        var decadeText = document.createTextNode((time + 1).toString() + " - " + (time + 10).toString());
                                                        if (_this.settings.calendarSelectorLevels < 3)
                                                            return decadeText;
                                                        var decadeLink = document.createElement("a");
                                                        decadeLink.setAttribute("href", "javascript://");
                                                        decadeLink.setAttribute("style", "text-decoration: none; display: inline-block; cursor: pointer; color: inherit");
                                                        decadeLink.appendChild(decadeText);
                                                        var decadePopupSpan = document.createElement("div");
                                                        decadePopupSpan.setAttribute("style", "display: none; position: absolute; margin-left: -10px");
                                                        decadeLink.appendChild(decadePopupSpan);
                                                        var decadePopup = document.createElement("div");
                                                        decadePopup.setAttribute("style", _this.settings.calendarSelectorPopupStyle);
                                                        if (_this.settings.calendarSelectorPopupClass)
                                                            decadePopup.setAttribute("class", _this.settings.calendarSelectorPopupClass);
                                                        decadePopupSpan.appendChild(decadePopup);
                                                        decadeLink.onclick = function (e) {
                                                            if ((e.target || e.srcElement) != decadeLink)
                                                                return;
                                                            if (decadePopupSpan.style.display != "none") {
                                                                decadePopupSpan.style.display = "none";
                                                                e.stopPropagation();
                                                                return;
                                                            }
                                                            var decadeSelectorValue = Math.floor(time / 10);
                                                            var decadeSelectorSettings = {
                                                                // Optionally, initialize a specific theme (supported values: Modern, Standard).
                                                                // theme: "Standard",
                                                                rows: 5, columns: 2, invertMatrix: true,
                                                                headerProvider: function (document, time) {
                                                                    return document.createTextNode((time * 10 + 1).toString() + " - " + ((time + 10) * 10).toString());
                                                                },
                                                                timeFormatter: function (time) {
                                                                    return (time * 10 + 1).toString() + "-" + (time * 10 + 10).toString().substr((time * 10 + 10).toString().length - 2);
                                                                },
                                                                minValue: 10
                                                            };
                                                            decadePopupSpan.style.display = "block";
                                                            var decadeSelector = CalendarSelector.initialize(decadePopup, decadeSelectorValue, decadeSelectorSettings);
                                                            decadeSelector.settings.selectedTimeChangeHandler = function (selectedTime) {
                                                                yearSelector.setDisplayedValue(selectedTime * 10);
                                                            };
                                                            e.stopPropagation();
                                                        };
                                                        return decadeLink;
                                                    },
                                                    timeFormatter: function (time) {
                                                        return (time + 1).toString();
                                                    },
                                                    minValue: 100
                                                };
                                                yearPopupSpan.style.display = "block";
                                                var yearSelector = CalendarSelector.initialize(yearPopup, yearSelectorValue, yearSelectorSettings);
                                                yearSelector.settings.selectedTimeChangeHandler = function (selectedTime) {
                                                    monthSelector.setDisplayedValue((selectedTime + 1) * 12);
                                                };
                                                e.stopPropagation();
                                            };
                                            return yearLink;
                                        },
                                        timeFormatter: function (time) {
                                            return _this.settings.months[time - Math.floor(time / 12) * 12];
                                        },
                                        minValue: (100 + 1) * 12
                                    };
                                    monthPopupSpan.style.display = "block";
                                    var monthSelector = CalendarSelector.initialize(monthPopup, monthSelectorValue, monthSelectorSettings);
                                    monthSelector.settings.selectedTimeChangeHandler = function (selectedTime) {
                                        _this.setDisplayedValue(new Date(Math.floor(selectedTime / 12), selectedTime - Math.floor(selectedTime / 12) * 12, 1));
                                    };
                                    e.stopPropagation();
                                };
                            }

                            monthYearHeader.appendChild(monthYearHeaderButton);
                            monthYearHeaderContainer.appendChild(monthYearHeader);
                            var nextButton = document.createElement("td");
                            nextButton.setAttribute("style", "text-align: right; padding-right: 4px");
                            if ((!this.settings.applyNextMonthButtonToLastRow ? r == 0 : r == this.settings.monthRows - 1) && (this.settings.applyNextMonthButtonToLastColumn ? c == this.settings.monthColumns - 1 : c == 0)) {
                                var nextButtonLink = document.createElement("a");
                                nextButtonLink.setAttribute("href", "javascript://");
                                nextButtonLink.setAttribute("style", "text-decoration: none; color: Gray; font-size: " + (this.settings.theme == "Modern" ? "10px" : "x-small") + "; cursor: pointer");
                                nextButtonLink.appendChild(document.createTextNode("►"));
                                nextButtonLink.onclick = function (e) {
                                    var dateSource = displayedDate;
                                    while (dateSource.getMonth() == displayedDate.getMonth())
                                        dateSource = Element.addDay(dateSource);
                                    _this.setDisplayedValue(dateSource);
                                    e.stopPropagation();
                                };
                                nextButton.appendChild(nextButtonLink);
                            }
                            monthYearHeaderContainer.appendChild(nextButton);
                            monthCellContainer.appendChild(monthYearHeaderContainer);

                            var daysOfWeekHeaderContainer = document.createElement("tr");
                            for (d = 0; d < 7; d++) {
                                var dayOfWeekHeader = document.createElement("td");
                                dayOfWeekHeader.setAttribute("style", this.settings.dayOfWeekHeaderStyle);
                                dayOfWeekHeader.setAttribute("class", this.settings.dayOfWeekHeaderClass);
                                dayOfWeekHeader.appendChild(document.createTextNode(this.settings.daysOfWeek[d]));
                                daysOfWeekHeaderContainer.appendChild(dayOfWeekHeader);
                            }
                            monthCellContainer.appendChild(daysOfWeekHeaderContainer);

                            var selectedDate = this.selectedDate != null ? Element.getDate(this.selectedDate) : null;
                            if (selectedDate != null && this.settings.defaultTimeOfDay >= Element.dayDuration)
                                selectedDate = Element.subtractDay(selectedDate);
                            var displayedMonth = monthDate.getMonth();
                            var firstDayOfMonth = Element.getFirstDayOfMonth(monthDate);
                            var date = Element.getPreviousWeekStart(firstDayOfMonth);
                            for (w = 0; w < 6; w++) {
                                var daysContainer = document.createElement("tr");
                                for (d = 0; d < 7; d++) {
                                    var day = document.createElement("td");
                                    day.setAttribute("style", this.settings.dayStyle);
                                    day.setAttribute("class", this.settings.dayClass);
                                    var dayString = date.getDate().toString();
                                    var mainDayContainer = document.createElement("span");
                                    day.appendChild(mainDayContainer);
                                    var dayContainer = document.createElement("span");
                                    mainDayContainer.appendChild(dayContainer);
                                    var isDisabled = typeof this.settings.disabledDateSelector !== "undefined" && this.settings.disabledDateSelector(date);
                                    var isInDisplayedMonth = date.getMonth() == displayedMonth;
                                    var dayLink = document.createElement("a");
                                    dayLink.setAttribute("href", "javascript://");
                                    dayLink.setAttribute("style", "text-decoration: none; display: inline-block; cursor: " + (this.settings.isReadOnly || isDisabled || (!isInDisplayedMonth && (this.settings.allowRangeSelection || this.settings.allowMultipleSelection)) ? "default" : "pointer") + "; color: inherit; width: 20px");
                                    dayLink.appendChild(document.createTextNode(dayString));
                                    dayContainer.appendChild(dayLink);
                                    if (isDisabled) {
                                        mainDayContainer.setAttribute("style", this.settings.disabledDayStyle);
                                        mainDayContainer.setAttribute("class", this.settings.disabledDayClass);
                                    } else if (isInDisplayedMonth) {
                                        var isSelected = (selectedDate && Math.abs(date.valueOf() - selectedDate.valueOf()) <= Element.hourDuration) || this.isValueSelected(date);
                                        if (isSelected) {
                                            mainDayContainer.setAttribute("style", this.settings.selectedDayStyle);
                                            mainDayContainer.setAttribute("class", this.settings.selectedDayClass);
                                        }
                                        if (this.settings.highlightingStyleSelector) {
                                            var dayStyle = this.settings.highlightingStyleSelector(date, isSelected);
                                            if (dayStyle)
                                                dayContainer.setAttribute("style", dayStyle);
                                        }
                                        if (this.settings.highlightingClassSelector) {
                                            var dayClass = this.settings.highlightingClassSelector(date, isSelected);
                                            if (dayClass)
                                                dayContainer.setAttribute("class", dayClass);
                                        }
                                    } else {
                                        dayContainer.setAttribute("style", this.settings.otherMonthDayStyle);
                                        dayContainer.setAttribute("class", this.settings.otherMonthDayClass);
                                    }
                                    if (!this.settings.isReadOnly && !isDisabled) {
                                        dayLink["value"] = Element.addTimeOfDay(date, this.settings.defaultTimeOfDay);
                                        if (!this.settings.allowMultipleSelection && !this.settings.allowRangeSelection) {
                                            dayLink.onclick = function (e) {
                                                var dayLinkSource = e.currentTarget;
                                                var dateSource = dayLinkSource["value"];
                                                _this.setDisplayedValue(dateSource);
                                                _this.setValue(dateSource);
                                                e.stopPropagation();
                                            };
                                        } else if (!this.settings.allowRangeSelection) {
                                            if (isInDisplayedMonth) {
                                                dayLink.onclick = function (e) {
                                                    var dayLinkSource = e.currentTarget;
                                                    var dateSource = dayLinkSource["value"];
                                                    _this.invertValueSelection(dateSource);
                                                    e.stopPropagation();
                                                };
                                            }
                                        } else if (isInDisplayedMonth) {
                                            dayLink.onmousedown = function (e) {
                                                var dayLinkSource = e.currentTarget;
                                                var dateSource = dayLinkSource["value"];
                                                _this.draggingFromDate = dateSource;
                                                _this.setValue(dateSource);
                                                e.preventDefault();
                                            };
                                            dayLink.onmouseover = function (e) {
                                                if (!_this.draggingFromDate)
                                                    return;
                                                var dayLinkSource = e.currentTarget;
                                                var dateSource = dayLinkSource["value"];
                                                if (!_this.draggingToDate || dateSource.valueOf() != _this.draggingToDate.valueOf()) {
                                                    _this.draggingToDate = dateSource;
                                                    _this.setValueRange({ start: _this.draggingFromDate, finish: _this.draggingToDate });
                                                }
                                            };
                                        }
                                    }
                                    daysContainer.appendChild(day);
                                    date = Element.addDay(date);
                                }
                                monthCellContainer.appendChild(daysContainer);
                            }
                            monthDate = date;
                        }
                    }

                    if (!this.settings.isReadOnly && this.settings.isTodayLinkVisible) {
                        var todayLinkContainer = document.createElement("tr");
                        var todayButton = document.createElement("td");
                        todayButton.colSpan = 7;
                        todayButton.setAttribute("style", this.settings.todayLinkStyle);
                        todayButton.setAttribute("class", this.settings.todayLinkClass);
                        var todayButtonLink = document.createElement("a");
                        todayButtonLink.setAttribute("href", "javascript://");
                        todayButtonLink.setAttribute("style", "text-decoration: none; color: inherit; cursor: pointer");
                        todayButtonLink.appendChild(document.createTextNode(this.settings.todayString));
                        todayButton.appendChild(todayButtonLink);
                        todayButtonLink["value"] = Element.addTimeOfDay(Element.getDate(new Date()), this.settings.defaultTimeOfDay);
                        todayButtonLink.onclick = function (e) {
                            var dayLinkSource = e.currentTarget;
                            var dateSource = dayLinkSource["value"];
                            _this.setDisplayedValue(dateSource);
                            _this.setValue(dateSource);
                            e.stopPropagation();
                        };
                        todayLinkContainer.appendChild(todayButton);
                        container.appendChild(todayLinkContainer);
                    }

                    this.host.appendChild(container);

                    if (!this.isInitialized) {
                        document.addEventListener("mouseup", function (e) {
                            if (_this.draggingToDate)
                                delete _this.draggingToDate;
                            if (_this.draggingFromDate)
                                delete _this.draggingFromDate;
                        }, true);
                    }
                };

                Element.prototype.getValue = function () {
                    return this.selectedDate;
                };
                Element.prototype.setValue = function (value) {
                    if (value != null && value < this.settings.minValue)
                        value = this.settings.minValue;
                    var dateSource = value;
                    if ((this.selectedDate == null && dateSource != null) || (this.selectedDate != null && dateSource == null) || (this.selectedDate != null && dateSource != null && dateSource.valueOf() != this.selectedDate.valueOf()) || this.settings.forceSetOnClick) {
                        this["isDuringInternalSetValue"] = true;
                        this.selectedDate = dateSource;
                        this.setValues(dateSource != null ? [dateSource] : []);
                        delete this["isDuringInternalSetValue"];
                        if (this.settings.displayedDate == null && dateSource != null) {
                            this.settings.displayedDate = dateSource;
                            this.refresh();
                            if (this.settings.displayedDateChangeHandler)
                                this.settings.displayedDateChangeHandler(dateSource);
                        } else {
                            this.refresh();
                        }
                        if (this.settings.selectedDateChangeHandler)
                            this.settings.selectedDateChangeHandler(dateSource);
                    }
                };
                Element.prototype.setDisplayedValue = function (value) {
                    if (value != null && value < this.settings.minValue)
                        value = this.settings.minValue;
                    if (this.settings.displayedDate == null || value.valueOf() != this.settings.displayedDate.valueOf()) {
                        this.settings.displayedDate = value;
                        this.refresh();
                        if (this.settings.displayedDateChangeHandler)
                            this.settings.displayedDateChangeHandler(value);
                    }
                };

                Element.prototype.getValues = function () {
                    return this.selectedDates;
                };
                Element.prototype.setValues = function (values) {
                    this.selectedDates = values;
                    if (values.length > 0) {
                        this["isDuringInternalSetValues"] = true;
                        this.selectedDate = values[0];
                        this.setValueRanges([{ start: this.selectedDate, finish: this.selectedDate }]);
                        delete this["isDuringInternalSetValues"];
                    }
                };
                Element.prototype.getValueRange = function () {
                    return this.selectedDateRange;
                };
                Element.prototype.setValueRange = function (valueRange) {
                    if (!valueRange.finish)
                        valueRange.finish = valueRange.start;
                    if (valueRange.finish < valueRange.start) {
                        var valueRangeStart = valueRange.finish;
                        valueRange.finish = valueRange.start;
                        valueRange.start = valueRangeStart;
                    }
                    this.setValueRanges([valueRange]);
                };
                Element.prototype.getValueRanges = function () {
                    return this.selectedDateRanges;
                };
                Element.prototype.setValueRanges = function (valueRanges) {
                    this.selectedDateRanges = valueRanges;
                    if (valueRanges.length > 0) {
                        this.selectedDateRange = valueRanges[0];
                        if (!this["isDuringInternalSetValues"]) {
                            this.selectedDates = [];
                            for (var r = 0; r < valueRanges.length; r++) {
                                var valueRange = valueRanges[r];
                                if (!valueRange.finish)
                                    valueRange.finish = valueRange.start;
                                if (valueRange.finish < valueRange.start) {
                                    var valueRangeStart = valueRange.finish;
                                    valueRange.finish = valueRange.start;
                                    valueRange.start = valueRangeStart;
                                }
                                for (var d = valueRange.start; d <= valueRange.finish; d = Element.addDay(d))
                                    this.selectedDates.push(d);
                            }
                            this.selectedDate = this.selectedDateRange.start;
                        }
                    }
                    if (!this["isDuringInternalSetValue"]) {
                        this.refresh();
                        if (this.settings.selectedDateChangeHandler)
                            this.settings.selectedDateChangeHandler(this.selectedDate);
                    }
                    if (this.settings.selectionChangedHandler)
                        this.settings.selectionChangedHandler();
                };

                Element.prototype.isValueSelected = function (date) {
                    var dateValue = date.valueOf();
                    for (var i = 0; i < this.selectedDates.length; i++) {
                        if (this.selectedDates[i].valueOf() == dateValue)
                            return true;
                    }
                    return false;
                };
                Element.prototype.invertValueSelection = function (date) {
                    var dateValue = date.valueOf();
                    for (var i = 0; i < this.selectedDates.length; i++) {
                        if (this.selectedDates[i].valueOf() == dateValue) {
                            if (this.selectedDates.length > 1) {
                                this.selectedDates.splice(i, 1);
                                this.setValues(this.selectedDates);
                            }
                            return;
                        }
                    }
                    this.selectedDates.push(date);
                    this.setValues(this.selectedDates);
                };

                Element.getDate = function (dateTime) {
                    var timezoneOffset = dateTime.getTimezoneOffset() * Element.minuteDuration;
                    return new Date(Math.floor((dateTime.valueOf() - timezoneOffset) / Element.dayDuration) * Element.dayDuration + timezoneOffset);
                };
                Element.getPreviousWeekStart = function (dateTime) {
                    var date = Element.getDate(dateTime);
                    var originalDate = date;
                    while (date.getDay() > 0)
                        date = Element.subtractDay(date);
                    if (originalDate.valueOf() - date.valueOf() > 6.5 * Element.dayDuration) {
                        for (var i = 0; i < 7; i++)
                            date = Element.addDay(date);
                    }
                    return date;
                };
                Element.addDay = function (date) {
                    var timezoneOffset = date.getTimezoneOffset() * Element.minuteDuration;
                    var date = new Date(date.valueOf() - timezoneOffset + Element.dayDuration);
                    timezoneOffset = date.getTimezoneOffset() * Element.minuteDuration;
                    return new Date(date.valueOf() + timezoneOffset);
                };
                Element.subtractDay = function (date) {
                    return Element.getDate(new Date(date.valueOf() - Element.dayDuration));
                };
                Element.addTimeOfDay = function (date, timeOfDay) {
                    var timezoneOffset = date.getTimezoneOffset() * Element.minuteDuration;
                    var date = new Date(date.valueOf() - timezoneOffset + timeOfDay);
                    timezoneOffset = date.getTimezoneOffset() * Element.minuteDuration;
                    return new Date(date.valueOf() + timezoneOffset);
                };
                Element.getFirstDayOfMonth = function (dateTime) {
                    var date = Element.getDate(dateTime);
                    while (date.getDate() > 1)
                        date = Element.subtractDay(date);
                    return date;
                };
                Element.secondDuration = 1000;
                Element.minuteDuration = 60 * Element.secondDuration;
                Element.hourDuration = 60 * Element.minuteDuration;
                Element.dayDuration = 24 * Element.hourDuration;
                Element.weekDuration = 7 * Element.dayDuration;
                Element.initialSundayDateTimeValue = 3 * Element.dayDuration;
                return Element;
            })();
            Calendar.Element = Element;
        })(Controls.Calendar || (Controls.Calendar = {}));
        var Calendar = Controls.Calendar;

        (function (DatePicker) {
            function initialize(element, value, settings) {
                return new Element(element, value, settings);
            }
            DatePicker.initialize = initialize;
            function get(element) {
                return element["component"];
            }
            DatePicker.get = get;

            var Element = (function () {
                function Element(host, value, settings) {
                    this.host = host;
                    this.value = value;
                    this.settings = settings;
                    this.isInitialized = false;
                    this.dropDownButtonElement = null;
                    this.host["component"] = this;

                    if (typeof settings === "undefined")
                        settings = {};
                    this.settings = settings;
                    Element.initializeSettings(this.settings);

                    var document = this.host.ownerDocument;
                    this.inputHost = host instanceof HTMLInputElement ? host : null;
                    if (this.inputHost) {
                        if (value == null) {
                            try  {
                                value = this.settings.dateTimeParser(this.inputHost.value);
                            } catch (exc) {
                            }
                        }
                        var internalHost = document.createElement("span");
                        if (this.inputHost.parentElement)
                            this.inputHost.parentElement.insertBefore(internalHost, this.inputHost);
                        this.host = internalHost;
                        this.host["component"] = this;
                    }

                    if (typeof value === "undefined")
                        value = settings.isNullValueAccepted ? null : new Date();
                    this.value = value;

                    this.refresh();

                    this.isInitialized = true;
                }
                Element.initializeSettings = function (settings) {
                    if (typeof settings.isTodayLinkVisible === "undefined")
                        settings.isTodayLinkVisible = true;
                    if (typeof settings.calendarSelectorLevels === "undefined")
                        settings.calendarSelectorLevels = Infinity;

                    if (typeof settings.popupStyle === "undefined")
                        settings.popupStyle = "background-color: White; border: 1px solid " + (settings.theme == "Modern" ? "#e0e0e0" : "#707070") + "; font-family: Arial";
                    if (typeof settings.calendarSelectorPopupStyle === "undefined")
                        settings.calendarSelectorPopupStyle = settings.popupStyle;
                    if (typeof settings.calendarSelectorPopupClass === "undefined")
                        settings.calendarSelectorPopupClass = settings.popupClass;

                    Calendar.Element.initializeSettings(settings);

                    if (typeof settings.openDropDownOnInputClick === "undefined")
                        settings.openDropDownOnInputClick = true;

                    if (typeof settings.dateTimeFormatter === "undefined") {
                        settings.dateTimeFormatter = function (value) {
                            if (value == null && settings.isNullValueAccepted)
                                return "";
                            var numberFormatter = function (value, minLength) {
                                if (typeof minLength === "undefined") { minLength = 2; }
                                var stringValue = value.toString();
                                while (stringValue.length < minLength)
                                    stringValue = "0" + stringValue;
                                return stringValue;
                            };
                            var year = value.getFullYear(), month = value.getMonth() + 1, day = value.getDate(), hour = value.getHours(), minute = value.getMinutes();
                            return numberFormatter(month) + "/" + numberFormatter(day) + "/" + numberFormatter(year, 4) + (settings.defaultTimeOfDay != hour * Element.hourDuration + minute * Element.minuteDuration ? " " + numberFormatter(hour) + ":" + numberFormatter(minute) : "");
                        };
                    }
                    if (typeof settings.dateTimeParser === "undefined") {
                        settings.dateTimeParser = function (value) {
                            if (typeof value === "undefined" || value == null || value.length == 0)
                                return settings.isNullValueAccepted ? null : new Date();
                            var dateValue = new Date(value);
                            if (isNaN(dateValue.valueOf()) || dateValue.getFullYear() <= 0)
                                return new Date();
                            return dateValue;
                        };
                    }
                    if (typeof settings.isNullValueAccepted === "undefined")
                        settings.isNullValueAccepted = true;

                    if (typeof settings.isDropDownButtonVisible === "undefined")
                        settings.isDropDownButtonVisible = false;
                    if (typeof settings.dropDownButtonDefinition === "undefined")
                        settings.dropDownButtonDefinition = "<svg style='display: inline-block; margin-left: 4px; cursor: pointer; vertical-align: middle' width='12' height='12'><rect x='0' y='0' width='12' height='3' style='fill: #707070; stroke: #707070; stroke-width: 0.65'/><rect x='0' y='3' width='12' height='9' style='fill: none; stroke: #707070; stroke-width: 0.65'/><line x1='3' y1='3' x2='3' y2='12' style='stroke: #707070; stroke-width: 0.65'/><line x1='6' y1='3' x2='6' y2='12' style='stroke: #707070; stroke-width: 0.65'/><line x1='9' y1='3' x2='9' y2='12' style='stroke: #707070; stroke-width: 0.65'/><line x1='0' y1='6' x2='12' y2='6' style='stroke: #707070; stroke-width: 0.65'/><line x1='0' y1='9' x2='12' y2='9' style='stroke: #707070; stroke-width: 0.65'/></svg>";

                    if (typeof settings.inputStyle === "undefined" && settings.theme == "Modern")
                        settings.inputStyle = "border: 1px solid #e0e0e0; background-color: White; color: #505050; font-family: Arial; font-size: 12px; padding: 4px";
                };

                Element.prototype.refresh = function () {
                    var _this = this;
                    var document = this.host.ownerDocument;

                    for (var n = this.host.childNodes.length; n-- > 0;)
                        this.host.removeChild(this.host.childNodes[n]);
                    var popupDefinitionElement = document.createElement("div");
                    popupDefinitionElement.setAttribute("style", "margin-top: -1px");
                    if (!this.inputHost) {
                        var popupSpan = document.createElement("span");
                        popupSpan.setAttribute("style", "display: inline-block");
                        var popupInput = document.createElement("input");
                        popupSpan.appendChild(popupInput);
                        popupSpan.appendChild(popupDefinitionElement);
                        this.host.appendChild(popupSpan);
                        var popupHost = this.host.firstChild;
                        this.inputElement = popupHost.firstChild;
                        this.popupElement = popupHost.childNodes[1];
                    } else {
                        var popupSpan = document.createElement("span");
                        popupSpan.setAttribute("style", "display: inline-block");
                        popupSpan.appendChild(popupDefinitionElement);
                        this.host.appendChild(popupSpan);
                        var popupHost = this.host.firstChild;
                        this.popupElement = popupHost.firstChild;
                        if (this.inputHost.parentElement)
                            this.inputHost.parentElement.removeChild(this.inputHost);
                        if (this.popupElement && this.popupElement.parentElement)
                            this.popupElement.parentElement.insertBefore(this.inputHost, this.popupElement);
                        this.inputElement = this.inputHost;
                    }
                    if (this.popupElement) {
                        var popup = document.createElement("div");
                        popup.setAttribute("style", this.settings.popupStyle);
                        if (this.settings.popupClass)
                            popup.setAttribute("class", this.settings.popupClass);
                        this.popupElement.appendChild(popup);
                    }
                    if (this.inputElement) {
                        if (typeof this.settings.inputStyle !== "undefined")
                            this.inputElement.setAttribute("style", this.settings.inputStyle + (this.inputElement.getAttribute("style") ? ";" + this.inputElement.getAttribute("style") : ""));
                        if (this.settings.inputClass)
                            this.inputElement.setAttribute("class", this.settings.inputClass);
                    }
                    if (this.settings.isDropDownButtonVisible) {
                        this.dropDownButtonElement = document.createElement("span");
                        this.dropDownButtonElement.setAttribute("style", "display: inline-block");
                        this.dropDownButtonElement.innerHTML = this.settings.dropDownButtonDefinition;
                        if (this.popupElement && this.popupElement.parentElement)
                            this.popupElement.parentElement.insertBefore(this.dropDownButtonElement, this.popupElement);
                    }

                    if (this.inputElement) {
                        this.inputElement["DatePicker"] = this;
                        this.setValue(this.value);
                        if (this.settings.isReadOnly)
                            this.inputElement.setAttribute("readonly", "readonly");
                    }

                    if (this.popupElement) {
                        var popupHost = this.popupElement.firstChild;
                        this.calendarHost = document.createElement("div");
                        popupHost.appendChild(this.calendarHost);
                    }
                    if (this.calendarHost) {
                        var calendarSettings = {
                            theme: this.settings.theme,
                            isReadOnly: this.settings.isReadOnly,
                            displayedDate: this.settings.displayedDate, defaultTimeOfDay: this.settings.defaultTimeOfDay,
                            isTodayLinkVisible: this.settings.isTodayLinkVisible,
                            containerStyle: null,
                            monthYearHeaderStyle: this.settings.monthYearHeaderStyle, monthYearHeaderClass: this.settings.monthYearHeaderClass,
                            dayOfWeekHeaderStyle: this.settings.dayOfWeekHeaderStyle, dayOfWeekHeaderClass: this.settings.dayOfWeekHeaderClass,
                            dayStyle: this.settings.dayStyle, dayClass: this.settings.dayClass,
                            otherMonthDayStyle: this.settings.otherMonthDayStyle, otherMonthDayClass: this.settings.otherMonthDayClass,
                            selectedDayStyle: this.settings.selectedDayStyle, selectedDayClass: this.settings.selectedDayClass,
                            disabledDayStyle: this.settings.disabledDayStyle, disabledDayClass: this.settings.disabledDayClass,
                            todayLinkStyle: this.settings.todayLinkStyle, todayLinkClass: this.settings.todayLinkClass,
                            monthRows: this.settings.monthRows, monthColumns: this.settings.monthColumns, monthCellSpacing: this.settings.monthCellSpacing,
                            monthCellStyle: this.settings.monthCellStyle, monthCellClass: this.settings.monthCellClass,
                            highlightingStyleSelector: this.settings.highlightingStyleSelector, highlightingClassSelector: this.settings.highlightingClassSelector,
                            disabledDateSelector: this.settings.disabledDateSelector,
                            applyMonthStyleForSingleCell: this.settings.applyMonthStyleForSingleCell,
                            applyNextMonthButtonToLastColumn: true, applyNextMonthButtonToLastRow: false,
                            allowMultipleSelection: false, allowRangeSelection: false,
                            calendarSelectorLevels: this.settings.calendarSelectorLevels,
                            calendarSelectorPopupStyle: this.settings.calendarSelectorPopupStyle, calendarSelectorPopupClass: this.settings.calendarSelectorPopupClass,
                            minValue: this.settings.minValue,
                            months: this.settings.months, daysOfWeek: this.settings.daysOfWeek, todayString: this.settings.todayString,
                            forceSetOnClick: true
                        };
                        calendarSettings.selectedDateChangeHandler = function (value) {
                            _this.setValue(value);
                            if (_this.settings.selectedDateChangeHandler)
                                _this.settings.selectedDateChangeHandler(value);
                        };
                        this.calendar = new Calendar.Element(this.calendarHost, this.value, calendarSettings);
                    }

                    if (this.inputElement) {
                        this.inputElement.addEventListener("change", function (e) {
                            _this.refreshValue();
                        }, true);
                        if (this.dropDownButtonElement)
                            this.dropDownButtonElement.onmousedown = function (e) {
                                _this.recordClick();
                                _this.refreshValue();
                                setTimeout(function () {
                                    _this.toggleDropDown();
                                }, 0);
                            };
                        if (this.popupElement) {
                            this.popupElement.style.position = "absolute";
                            this.popupElement.style.display = "none";
                            this.inputElement.addEventListener("focus", function (e) {
                                if (!_this.settings.openDropDownOnInputClick)
                                    return;
                                _this.openDropDown();
                                _this["focusValue"] = _this.inputElement.value;
                            }, true);
                            this.inputElement.addEventListener("blur", function (e) {
                                if (!_this.settings.openDropDownOnInputClick)
                                    return;
                                if (typeof _this["focusValue"] !== "undefined")
                                    delete _this["focusValue"];
                            }, true);
                            this.inputElement.addEventListener("keydown", function (e) {
                                if (e.keyCode == 13) {
                                    if (!_this.settings.openDropDownOnInputClick)
                                        return;
                                    _this.refreshValue();
                                } else {
                                    _this.closeDropDown();
                                }
                            }, true);
                            this.inputElement.addEventListener("mousedown", function (e) {
                                setTimeout(function () {
                                    if (!_this.settings.openDropDownOnInputClick || (typeof _this["focusValue"] !== "undefined" && _this.inputElement.value != _this["focusValue"]))
                                        return;
                                    _this.refreshValue();
                                    _this.openDropDown();
                                }, 0);
                                _this.recordClick();
                            }, true);
                            this.inputElement.addEventListener("input", function (e) {
                                _this.closeDropDown();
                            }, true);
                            this.popupElement.onmousedown = function (e) {
                                _this.recordClick();
                            };
                            document.addEventListener("mousedown", function (e) {
                                setTimeout(function () {
                                    if (_this.isDuringRecordedClick())
                                        return;
                                    _this.closeDropDown();
                                }, 0);
                            }, true);
                            document.addEventListener("mousewheel", function (e) {
                                _this.closeDropDown();
                            }, true);
                            document.addEventListener("DOMMouseScroll", function (e) {
                                _this.closeDropDown();
                            }, true);
                        }
                    }
                };
                Element.prototype.recordClick = function () {
                    var _this = this;
                    if (this["isDuringClick"])
                        return;
                    this["isDuringClick"] = true;
                    setTimeout(function () {
                        delete _this["isDuringClick"];
                    }, 0);
                };
                Element.prototype.isDuringRecordedClick = function () {
                    return (typeof this["isDuringClick"] !== "undefined");
                };

                Element.prototype.getValue = function () {
                    return this.value;
                };
                Element.prototype.setValue = function (value) {
                    this.resetValue(value);
                };
                Element.prototype.setDisplayedValue = function (value) {
                    if (this.calendar)
                        this.calendar.setDisplayedValue(value);
                };
                Element.prototype.refreshValue = function () {
                    this.resetValue();
                };
                Element.prototype.resetValue = function (value) {
                    if (this["isDuringInternalSetValue"])
                        return;
                    this["isDuringInternalSetValue"] = true;
                    this.closeDropDown();
                    var originalValue = this.value;
                    try  {
                        this.value = value != null ? value : this.settings.dateTimeParser(this.inputElement.value);
                    } catch (exc) {
                    }
                    if (this.value != null && this.value < this.settings.minValue)
                        this.value = this.settings.isNullValueAccepted ? null : this.settings.minValue;
                    if (this.settings.disabledDateSelector && this.value != null && this.settings.disabledDateSelector(this.value))
                        this.value = this.settings.isNullValueAccepted ? null : new Date();
                    var inputValue;
                    try  {
                        inputValue = this.settings.dateTimeFormatter(this.value);
                    } catch (exc) {
                        inputValue = "";
                    }
                    if (inputValue != this.inputElement.value) {
                        this.inputElement.value = inputValue;
                        if (this.isInitialized) {
                            try  {
                                var changeEvent = this.inputElement.ownerDocument.createEvent("HTMLEvents");
                                changeEvent.initEvent("change", true, true);
                                this.inputElement.dispatchEvent(changeEvent);
                            } catch (exc) {
                            }
                        }
                    }
                    if ((this.value && !originalValue) || (!this.value && originalValue) || (this.value && originalValue && this.value.valueOf() != originalValue.valueOf())) {
                        if (this.calendar) {
                            this.calendar.selectedDate = this.value;
                            this.calendar.refresh();
                        }
                        if (this.settings.valueChangeHandler)
                            this.settings.valueChangeHandler(this.value);
                    }
                    delete this["isDuringInternalSetValue"];
                };

                Element.prototype.openDropDown = function () {
                    if (!this.isOpen)
                        this.toggleDropDown();
                };
                Element.prototype.closeDropDown = function () {
                    if (this.isOpen)
                        this.toggleDropDown();
                };
                Element.prototype.toggleDropDown = function () {
                    var _this = this;
                    this.isOpen = !this.isOpen;
                    if (this.isOpen && this.value)
                        this.setDisplayedValue(this.value);

                    var updatePopupPosition = function () {
                        var inputRect = _this.inputElement.getBoundingClientRect();
                        _this.popupElement.style.position = "fixed";
                        _this.popupElement.style.zIndex = "1";
                        _this.popupElement.style.left = inputRect.left + "px";
                        _this.popupElement.style.top = (inputRect.top + inputRect.height) + "px";
                        _this.popupElement.style.display = _this.isOpen ? "block" : "none";
                        var popupClientRect = _this.popupElement.getBoundingClientRect();
                        if (popupClientRect.bottom > _this.popupElement.ownerDocument.documentElement.clientHeight && inputRect.top >= popupClientRect.height)
                            _this.popupElement.style.top = (inputRect.top - popupClientRect.height + 2) + "px";
                        if (popupClientRect.right > _this.popupElement.ownerDocument.documentElement.clientWidth && _this.popupElement.ownerDocument.documentElement.clientWidth >= popupClientRect.width)
                            _this.popupElement.style.left = (_this.popupElement.ownerDocument.documentElement.clientWidth - popupClientRect.width) + "px";
                    };
                    updatePopupPosition();
                    if (this.isOpen && this.settings.dropDownOpenedHandler)
                        this.settings.dropDownOpenedHandler();
                    else if (!this.isOpen && this.settings.dropDownClosedHandler)
                        this.settings.dropDownClosedHandler();
                    if (this.isOpen) {
                        var previousWidth = this.host.ownerDocument.documentElement.clientWidth, previousHeight = this.host.ownerDocument.documentElement.clientHeight, previousClientRect = this.host.getBoundingClientRect();
                        this["positionChangeHandlerTimer"] = setInterval(function () {
                            var width = _this.host.ownerDocument.documentElement.clientWidth, height = _this.host.ownerDocument.documentElement.clientHeight, clientRect = _this.host.getBoundingClientRect();
                            if (width != previousWidth || height != previousHeight)
                                _this.closeDropDown();
                            else if (clientRect.left != previousClientRect.left || clientRect.top != previousClientRect.top || clientRect.width != previousClientRect.width || clientRect.height != previousClientRect.height)
                                updatePopupPosition();
                            previousWidth = width;
                            previousHeight = height;
                            previousClientRect = clientRect;
                        }, 100);
                    } else {
                        if (this["positionChangeHandlerTimer"]) {
                            clearInterval(this["positionChangeHandlerTimer"]);
                            delete this["positionChangeHandlerTimer"];
                        }
                    }
                };
                Element.secondDuration = 1000;
                Element.minuteDuration = 60 * Element.secondDuration;
                Element.hourDuration = 60 * Element.minuteDuration;
                return Element;
            })();
            DatePicker.Element = Element;
        })(Controls.DatePicker || (Controls.DatePicker = {}));
        var DatePicker = Controls.DatePicker;
    })(DlhSoft.Controls || (DlhSoft.Controls = {}));
    var Controls = DlhSoft.Controls;
})(DlhSoft || (DlhSoft = {}));
