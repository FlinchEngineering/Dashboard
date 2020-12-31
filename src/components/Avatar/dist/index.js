"use strict";
exports.__esModule = true;
exports.Avatar = void 0;
var react_1 = require("react");
require("./style.scss");
exports.Avatar = function (_a) {
    var setImage = _a.setImage, img = _a.img;
    var _b = react_1.useState(null), url = _b[0], setUrl = _b[1];
    react_1.useEffect(function () {
        if (img) {
            var uri = URL.createObjectURL(img);
            setUrl(uri);
        }
    }, [img]);
    var fileRef = react_1.useRef(null);
    var onClick = function () {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };
    var onChange = function (e) {
        var files = e.target.files;
        files && setImage(files[0]);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("input", { onChange: onChange, ref: fileRef, type: 'file', className: 'img-selector' }),
        react_1["default"].createElement("div", { role: 'button', className: 'avatar', onClick: onClick },
            "+",
            url && react_1["default"].createElement("img", { src: url, alt: 'dp', className: 'dp' }))));
};
