"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./style.scss");
var react_loader_spinner_1 = require("react-loader-spinner");
var theme_1 = require("../../config/theme");
var IconButton = function (_a) {
    var icon = _a.icon, className = _a.className, onClick = _a.onClick, loading = _a.loading;
    return (react_1["default"].createElement("div", { className: "iconBtnContainer " + (className || ''), onClick: onClick && onClick, role: 'button' },
        react_1["default"].createElement(react_1["default"].Fragment, null, !loading
            ? react_1["default"].createElement("span", null, icon)
            : react_1["default"].createElement(react_loader_spinner_1["default"], { type: 'Circles', className: 'loader', color: theme_1.COLORS.iconGrey, height: 15, width: 15 }))));
};
exports["default"] = IconButton;
