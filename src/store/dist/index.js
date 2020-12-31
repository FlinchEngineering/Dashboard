"use strict";
var _a;
exports.__esModule = true;
exports.useSelector = exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var react_redux_1 = require("react-redux");
var modal_1 = require("./modal");
var user_1 = require("./user");
var rootReducer = toolkit_1.combineReducers((_a = {},
    _a[user_1.userSlice.name] = user_1.userSlice.reducer,
    _a[modal_1.modalSlice.name] = modal_1.modalSlice.reducer,
    _a));
exports.store = toolkit_1.configureStore({
    reducer: rootReducer
});
exports.useSelector = react_redux_1.useSelector;
