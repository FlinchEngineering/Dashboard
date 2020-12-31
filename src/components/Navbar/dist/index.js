"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./style.scss");
var flinchLogo_png_1 = require("../../assets/flinchLogo.png");
var Button_1 = require("../Button");
var react_redux_1 = require("react-redux");
var user_1 = require("../../store/user");
var Navbar = function (_a) {
    var showDash = _a.showDash;
    var dispatch = react_redux_1.useDispatch();
    var onLogout = function () {
        dispatch(user_1.userActions.clear());
        showDash && showDash(false);
    };
    return (react_1["default"].createElement("div", { className: 'nav-container' },
        react_1["default"].createElement("div", { className: 'offset' }),
        react_1["default"].createElement("div", { className: 'content' },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("img", { className: 'logo', alt: 'logo', src: flinchLogo_png_1["default"] })),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(Button_1["default"], { invert: true, title: 'Logout', onClick: onLogout }))),
        react_1["default"].createElement("div", { className: 'offset' })));
};
exports["default"] = Navbar;
