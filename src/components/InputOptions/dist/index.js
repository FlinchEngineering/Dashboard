"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./style.scss");
var InputOptions = function (_a) {
    var options = _a.options, placeholder = _a.placeholder, onChange = _a.onChange, value = _a.value;
    return (react_1["default"].createElement("select", { className: 'selectContainer', placeholder: placeholder, value: value, onChange: onChange }, options.map(function (c) {
        return react_1["default"].createElement("option", { key: c, className: 'selectOption' }, c);
    })));
};
exports["default"] = InputOptions;
