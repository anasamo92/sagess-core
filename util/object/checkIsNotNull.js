'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (name, data) {
    if ((0, _isNull2.default)(data) || (0, _isUndefined2.default)(data)) {
        throw new _argumentNullException2.default(name + ' should be defined');
    }
};

var _argumentNullException = require('../../exception/argument-null-exception');

var _argumentNullException2 = _interopRequireDefault(_argumentNullException);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isNull = require('lodash/lang/isNull');

var _isNull2 = _interopRequireDefault(_isNull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable filenames/match-regex */
module.exports = exports['default'];

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {object} data - The data to validate.
 * @returns {undefined} - Return nothing, throw an Exception if this is not valid.
 * @example var objToTest = { papa : "singe"}; isNull('objToTest', objToTest);
 */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJuYW1lIiwiZGF0YSIsIkFyZ3VtZW50TnVsbEV4Y2VwdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQWFlLFVBQVVBLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ2pDLFFBQUksc0JBQU9BLElBQVAsS0FBZ0IsMkJBQVlBLElBQVosQ0FBcEIsRUFBdUM7QUFDbkMsY0FBTSxJQUFJQywrQkFBSixDQUE2QkYsSUFBN0Isd0JBQU47QUFDSDtBQUNKLEM7O0FBaEJEOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBSkE7OztBQU1BIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGZpbGVuYW1lcy9tYXRjaC1yZWdleCAqL1xyXG5pbXBvcnQgQXJndW1lbnROdWxsRXhjZXB0aW9uIGZyb20gJy4uLy4uL2V4Y2VwdGlvbi9hcmd1bWVudC1udWxsLWV4Y2VwdGlvbic7XHJcblxyXG5pbXBvcnQgaXNVbmRlZmluZWQgZnJvbSAnbG9kYXNoL2xhbmcvaXNVbmRlZmluZWQnO1xyXG5pbXBvcnQgaXNOdWxsIGZyb20gJ2xvZGFzaC9sYW5nL2lzTnVsbCc7XHJcblxyXG4vKipcclxuICogQXNzZXJ0IGFuIG9iamVjdCBpcyBhbiBvYmpldC5cclxuICogQHBhcmFtICB7c3RyaW5nfSBuYW1lIC0gVGhlIHByb3BlcnR5IG5hbWVcclxuICogQHBhcmFtICB7b2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgdG8gdmFsaWRhdGUuXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9IC0gUmV0dXJuIG5vdGhpbmcsIHRocm93IGFuIEV4Y2VwdGlvbiBpZiB0aGlzIGlzIG5vdCB2YWxpZC5cclxuICogQGV4YW1wbGUgdmFyIG9ialRvVGVzdCA9IHsgcGFwYSA6IFwic2luZ2VcIn07IGlzTnVsbCgnb2JqVG9UZXN0Jywgb2JqVG9UZXN0KTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChuYW1lLCBkYXRhKSB7XHJcbiAgICBpZiAoaXNOdWxsKGRhdGEpIHx8IGlzVW5kZWZpbmVkKGRhdGEpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihgJHtuYW1lfSBzaG91bGQgYmUgZGVmaW5lZGApO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==