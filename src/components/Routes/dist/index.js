"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Celebs_1 = require("../../containers/Celebs");
var Crafts_1 = require("../../containers/Crafts");
var Home_1 = require("../../containers/Home");
var Login_1 = require("../../containers/Login");
var useUser_1 = require("../../hooks/useUser");
var Routes = function (_a) {
    var children = _a.children;
    var user = useUser_1.useUser();
    var PrivateRoute = function (_a) {
        var children = _a.children;
        if (!!user.uid)
            return react_1["default"].createElement(react_1["default"].Fragment, null, children);
        return null;
    };
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        children,
        react_1["default"].createElement(react_router_dom_1.Switch, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", component: Login_1["default"] }),
            react_1["default"].createElement(PrivateRoute, null,
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Home_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dash", component: Home_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/celebs", component: Celebs_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/crafts", component: Crafts_1["default"] })),
            react_1["default"].createElement(react_router_dom_1.Redirect, { to: '/login' }))));
};
exports["default"] = Routes;
