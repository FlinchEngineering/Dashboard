"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./style.scss");
var logo_lg_png_1 = require("../../assets/logo-lg.png");
var react_router_dom_1 = require("react-router-dom");
var useUser_1 = require("../../hooks/useUser");
var IconButton_1 = require("../IconButton");
var Navbar = function (_a) {
    var showSidebar = _a.showSidebar, setSidebar = _a.setSidebar;
    var _b = react_1.useState(true), show = _b[0], setShow = _b[1];
    var pathname = react_router_dom_1.useLocation().pathname;
    var _c = react_router_dom_1.useHistory(), push = _c.push, replace = _c.replace;
    var uid = useUser_1.useUser().uid;
    var hasUser = !!uid;
    var isAuth = pathname.includes('login');
    react_1.useEffect(function () {
        isAuth
            ? setShow(false)
            : setShow(true);
    }, [setShow, isAuth]);
    react_1.useEffect(function () {
        console.log('hasUser', hasUser);
        !hasUser && replace('login');
    }, [hasUser, replace]);
    var onLogoClicked = function () {
        push('/');
    };
    var openSidebar = function () {
        setSidebar(true);
    };
    var closeSidebar = function () {
        setSidebar(false);
    };
    if (!show)
        return null;
    return (react_1["default"].createElement("div", { className: 'nav-container' },
        react_1["default"].createElement("div", { className: 'content' },
            react_1["default"].createElement("div", { role: 'link', onClick: onLogoClicked },
                react_1["default"].createElement("img", { className: 'logo', alt: 'logo', src: logo_lg_png_1["default"] })),
            !showSidebar && react_1["default"].createElement(IconButton_1["default"], { onClick: openSidebar, className: 'hamburger', icon: react_1["default"].createElement("i", { className: "fas fa-bars" }) }))));
};
exports["default"] = Navbar;
