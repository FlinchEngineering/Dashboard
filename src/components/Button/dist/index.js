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
var react_loader_spinner_1 = require("react-loader-spinner");
var theme_1 = require("../../config/theme");
require("./style.scss");
var Button = function (_a) {
    var title = _a.title, children = _a.children, invert = _a.invert, className = _a.className, loading = _a.loading, props = __rest(_a, ["title", "children", "invert", "className", "loading"]);
    var styleName = invert
        ? 'btn-invert'
        : 'btn-container';
    return (react_1["default"].createElement("button", __assign({}, props, { disabled: loading, title: title, className: styleName + " " + className }), loading
        ? react_1["default"].createElement(react_loader_spinner_1["default"], { className: 'loader', type: 'Oval', color: theme_1.COLORS.white })
        : title || children));
};
exports["default"] = Button;
