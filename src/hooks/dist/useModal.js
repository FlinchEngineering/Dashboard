"use strict";
exports.__esModule = true;
exports.useModal = void 0;
var store_1 = require("../store");
exports.useModal = function () { return store_1.useSelector(function (state) { return state.modal; }); };
