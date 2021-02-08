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
exports.__esModule = true;
var firebase_1 = require("../config/firebase");
var AuthService_1 = require("./AuthService");
var FormService_1 = require("./FormService");
var UtilService_1 = require("./UtilService");
var lodash_1 = require("lodash");
var CelebsService = /** @class */ (function () {
    function CelebsService() {
    }
    CelebsService.createCeleb = function (data, videos) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, batch, pass, res, _b, uid, url, _c, samples, _d, celebDocRef, userDocRef, celebData, userData, e_1, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        userId = null;
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 10, , 13]);
                        batch = firebase_1.db.batch();
                        console.log('Creating User');
                        pass = UtilService_1["default"].generatePassword();
                        _b = data.email;
                        if (!_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, AuthService_1["default"]
                                .createUser(data.email, pass)];
                    case 2:
                        _b = (_f.sent());
                        _f.label = 3;
                    case 3:
                        res = _b;
                        if (!res) return [3 /*break*/, 9];
                        uid = res.uid;
                        userId = uid;
                        console.log('Uploading Celeb image');
                        _c = data.image;
                        if (!_c) return [3 /*break*/, 5];
                        return [4 /*yield*/, FormService_1["default"]
                                .uploadImage('celebs/', data.image)];
                    case 4:
                        _c = (_f.sent());
                        _f.label = 5;
                    case 5:
                        url = _c;
                        console.log('image url:: ', url);
                        console.log('Uploading Video Samples');
                        _d = videos;
                        if (!_d) return [3 /*break*/, 7];
                        return [4 /*yield*/, this
                                .generateCelebSamples(videos)];
                    case 6:
                        _d = (_f.sent());
                        _f.label = 7;
                    case 7:
                        samples = _d;
                        console.log('Video Samples generated', samples);
                        if (!url) return [3 /*break*/, 9];
                        celebDocRef = this.CelebsRef.doc();
                        userDocRef = this.UserRef.doc(uid);
                        celebData = __assign(__assign({}, lodash_1["default"].omit(data, 'image')), { imageUrl: url, samples: (samples && samples) || [], price: __assign({ amount: Number((_a = data.price) === null || _a === void 0 ? void 0 : _a.amount) || 0, currency: 'GHS' }, data.price) });
                        userData = {
                            displayName: data.alias || '',
                            email: data.email || '',
                            imageUrl: url,
                            token: '',
                            celebrity: {
                                isCeleb: true,
                                id: celebDocRef.id
                            }
                        };
                        batch.set(celebDocRef, celebData);
                        batch.set(userDocRef, userData);
                        return [4 /*yield*/, batch.commit()];
                    case 8:
                        _f.sent();
                        console.log('Celeb created.');
                        return [2 /*return*/, true];
                    case 9: return [2 /*return*/, false];
                    case 10:
                        e_1 = _f.sent();
                        console.log(e_1.message);
                        console.log('User creation failed');
                        _e = userId;
                        if (!_e) return [3 /*break*/, 12];
                        return [4 /*yield*/, AuthService_1["default"].deleteUser(userId)];
                    case 11:
                        _e = (_f.sent());
                        _f.label = 12;
                    case 12:
                        _e;
                        return [2 /*return*/, false];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    CelebsService.generateCelebSamples = function (videos) {
        return __awaiter(this, void 0, Promise, function () {
            var promise, _a, e_2;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        promise = videos.map(function (v) { return __awaiter(_this, void 0, void 0, function () {
                            var thumbUri, videoUri;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, FormService_1["default"]
                                            .generateAndUploadThumbnail('samplesThumb', v)];
                                    case 1:
                                        thumbUri = _a.sent();
                                        return [4 /*yield*/, FormService_1["default"]
                                                .uploadVideo('samples', v)];
                                    case 2:
                                        videoUri = _a.sent();
                                        return [2 /*return*/, {
                                                uri: videoUri || '',
                                                thumbnail: thumbUri || ''
                                            }];
                                }
                            });
                        }); });
                        _a = promise;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(promise)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2: return [2 /*return*/, _a];
                    case 3:
                        e_2 = _b.sent();
                        console.log(e_2.message);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CelebsService.getAllCelebs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.CelebsRef
                                .orderBy('alias', 'desc')
                                .get()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.docs.map(function (d) { return (__assign({ id: d.id }, d.data())); })];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CelebsService.deleteCeleb = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.CelebsRef
                                .doc(id)["delete"]()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_4 = _a.sent();
                        alert(e_4.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CelebsService.deleteCelebUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted, e_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleted = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, firebase_1.db.runTransaction(function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                                var celebDocRef, user, userDocRef, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            celebDocRef = this.CelebsRef
                                                .doc(id);
                                            return [4 /*yield*/, this.getUserByCelebId(id)];
                                        case 1:
                                            user = _b.sent();
                                            userDocRef = user && this.UserRef
                                                .doc(user.id);
                                            _a = user;
                                            if (!_a) return [3 /*break*/, 3];
                                            return [4 /*yield*/, AuthService_1["default"]
                                                    .deleteUser(user.id || '')];
                                        case 2:
                                            _a = (_b.sent());
                                            _b.label = 3;
                                        case 3:
                                            deleted = _a;
                                            if (deleted) {
                                                transaction["delete"](celebDocRef);
                                                userDocRef && transaction["delete"](userDocRef);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, !!deleted];
                    case 3:
                        e_5 = _a.sent();
                        alert(e_5);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CelebsService.getUserByCelebId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.UserRef
                                .where('celebrity.id', '==', id)
                                .get()];
                    case 1:
                        data = _a.sent();
                        res = data.docs[0];
                        return [2 /*return*/, __assign({ id: res.id }, res.data())];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CelebsService.CelebsRef = firebase_1.db.collection('celebs');
    CelebsService.UserRef = firebase_1.db.collection('users');
    return CelebsService;
}());
exports["default"] = CelebsService;
