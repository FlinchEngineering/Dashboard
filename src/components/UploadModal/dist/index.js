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
var uuid_1 = require("uuid");
require("./style.scss");
var close_png_1 = require("../../assets/close.png");
var VideoIcon_1 = require("../VideoIcon");
var Button_1 = require("../Button");
var Link_1 = require("../Link");
var CelebsService_1 = require("../../services/CelebsService");
var UploadModal = function (_a) {
    var celebId = _a.celebId, show = _a.show, title = _a.title, files = _a.files, uploadFileRef = _a.uploadFileRef, currentSamps = _a.currentSamps, addSample = _a.addSample, removeVid = _a.removeVid, onUpload = _a.onUpload, close = _a.close;
    var _b = react_1.useState(''), info = _b[0], setInfo = _b[1];
    var _c = react_1.useState(false), submitting = _c[0], setSubmitting = _c[1];
    react_1.useEffect(function () {
        if (show) {
            document.body.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'scroll';
        }
    }, [show]);
    var hasFiles = files && (files.length > 0);
    var onSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var samples, _a, hasRes, val;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setSubmitting(true);
                    console.log('Submitting files');
                    setInfo('Submitting samples');
                    _a = files;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, CelebsService_1["default"]
                            .generateCelebSamples(files)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    samples = _a;
                    console.log('Updating Samples');
                    setInfo('Updating Celeb Samples');
                    hasRes = samples && samples.length > 0;
                    if (!(samples && hasRes)) return [3 /*break*/, 4];
                    val = currentSamps
                        ? __spreadArrays(samples, currentSamps) : samples || [];
                    console.log('Values:: ', val);
                    return [4 /*yield*/, CelebsService_1["default"]
                            .updateCeleb({
                            id: celebId,
                            samples: val
                        })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    console.log('Samples Updated');
                    setInfo('Samples updated');
                    setSubmitting(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return show
        ? react_1["default"].createElement("div", { className: 'modal-container' },
            react_1["default"].createElement("div", { className: 'modal' },
                react_1["default"].createElement("span", { onClick: close, className: 'modalClose' },
                    react_1["default"].createElement("img", { src: close_png_1["default"], alt: 'close' })),
                react_1["default"].createElement("h3", null, title),
                react_1["default"].createElement("div", { className: 'body' },
                    react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("input", { ref: uploadFileRef, type: 'file', onChange: addSample, className: 'uploadFileInput' }),
                        hasFiles
                            ? react_1["default"].createElement("div", { className: 'samplesUploadContainer' },
                                react_1["default"].createElement("div", { className: 'samples' }, files === null || files === void 0 ? void 0 : files.map(function (samp) {
                                    return react_1["default"].createElement(VideoIcon_1["default"], { sample: samp, key: uuid_1.v4(), removeVideo: removeVid });
                                })),
                                react_1["default"].createElement(Link_1["default"], { className: 'addSample', onClick: onUpload }, "+"))
                            : react_1["default"].createElement("div", { className: 'uploadSamps' },
                                react_1["default"].createElement(Button_1["default"], { title: 'Upload Sample', onClick: onUpload })))),
                hasFiles &&
                    react_1["default"].createElement("div", { className: 'footer' },
                        react_1["default"].createElement(Button_1["default"], { onClick: onSubmit, loading: submitting, title: 'Submit' }),
                        react_1["default"].createElement("span", null, info))))
        : null;
};
exports["default"] = UploadModal;
