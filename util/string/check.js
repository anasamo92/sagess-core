'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (name, data) {
    if (!(0, _isString2.default)(data)) {
        throw new _argumentInvalidException2.default(name + ' should be a string', data);
    }
};

var _argumentInvalidException = require('../../exception/argument-invalid-exception');

var _argumentInvalidException2 = _interopRequireDefault(_argumentInvalidException);

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * Assert an object is an objet.
 * @param  {string} name - The property name
 * @param  {string} data - The data to validate.
 * @return {undefined} - Return nothing, throw an Exception if this is not valid.
 */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJuYW1lIiwiZGF0YSIsIkFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQVNlLFVBQVVBLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ2pDLFFBQUksQ0FBQyx3QkFBU0EsSUFBVCxDQUFMLEVBQXFCO0FBQ2pCLGNBQU0sSUFBSUMsa0NBQUosQ0FBZ0NGLElBQWhDLDBCQUEyREMsSUFBM0QsQ0FBTjtBQUNIO0FBQ0osQzs7QUFiRDs7OztBQUNBOzs7Ozs7OztBQUVBIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcmd1bWVudEludmFsaWRFeGNlcHRpb24gZnJvbSAnLi4vLi4vZXhjZXB0aW9uL2FyZ3VtZW50LWludmFsaWQtZXhjZXB0aW9uJztcclxuaW1wb3J0IGlzU3RyaW5nIGZyb20gJ2xvZGFzaC9sYW5nL2lzU3RyaW5nJztcclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgYW4gb2JqZWN0IGlzIGFuIG9iamV0LlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWUgLSBUaGUgcHJvcGVydHkgbmFtZVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGRhdGEgLSBUaGUgZGF0YSB0byB2YWxpZGF0ZS5cclxuICogQHJldHVybiB7dW5kZWZpbmVkfSAtIFJldHVybiBub3RoaW5nLCB0aHJvdyBhbiBFeGNlcHRpb24gaWYgdGhpcyBpcyBub3QgdmFsaWQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xyXG4gICAgaWYgKCFpc1N0cmluZyhkYXRhKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudEludmFsaWRFeGNlcHRpb24oYCR7bmFtZX0gc2hvdWxkIGJlIGEgc3RyaW5nYCwgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19