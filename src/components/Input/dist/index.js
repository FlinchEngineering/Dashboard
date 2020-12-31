"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
require("./style.scss");
var CURRENCY = [
    'GHS',
    'NGN',
    '$'
];
var Input = function (_a) {
    var className = _a.className, placeholder = _a.placeholder, type = _a.type, mode = _a.mode, setCurrency = _a.setCurrency, props = __rest(_a, ["className", "placeholder", "type", "mode", "setCurrency"]);
    var onCurrencyChange = function (e) {
        setCurrency &&
            setCurrency(e.target.value);
    };
    var renderCurrency = function () {
        return react_1["default"].createElement("div", null,
            react_1["default"].createElement("select", { className: 'options', onChange: onCurrencyChange }, CURRENCY.map(function (d) { return react_1["default"].createElement("option", null, d); })));
    };
    var showCurrency = mode === 'currency'
        ? renderCurrency()
        : undefined;
    return (react_1["default"].createElement("div", { className: 'input-main-container' },
        showCurrency,
        react_1["default"].createElement("input", __assign({ className: 'input-container', placeholder: placeholder, type: type }, props))));
};
exports["default"] = Input;
