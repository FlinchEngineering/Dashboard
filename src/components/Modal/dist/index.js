"use strict";
exports.__esModule = true;
var react_1 = require("react");
var useModal_1 = require("../../hooks/useModal");
require("./style.scss");
var Modal = function () {
    var _a = useModal_1.useModal(), body = _a.body, header = _a.header, show = _a.show;
    return show
        ? react_1["default"].createElement("div", { className: 'modal-container' },
            react_1["default"].createElement("div", { className: 'modal' },
                react_1["default"].createElement("h3", null, header),
                react_1["default"].createElement("div", { className: 'body' }, body)))
        : null;
};
exports["default"] = Modal;
