"use strict";
exports.__esModule = true;
var react_1 = require("react");
var useModal_1 = require("../../hooks/useModal");
require("./style.scss");
var close_png_1 = require("../../assets/close.png");
var react_redux_1 = require("react-redux");
var modal_1 = require("../../store/modal");
var Modal = function (_a) {
    var children = _a.children;
    var dispatch = react_redux_1.useDispatch();
    var _b = useModal_1.useModal(), body = _b.body, header = _b.header, show = _b.show;
    react_1.useEffect(function () {
        if (show) {
            document.body.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'scroll';
        }
    }, [show]);
    var close = function () {
        dispatch(modal_1.modalActions.clearModal());
    };
    return show
        ? react_1["default"].createElement("div", { className: 'modal-container' },
            react_1["default"].createElement("div", { className: 'modal' },
                react_1["default"].createElement("span", { onClick: close, className: 'modalClose' },
                    react_1["default"].createElement("img", { src: close_png_1["default"], alt: 'close' })),
                react_1["default"].createElement("h3", null, header),
                react_1["default"].createElement("div", { className: 'body' }, children || body)))
        : null;
};
exports["default"] = Modal;
