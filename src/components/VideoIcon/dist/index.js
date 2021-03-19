"use strict";
exports.__esModule = true;
var react_1 = require("react");
var close_png_1 = require("../../assets/close.png");
var movie_png_1 = require("../../assets/movie.png");
require("./style.scss");
var VideoIcon = function (_a) {
    var sample = _a.sample, removeVideo = _a.removeVideo;
    return (react_1["default"].createElement("div", { className: 'video' },
        react_1["default"].createElement("span", { onClick: function () { return removeVideo &&
                removeVideo(sample.name); }, className: 'close', role: 'button' },
            react_1["default"].createElement("img", { src: close_png_1["default"], alt: 'close' })),
        react_1["default"].createElement("img", { className: 'vidIcon', src: movie_png_1["default"], alt: 'video icon' }),
        react_1["default"].createElement("p", null, sample.name)));
};
exports["default"] = VideoIcon;
