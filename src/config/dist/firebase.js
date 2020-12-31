"use strict";
exports.__esModule = true;
exports.storage = exports.db = exports.auth = exports.firebaseConfig = void 0;
var app_1 = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
exports.firebaseConfig = {
    apiKey: "AIzaSyBTGE_5_pMDsiocYexxVvpUAl4bd4mD7yc",
    authDomain: "shoutouts-3c57c.firebaseapp.com",
    databaseURL: "https://shoutouts-3c57c.firebaseio.com",
    projectId: "shoutouts-3c57c",
    storageBucket: "shoutouts-3c57c.appspot.com",
    messagingSenderId: "431061869764",
    appId: "1:431061869764:web:9f12d539f6d06145e11591",
    measurementId: "G-P8DK0KE0W0"
};
if (!app_1["default"].apps.length) {
    app_1["default"].initializeApp(exports.firebaseConfig);
}
else {
    app_1["default"].app();
}
exports.auth = app_1["default"].auth();
exports.db = app_1["default"].firestore();
exports.storage = app_1["default"].storage();
