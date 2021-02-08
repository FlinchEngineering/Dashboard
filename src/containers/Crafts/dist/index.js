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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
require("./style.scss");
var Input_1 = require("../../components/Input");
var Button_1 = require("../../components/Button");
var CraftsService_1 = require("../../services/CraftsService");
var ListItem_1 = require("../../components/ListItem");
var Crafts = function () {
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState([]), crafts = _b[0], setCrafts = _b[1];
    var _c = react_1.useState(null), craft = _c[0], setCraft = _c[1];
    var _d = react_1.useState(''), info = _d[0], setInfo = _d[1];
    react_1.useEffect(function () {
        fetchCrafts();
    }, []);
    var onDelete = function (craft) { return __awaiter(void 0, void 0, void 0, function () {
        var isDeleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, CraftsService_1["default"]
                        .deleteCraft(craft)];
                case 1:
                    isDeleted = _a.sent();
                    isDeleted && setCrafts(function (crafts) {
                        return crafts.filter(function (c) { return c !== craft; });
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var onAddChange = function (e) {
        var value = e.target.value;
        setCraft(value);
    };
    var onAddCraft = function () { return __awaiter(void 0, void 0, void 0, function () {
        var craftExists, added, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    craftExists = craft && crafts
                        .includes(craft);
                    console.log('Craft exists', craftExists);
                    _a = !craftExists &&
                        craft;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, CraftsService_1["default"]
                            .addCraft(craft)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    added = _a;
                    console.log('Craft Added', added);
                    added && craft &&
                        setCrafts(function (c) {
                            return __spreadArrays(c, [
                                craft
                            ]);
                        });
                    added
                        ? setInfo(craft + " added.")
                        : setInfo('Failed to add craft.');
                    return [2 /*return*/];
            }
        });
    }); };
    var fetchCrafts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, CraftsService_1["default"]
                            .getCrafts()];
                case 1:
                    data = _a.sent();
                    data && setCrafts(data);
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: 'craftsContainer' },
            react_1["default"].createElement("h1", { className: 'header' }, "Crafts"),
            react_1["default"].createElement("div", { className: 'inputRow' },
                react_1["default"].createElement(Input_1["default"], { placeholder: 'Add Craft', disabled: loading, onChange: onAddChange }),
                react_1["default"].createElement(Button_1["default"], { className: 'sm', title: '+ Add', disabled: loading, onClick: onAddCraft })),
            react_1["default"].createElement("p", null, info),
            loading && 'Loading...',
            react_1["default"].createElement("div", { className: 'list' }, !loading &&
                crafts.map(function (craft, i) {
                    return react_1["default"].createElement(ListItem_1["default"], { key: i, title: craft, id: i.toString(), shouldDelete: true, onDelete: function () { return onDelete(craft); } });
                })))));
};
exports["default"] = Crafts;
