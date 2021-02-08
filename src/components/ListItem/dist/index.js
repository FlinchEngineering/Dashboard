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
var IconButton_1 = require("../IconButton");
require("./style.scss");
var uuid_1 = require("uuid");
var ListItem = function (_a) {
    var title = _a.title, shouldDelete = _a.shouldDelete, edit = _a.edit, data = _a.data, showData = _a.showData, onDelete = _a.onDelete;
    var _b = react_1.useState(false), deleteLoader = _b[0], setDeleteLoader = _b[1];
    var _c = react_1.useState(false), view = _c[0], setView = _c[1];
    var _d = react_1.useState(false), editting = _d[0], setEditting = _d[1];
    var samples = (data || {
        samples: null
    }).samples;
    var onView = function () {
        setView(true);
    };
    var onEditting = function () {
        setView(true);
        setEditting(!editting);
    };
    var remove = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setDeleteLoader(true);
                    _a = onDelete;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, onDelete()];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    _a;
                    setDeleteLoader(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var renderData = function () {
        var keys = data && Object
            .keys(data)
            .sort();
        return react_1["default"].createElement(react_1["default"].Fragment, null, keys === null || keys === void 0 ? void 0 : keys.map(function (k) {
            var v = data && data[k];
            if (k === 'id' ||
                k === 'image' ||
                k === 'token' ||
                k === 'alias' ||
                !!!v)
                return null;
            var isImage = k === 'imageUrl';
            var isSamples = k === 'samples';
            var hasSamples = samples && (samples === null || samples === void 0 ? void 0 : samples.length) > 0;
            var val = k === 'price'
                ? "" + v.currency + v.amount
                : v;
            return react_1["default"].createElement("div", { className: 'dataItem', key: uuid_1.v4() },
                !isSamples && react_1["default"].createElement("h4", null, k),
                isSamples && hasSamples && react_1["default"].createElement("h4", null, k),
                !isImage &&
                    !isSamples &&
                    react_1["default"].createElement("p", null, val),
                isImage &&
                    !isSamples &&
                    react_1["default"].createElement("img", { className: 'celebDp', src: val, height: 50, width: 50, alt: data === null || data === void 0 ? void 0 : data.alias }),
                isSamples &&
                    hasSamples &&
                    react_1["default"].createElement("div", null, samples === null || samples === void 0 ? void 0 : samples.map(function (sample) { return (react_1["default"].createElement("div", { key: uuid_1.v4() },
                        react_1["default"].createElement("span", { className: 'vidContainer' },
                            react_1["default"].createElement("img", { className: 'vidImg', alt: sample.uri, src: sample.thumbnail })))); })));
        }));
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: 'listContainer', role: 'button' },
            react_1["default"].createElement("div", { onClick: onView, className: 'listTitle' }, title),
            react_1["default"].createElement("div", { className: 'btns' },
                edit && react_1["default"].createElement(IconButton_1["default"], { onClick: onEditting, className: 'info', icon: react_1["default"].createElement("i", { className: "fas fa-pencil-alt" }) }),
                shouldDelete && react_1["default"].createElement(IconButton_1["default"], { onClick: remove, loading: deleteLoader, className: 'danger', icon: react_1["default"].createElement("i", { className: "far fa-trash-alt" }) }))),
        showData && view && react_1["default"].createElement("div", { className: 'dataInfo' }, renderData())));
};
exports["default"] = ListItem;
