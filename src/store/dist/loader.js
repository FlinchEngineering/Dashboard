"use strict";
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
exports.__esModule = true;
var toolkit_1 = require("@reduxjs/toolkit");
var initState = {
    body: null,
    show: false,
    header: ''
};
var _a = toolkit_1.createSlice({
    name: 'loader',
    initialState: initState,
    reducers: {
        getLoader: function () {
        }
    }
}), actions = _a.actions, loaderSlice = __rest(_a, ["actions"]);
