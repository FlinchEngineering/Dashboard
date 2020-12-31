"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./style.scss");
var FormBar = function (_a) {
    var options = _a.options, setActive = _a.setActive;
    return (react_1["default"].createElement("div", { className: 'formBarContainer' },
        react_1["default"].createElement("span", { role: 'button', className: 'active' }, "Details"),
        react_1["default"].createElement("span", { role: 'button' }, "Upload Sample")));
};
exports["default"] = FormBar;
