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
var IconButton_1 = require("../IconButton");
require("./style.scss");
var uuid_1 = require("uuid");
var Link_1 = require("../Link");
var UploadModal_1 = require("../UploadModal");
var ListItem = function (_a) {
    var title = _a.title, shouldDelete = _a.shouldDelete, edit = _a.edit, data = _a.data, showData = _a.showData, onDelete = _a.onDelete;
    var _b = react_1.useState(false), deleteLoader = _b[0], setDeleteLoader = _b[1];
    var _c = react_1.useState(false), view = _c[0], setView = _c[1];
    var _d = react_1.useState(false), editting = _d[0], setEditting = _d[1];
    var _e = react_1.useState(false), showModal = _e[0], setShowModal = _e[1];
    // const [info, setInfo] = useState('')
    var _f = react_1.useState(null), files = _f[0], setFiles = _f[1];
    var uploadFileRef = react_1.useRef(null);
    var clicked = view ? 'active' : '';
    var samples = (data || {
        samples: null
    }).samples;
    var onView = function () {
        setView(!view);
    };
    var onEditting = function () {
        setView(true);
        setEditting(!editting);
    };
    var onAddSample = function () {
        setShowModal(true);
    };
    var onUpload = function () {
        uploadFileRef.current &&
            uploadFileRef.current.click();
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
    var reset = function () {
        var dt = new DataTransfer();
        setFiles(null);
        if (uploadFileRef.current) {
            uploadFileRef.current.files = dt.files;
        }
    };
    var removeVid = function (name) {
        console.log(name);
        setFiles(function (s) {
            var samps = s === null || s === void 0 ? void 0 : s.filter(function (d) { return d.name !== name; });
            return samps || [];
        });
        if (uploadFileRef.current) {
            var dt_1 = new DataTransfer();
            var files_1 = uploadFileRef.current.files;
            var list = files_1 && Array.from(files_1);
            list === null || list === void 0 ? void 0 : list.forEach(function (item) {
                if (item.name !== name)
                    dt_1.items.add(item);
            });
            uploadFileRef.current.files = dt_1.files;
        }
    };
    var closeModal = function () {
        setShowModal(false);
        reset();
    };
    var validateFiles = function (files) {
        var list = files && Array.from(files);
        list = list.filter(function (v) {
            if (v.type.indexOf('video') > -1) {
                return true;
            }
            // setInfo('Only videos are allowed')
            return false;
        });
        return list;
    };
    var addSample = function (e) {
        var files = e.target.files;
        var list = files && validateFiles(files);
        console.log(list);
        if (list && (list === null || list === void 0 ? void 0 : list.length) > 0) {
            setFiles(function (s) {
                if (!s) {
                    return __spreadArrays(list);
                }
                else
                    return (__spreadArrays(s, list));
            });
        }
    };
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
            var val = k === 'price'
                ? "" + v.currency + v.amount
                : v;
            return react_1["default"].createElement("div", { className: 'dataItem', key: uuid_1.v4() },
                react_1["default"].createElement("h4", null, k),
                !isImage &&
                    !isSamples &&
                    react_1["default"].createElement("p", null, val),
                isImage &&
                    !isSamples &&
                    react_1["default"].createElement("img", { className: 'celebDp', src: val, height: 50, width: 50, alt: data === null || data === void 0 ? void 0 : data.alias }),
                isSamples &&
                    react_1["default"].createElement("div", { className: 'samplesContainer' }, samples === null || samples === void 0 ? void 0 :
                        samples.map(function (sample) { return (react_1["default"].createElement("div", { key: uuid_1.v4() },
                            react_1["default"].createElement("span", { className: 'vidContainer' },
                                react_1["default"].createElement("img", { className: 'vidImg', alt: sample.uri, src: sample.thumbnail })))); }),
                        isSamples &&
                            react_1["default"].createElement(Link_1["default"], { onClick: onAddSample }, "+Add Sample")));
        }));
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "listContainer " + clicked, role: 'button', onClick: onView },
            react_1["default"].createElement("div", { className: 'listTitle' }, title),
            react_1["default"].createElement("div", { className: 'btns' },
                edit && react_1["default"].createElement(IconButton_1["default"], { onClick: onEditting, className: 'info', icon: react_1["default"].createElement("i", { className: "fas fa-pencil-alt" }) }),
                shouldDelete && react_1["default"].createElement(IconButton_1["default"], { onClick: remove, loading: deleteLoader, className: 'danger', icon: react_1["default"].createElement("i", { className: "far fa-trash-alt" }) }))),
        showData && view && react_1["default"].createElement("div", { className: 'dataInfo' }, renderData()),
        react_1["default"].createElement(UploadModal_1["default"], { celebId: (data === null || data === void 0 ? void 0 : data.id) || '', currentSamps: samples && samples, show: showModal, files: files, addSample: addSample, close: closeModal, onUpload: onUpload, removeVid: removeVid, title: 'Add Sample', uploadFileRef: uploadFileRef })));
};
exports["default"] = ListItem;
