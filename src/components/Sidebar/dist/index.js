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
var react_router_dom_1 = require("react-router-dom");
var style_module_scss_1 = require("./style.module.scss");
var flinchLogo_png_1 = require("../../assets/flinchLogo.png");
var Link_1 = require("../Link");
var react_redux_1 = require("react-redux");
var user_1 = require("../../store/user");
var Button_1 = require("../Button");
var IconButton_1 = require("../IconButton");
var react_1 = require("react");
var Sidebar = function (_a) {
    var show = _a.show, setShow = _a.setShow;
    var dispatch = react_redux_1.useDispatch();
    var push = react_router_dom_1.useHistory().push;
    var pathname = react_router_dom_1.useLocation().pathname;
    react_1.useEffect(function () {
        if (pathname.indexOf('login') > -1) {
            setShow(false);
        }
    }, [pathname, setShow]);
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
    var onClose = function () {
        setShow(false);
    };
    if (!show)
        return null;
    return (React.createElement("div", { className: style_module_scss_1["default"]['container'] },
        React.createElement(IconButton_1["default"], { onClick: onClose, className: style_module_scss_1["default"].close, icon: React.createElement("i", { className: "fas fa-times" }) }),
        React.createElement("div", { onClick: onLogoClicked, className: style_module_scss_1["default"]['logoContainer'] },
            React.createElement("img", { className: style_module_scss_1["default"]['logo'], src: flinchLogo_png_1["default"], alt: 'logo' })),
        React.createElement("div", { className: style_module_scss_1["default"]['menuContainer'] },
            React.createElement("div", { className: style_module_scss_1["default"]['menuItems'] },
                React.createElement(Link_1["default"], { onClick: add }, "Add Celebrity"),
                React.createElement(Link_1["default"], { onClick: onViewCrafts }, "Crafts"),
                React.createElement(Link_1["default"], { onClick: onViewCelebs }, "Celebrities")),
            React.createElement(Button_1["default"], { title: 'Logout', onClick: onLogout }))));
};
exports["default"] = Sidebar;
