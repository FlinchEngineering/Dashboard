"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
require("./style.scss");
var logo_lg_png_1 = require("../../assets/logo-lg.png");
var Button_1 = require("../Button");
var react_redux_1 = require("react-redux");
var user_1 = require("../../store/user");
var Link_1 = require("../Link");
var react_router_dom_1 = require("react-router-dom");
var useUser_1 = require("../../hooks/useUser");
var Navbar = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState(true), show = _a[0], setShow = _a[1];
    var pathname = react_router_dom_1.useLocation().pathname;
    var _b = react_router_dom_1.useHistory(), push = _b.push, replace = _b.replace;
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
    var add = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            push('dash');
            return [2 /*return*/];
        });
    }); };
    var onLogout = function () {
        dispatch(user_1.userActions.logout());
    };
    var onViewCelebs = function () {
        push('celebs');
    };
    var onLogoClicked = function () {
        push('/');
    };
    var onViewCrafts = function () {
        push('/crafts');
    };
    if (!show)
        return null;
    return (react_1["default"].createElement("div", { className: 'nav-container' },
        react_1["default"].createElement("div", { className: 'content' },
            react_1["default"].createElement("div", { role: 'link', onClick: onLogoClicked },
                react_1["default"].createElement("img", { className: 'logo', alt: 'logo', src: logo_lg_png_1["default"] })),
            react_1["default"].createElement("div", { className: 'right' },
                react_1["default"].createElement(Link_1["default"], { white: true, onClick: add }, "Add Celebrity"),
                react_1["default"].createElement(Link_1["default"], { white: true, onClick: onViewCrafts }, "Crafts"),
                react_1["default"].createElement(Link_1["default"], { white: true, onClick: onViewCelebs }, "Celebrities"),
                react_1["default"].createElement(Button_1["default"], { invert: true, title: 'Logout', onClick: onLogout })))));
};
exports["default"] = Navbar;
