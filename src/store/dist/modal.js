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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
exports.__esModule = true;
exports.modalActions = exports.modalSlice = exports.actions = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initState = {
    body: null,
    show: false,
    header: ''
};
exports.actions = (_a = toolkit_1.createSlice({
    name: 'modal',
    initialState: initState,
    reducers: {
        showModal: function (state, _a) {
            var payload = _a.payload;
            return __assign(__assign({}, state), payload);
        },
        clearModal: function () {
            return initState;
        }
    }
}), _a).actions, exports.modalSlice = __rest(_a, ["actions"]);
exports.modalActions = __assign({}, exports.actions);
