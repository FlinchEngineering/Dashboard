"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_redux_1 = require("react-redux");
var modal_1 = require("../../store/modal");
var Link_1 = require("../../components/Link");
var Avatar_1 = require("../../components/Avatar");
var Input_1 = require("../../components/Input");
var Button_1 = require("../../components/Button");
var TextArea_1 = require("../../components/TextArea");
var CelebsService_1 = require("../../services/CelebsService");
var CraftsService_1 = require("../../services/CraftsService");
var InputOptions_1 = require("../../components/InputOptions");
var VideoIcon_1 = require("../../components/VideoIcon");
var CLEAR_INTERVAL = 25000;
var INIT_FORM = {
    alias: '',
    craft: '',
    price: {
        currency: 'GHS',
        amount: 0
    },
    popularity: 3,
    bio: '',
    email: ''
};
function Home() {
    var _this = this;
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState(false), submitting = _a[0], setSubmitting = _a[1];
    var _b = react_1.useState(null), image = _b[0], setImage = _b[1];
    var _c = react_1.useState([]), crafts = _c[0], setCrafts = _c[1];
    var _d = react_1.useState(INIT_FORM), form = _d[0], setForm = _d[1];
    var _e = react_1.useState('GHS'), currency = _e[0], setCurrency = _e[1];
    var _f = react_1.useState(''), info = _f[0], setInfo = _f[1];
    var sampleRef = react_1.useRef(null);
    var _g = react_1.useState(null), samples = _g[0], setSamples = _g[1];
    var hasSamples = samples && (samples === null || samples === void 0 ? void 0 : samples.length) > 0;
    react_1.useEffect(function () {
        var timer = !!info && window.setTimeout(function () {
            setInfo('');
        }, CLEAR_INTERVAL);
        return function () {
            timer &&
                clearTimeout(timer);
        };
    }, [info]);
    react_1.useEffect(function () {
        !!info && dispatch(modal_1.modalActions.showModal({
            body: info,
            header: '',
            show: true
        }));
    }, [info, dispatch]);
    react_1.useEffect(function () {
        fetchCrafts();
    }, []);
    var onChange = function (key, val) {
        if (key === 'price') {
            return setForm(function (form) {
                var _a;
                return (__assign(__assign({}, form), (_a = {}, _a[key] = __assign(__assign({}, form[key]), {
                    amount: val,
                    currency: currency
                }), _a)));
            });
        }
        setForm(function (form) {
            var _a;
            return (__assign(__assign({}, form), (_a = {}, _a[key] = val, _a)));
        });
    };
    var onCreate = function () { return __awaiter(_this, void 0, void 0, function () {
        var isValid, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setSubmitting(true);
                    dispatch(modal_1.modalActions.showModal({
                        body: 'Creating Celebrity...',
                        header: 'Creating',
                        show: true
                    }));
                    console.log('IMAGE: ', image);
                    if (!!!image) {
                        setSubmitting(false);
                        return [2 /*return*/, setInfo("Please upload an image. Click on the avatar above.")];
                    }
                    console.log(form);
                    isValid = validateInputs();
                    console.log(isValid);
                    if (!isValid) return [3 /*break*/, 3];
                    _a = image;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, CelebsService_1["default"]
                            .createCeleb(__assign(__assign(__assign({}, INIT_FORM), form), { image: image }), samples || undefined)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    res = _a;
                    if (res) {
                        setInfo('User Created.');
                        setForm(INIT_FORM);
                        setSamples(null);
                        setImage(null);
                    }
                    else {
                        setInfo('Failed to create User.');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setInfo('Please make sure you have entered the right details');
                    _b.label = 4;
                case 4:
                    setSubmitting(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var fetchCrafts = function () { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, CraftsService_1["default"]
                        .getCrafts()];
                case 1:
                    data = _a.sent();
                    data && setCrafts(data);
                    return [2 /*return*/];
            }
        });
    }); };
    var removeVideo = function (name) {
        setSamples(function (s) {
            var samps = s === null || s === void 0 ? void 0 : s.filter(function (d) { return d.name !== name; });
            return samps || [];
        });
    };
    var validateInputs = function () {
        var data = Object.values(form);
        var msgs = data.filter(function (d) { return !!!d; });
        return msgs.length < 6;
    };
    var getVal = function (key) {
        var _a;
        if (key === 'price') {
            return (_a = form[key]) === null || _a === void 0 ? void 0 : _a.amount;
        }
        else if (key === 'image' || key === 'samples') {
            return '';
        }
        else
            return form[key];
    };
    var getCurrency = function (val) {
        setCurrency(val);
        setForm(function (d) { return (__assign(__assign({}, d), { price: __assign(__assign({}, d.price), { currency: val }) })); });
    };
    var uploadSamples = function () {
        sampleRef.current &&
            sampleRef.current.click();
    };
    var validateFiles = function (files) {
        var list = files && Array.from(files);
        list = list.filter(function (v) {
            if (v.type.indexOf('video') > -1) {
                return true;
            }
            setInfo('Only videos are allowed');
            return false;
        });
        return list;
    };
    var addSample = function (e) {
        var files = e.target.files;
        var list = files && validateFiles(files);
        if (list && (list === null || list === void 0 ? void 0 : list.length) > 0) {
            setSamples(function (s) {
                if (!s) {
                    return __spreadArrays(list);
                }
                else
                    return (__spreadArrays(s, list));
            });
        }
    };
    var renderSamples = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: 'samples' }, samples && samples.map(function (sample, i) {
                return react_1["default"].createElement(VideoIcon_1["default"], { sample: sample, removeVideo: function () {
                        return removeVideo(sample.name);
                    }, key: i });
            })),
            react_1["default"].createElement(Link_1["default"], { className: 'add', onClick: uploadSamples }, "+")));
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: 'home-container' },
            react_1["default"].createElement("div", { className: 'offset' }),
            react_1["default"].createElement("div", { className: 'content' },
                react_1["default"].createElement("h1", null, "Create Celebrity"),
                react_1["default"].createElement(Avatar_1["default"], { setImage: setImage, img: image }),
                react_1["default"].createElement("div", { className: 'inputs' },
                    react_1["default"].createElement(Input_1["default"], { placeholder: 'Alias', onChange: function (_a) {
                            var target = _a.target;
                            return onChange('alias', target.value);
                        }, value: getVal('alias') }),
                    react_1["default"].createElement(Input_1["default"], { placeholder: 'Email', value: getVal('email'), onChange: function (_a) {
                            var target = _a.target;
                            return onChange('email', target.value);
                        } }),
                    react_1["default"].createElement(InputOptions_1["default"], { placeholder: 'Craft', options: crafts, value: getVal('craft'), onChange: function (_a) {
                            var target = _a.target;
                            return onChange('craft', target.value);
                        } }),
                    react_1["default"].createElement(Input_1["default"], { placeholder: 'Price', onChange: function (_a) {
                            var target = _a.target;
                            return onChange('price', target.value);
                        }, value: getVal('price'), type: 'number', mode: 'currency', setCurrency: getCurrency }),
                    react_1["default"].createElement(Input_1["default"], { placeholder: 'Popularity', onChange: function (_a) {
                            var target = _a.target;
                            return onChange('popularity', target.value);
                        }, type: 'number', value: getVal('popularity'), max: 5, min: 1 }),
                    react_1["default"].createElement(TextArea_1.TextArea, { placeholder: 'Bio', onChange: function (_a) {
                            var target = _a.target;
                            return onChange('bio', target.value);
                        }, value: getVal('bio') }),
                    react_1["default"].createElement("div", { className: 'extra' },
                        react_1["default"].createElement("input", { onChange: addSample, className: 'sample', ref: sampleRef, type: 'file' }),
                        hasSamples
                            ? renderSamples()
                            : react_1["default"].createElement(Link_1["default"], { onClick: uploadSamples }, "+ Upload video Sample(s)")),
                    react_1["default"].createElement(Button_1["default"], { title: 'Create', onClick: onCreate, disabled: submitting }),
                    react_1["default"].createElement("br", null))),
            react_1["default"].createElement("div", { className: 'offset' }))));
}
exports["default"] = Home;
