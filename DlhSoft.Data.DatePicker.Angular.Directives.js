// Version 1.1.0.0.
var module = angular.module("DlhSoft.Data.Directives", []);
dsDefineDDirective(module, "CalendarSelector", ["selectedTime"]);
dsDefineDDirective(module, "Calendar", ["selectedDate"]);
dsDefineDVDirective(module, "DatePicker");
function dsDefineDDirective(module, directiveName, appendedScope, isChangeHandler, controlName) {
    module.directive("ds" + directiveName, function () {
        return {
            restrict: "EAC",
            replace: true,
            transclude: true,
            scope: getScope({
                settings: "=",
                license: "="
            }, appendedScope, isChangeHandler),
            template: "<div><ng-transclude></ng-transclude></div>",
            link: function (scope, element) {
                var controlElement = element[0];
                var valueProperty = null;
                var initialization = function () {
                    var settings = scope.settings;
                    if (!settings)
                        settings = {};
                    var license = scope.license;
                    if (isChangeHandler) {
                        valueProperty = appendedScope ? (appendedScope.indexOf("value") < 0 ? appendedScope[0] : "value") : "value";
                        var changeHandler = settings.valueChangeHandler;
                        if (!changeHandler)
                            changeHandler = settings.changeHandler;
                        settings.changeHandler = settings.valueChangeHandler = function (value) {
                            if (changeHandler)
                                changeHandler(value);
                            scope[valueProperty] = value;
                            scope.$apply();
                            if (scope.change)
                                scope.change(value);
                        }
                    }
                    var text = element.text();
                    var component = DlhSoft.Controls[controlName ? controlName : directiveName].initialize.apply(this, getArguments([controlElement, settings, license], appendedScope, scope));
                    if (isChangeHandler && component.setValue)
                        component.setValue(valueProperty && scope[valueProperty] ? scope[valueProperty] : text);
                }
                initialization();
                if (valueProperty) {
                    setTimeout(function () {
                        var isWaitingToRefresh = false;
                        scope.$watch(valueProperty, function (nv, ov) {
                            if (isWaitingToRefresh)
                                return;
                            isWaitingToRefresh = true;
                            setTimeout(function () {
                                initialization();
                                isWaitingToRefresh = false;
                            });
                        });
                    }, 0);
                }
            }
        };
    });
}
function dsDefineDVDirective(module, directiveName, appendedScope, controlName) {
    dsDefineDDirective(module, directiveName, combineScopes(["value"], appendedScope), true, controlName);
}
function combineScopes(scope, appendedScope) {
    if (appendedScope) {
        for (var i = 0; i < appendedScope.length; i++)
            scope.push(appendedScope[i]);
    }
    return scope;
}
function getScope(scope, appendedScope, isChangeHandler) {
    if (appendedScope) {
        for (var i = 0; i < appendedScope.length; i++)
            scope[appendedScope[i]] = "=";
    }
    else if (isChangeHandler)
        scope["value"] = "=";
    if (isChangeHandler)
        scope["change"] = "=";
    return scope;
}
function getArguments(arguments, appendedScope, scope, injectionIndex) {
    if (typeof injectionIndex === "undefined")
        injectionIndex = 0;
    if (appendedScope) {
        for (var i = 0; i < appendedScope.length; i++)
            arguments.splice(i + injectionIndex + 1, 0, scope[appendedScope[i]]);
    }
    return arguments;
}
