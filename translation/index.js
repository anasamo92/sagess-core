'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.translate = exports.init = undefined;

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var init = _i18next2.default.init.bind(_i18next2.default);
var translate = _i18next2.default.t.bind(_i18next2.default);

function focusi18nInit(data) {
    var _ref = data || {},
        resStore = _ref.resStore,
        others = _objectWithoutProperties(_ref, ['resStore']);

    var toInit = Object.assign({}, others);
    if (resStore) {
        console.warn('With new i18next version, data should be in resources, not in resStore. Please change it in the initializer.');
        toInit.resources = resStore;
    }
    return init(toInit);
}

exports.init = focusi18nInit;
exports.translate = translate;
exports.default = {
    init: focusi18nInit,
    translate: translate
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJpbml0IiwiaTE4bmV4dCIsImJpbmQiLCJ0cmFuc2xhdGUiLCJ0IiwiZm9jdXNpMThuSW5pdCIsImRhdGEiLCJyZXNTdG9yZSIsIm90aGVycyIsInRvSW5pdCIsImNvbnNvbGUiLCJ3YXJuIiwicmVzb3VyY2VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBT0Msa0JBQVFELElBQVIsQ0FBYUUsSUFBYixDQUFrQkQsaUJBQWxCLENBQWI7QUFDQSxJQUFNRSxZQUFZRixrQkFBUUcsQ0FBUixDQUFVRixJQUFWLENBQWVELGlCQUFmLENBQWxCOztBQUVBLFNBQVNJLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCO0FBQUEsZUFDT0EsUUFBUSxFQURmO0FBQUEsUUFDakJDLFFBRGlCLFFBQ2pCQSxRQURpQjtBQUFBLFFBQ0pDLE1BREk7O0FBRXpCLFFBQU1DLDJCQUFjRCxNQUFkLENBQU47QUFDQSxRQUFJRCxRQUFKLEVBQWM7QUFDVkcsZ0JBQVFDLElBQVIsQ0FBYSw4R0FBYjtBQUNBRixlQUFPRyxTQUFQLEdBQW1CTCxRQUFuQjtBQUNIO0FBQ0QsV0FBT1AsS0FBS1MsTUFBTCxDQUFQO0FBQ0g7O1FBSW9CVCxJLEdBQWpCSyxhO1FBQ0FGLFMsR0FBQUEsUztrQkFFVztBQUNYSCxVQUFNSyxhQURLO0FBRVhGO0FBRlcsQyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcclxuXHJcbmNvbnN0IGluaXQgPSBpMThuZXh0LmluaXQuYmluZChpMThuZXh0KTtcclxuY29uc3QgdHJhbnNsYXRlID0gaTE4bmV4dC50LmJpbmQoaTE4bmV4dCk7XHJcblxyXG5mdW5jdGlvbiBmb2N1c2kxOG5Jbml0KGRhdGEpIHtcclxuICAgIGNvbnN0IHsgcmVzU3RvcmUsIC4uLm90aGVycyB9ID0gZGF0YSB8fCB7fTtcclxuICAgIGNvbnN0IHRvSW5pdCA9IHsgLi4ub3RoZXJzIH07XHJcbiAgICBpZiAocmVzU3RvcmUpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ1dpdGggbmV3IGkxOG5leHQgdmVyc2lvbiwgZGF0YSBzaG91bGQgYmUgaW4gcmVzb3VyY2VzLCBub3QgaW4gcmVzU3RvcmUuIFBsZWFzZSBjaGFuZ2UgaXQgaW4gdGhlIGluaXRpYWxpemVyLicpO1xyXG4gICAgICAgIHRvSW5pdC5yZXNvdXJjZXMgPSByZXNTdG9yZTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbml0KHRvSW5pdCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgZm9jdXNpMThuSW5pdCBhcyBpbml0LFxyXG4gICAgdHJhbnNsYXRlXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGluaXQ6IGZvY3VzaTE4bkluaXQsXHJcbiAgICB0cmFuc2xhdGVcclxufTsiXX0=