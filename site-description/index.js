'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserSiteStructure = exports.reader = exports.builder = undefined;

var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

var _reader = require('./reader');

var _reader2 = _interopRequireDefault(_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Get th site structure processed with the user roles.
 * @return {object} - The user site structure.
 */
function getUserSiteStructure() {
    //Seems wiered looking like a ci
    return _builder2.default.getSiteStructure();
}

exports.builder = _builder2.default;
exports.reader = _reader2.default;
exports.getUserSiteStructure = getUserSiteStructure;
exports.default = {
    builder: _builder2.default,
    reader: _reader2.default,
    getUserSiteStructure: getUserSiteStructure
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJnZXRVc2VyU2l0ZVN0cnVjdHVyZSIsImJ1aWxkZXIiLCJnZXRTaXRlU3RydWN0dXJlIiwicmVhZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7QUFJQSxTQUFTQSxvQkFBVCxHQUFnQztBQUM1QjtBQUNBLFdBQU9DLGtCQUFRQyxnQkFBUixFQUFQO0FBQ0g7O1FBR0dELE8sR0FBQUEsaUI7UUFDQUUsTSxHQUFBQSxnQjtRQUNBSCxvQixHQUFBQSxvQjtrQkFHVztBQUNYQyw4QkFEVztBQUVYRSw0QkFGVztBQUdYSDtBQUhXLEMiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkZXIgZnJvbSAnLi9idWlsZGVyJztcclxuaW1wb3J0IHJlYWRlciBmcm9tICcuL3JlYWRlcic7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIEdldCB0aCBzaXRlIHN0cnVjdHVyZSBwcm9jZXNzZWQgd2l0aCB0aGUgdXNlciByb2xlcy5cclxuICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSB1c2VyIHNpdGUgc3RydWN0dXJlLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0VXNlclNpdGVTdHJ1Y3R1cmUoKSB7XHJcbiAgICAvL1NlZW1zIHdpZXJlZCBsb29raW5nIGxpa2UgYSBjaVxyXG4gICAgcmV0dXJuIGJ1aWxkZXIuZ2V0U2l0ZVN0cnVjdHVyZSgpO1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgYnVpbGRlcixcclxuICAgIHJlYWRlcixcclxuICAgIGdldFVzZXJTaXRlU3RydWN0dXJlXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBidWlsZGVyLFxyXG4gICAgcmVhZGVyLFxyXG4gICAgZ2V0VXNlclNpdGVTdHJ1Y3R1cmVcclxufTsiXX0=