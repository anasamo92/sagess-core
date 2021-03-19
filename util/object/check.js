'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = assertIsObject;

var _argumentInvalidException = require('../../exception/argument-invalid-exception');

var _argumentInvalidException2 = _interopRequireDefault(_argumentInvalidException);

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {object} data - The data to validate.
 * @return {undefined} - Return nothing, throw an Exception if this is not valid.
 */
function assertIsObject(name, data) {
    if (data !== undefined && !(0, _isObject2.default)(data)) {
        var ex = new _argumentInvalidException2.default(name + ' should be an object', data);;
        throw new _argumentInvalidException2.default(name + ' should be an object', data);
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJhc3NlcnRJc09iamVjdCIsIm5hbWUiLCJkYXRhIiwidW5kZWZpbmVkIiwiZXgiLCJBcmd1bWVudEludmFsaWRFeGNlcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7O2tCQVN3QkEsYzs7QUFUeEI7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7OztBQU1lLFNBQVNBLGNBQVQsQ0FBd0JDLElBQXhCLEVBQThCQyxJQUE5QixFQUFvQztBQUMvQyxRQUFJQSxTQUFTQyxTQUFULElBQXNCLENBQUMsd0JBQVNELElBQVQsQ0FBM0IsRUFBMkM7QUFDdkMsWUFBTUUsS0FBSyxJQUFJQyxrQ0FBSixDQUFnQ0osSUFBaEMsMkJBQTREQyxJQUE1RCxDQUFYLENBQTZFO0FBQzdFLGNBQU0sSUFBSUcsa0NBQUosQ0FBZ0NKLElBQWhDLDJCQUE0REMsSUFBNUQsQ0FBTjtBQUNIO0FBQ0oiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbiBmcm9tICcuLi8uLi9leGNlcHRpb24vYXJndW1lbnQtaW52YWxpZC1leGNlcHRpb24nO1xyXG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2xhbmcvaXNPYmplY3QnO1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCBhbiBvYmplY3QgaXMgYW4gb2JqZXQuXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAtIFRoZSBwcm9wZXJ0eSBuYW1lXHJcbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YSAtIFRoZSBkYXRhIHRvIHZhbGlkYXRlLlxyXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IC0gUmV0dXJuIG5vdGhpbmcsIHRocm93IGFuIEV4Y2VwdGlvbiBpZiB0aGlzIGlzIG5vdCB2YWxpZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzc2VydElzT2JqZWN0KG5hbWUsIGRhdGEpIHtcclxuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQgJiYgIWlzT2JqZWN0KGRhdGEpKSB7XHJcbiAgICAgICAgY29uc3QgZXggPSBuZXcgQXJndW1lbnRJbnZhbGlkRXhjZXB0aW9uKGAke25hbWV9IHNob3VsZCBiZSBhbiBvYmplY3RgLCBkYXRhKTs7XHJcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbihgJHtuYW1lfSBzaG91bGQgYmUgYW4gb2JqZWN0YCwgZGF0YSk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==