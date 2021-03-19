'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stringLength;

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate a string given options.
 * @param  {string} stringToTest - The string to test.
 * @param  {object} options - Validators options, supports minLength and maxLength both optionals.
 * @return {boolean} - True if the string is valid , false otherwise.
 */
function stringLength(stringToTest) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!(0, _isString2.default)(stringToTest)) {
        return false;
    }
    options.minLength = options.minLength || 0;
    var isMinLength = options.minLength !== undefined ? stringToTest.length >= options.minLength : true;
    var isMaxLength = options.maxLength !== undefined ? stringToTest.length <= options.maxLength : true;
    return isMinLength && isMaxLength;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJzdHJpbmdMZW5ndGgiLCJzdHJpbmdUb1Rlc3QiLCJvcHRpb25zIiwibWluTGVuZ3RoIiwiaXNNaW5MZW5ndGgiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJpc01heExlbmd0aCIsIm1heExlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBUXdCQSxZOztBQVJ4Qjs7Ozs7O0FBRUE7Ozs7OztBQU1lLFNBQVNBLFlBQVQsQ0FBc0JDLFlBQXRCLEVBQWtEO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUM3RCxRQUFJLENBQUMsd0JBQVNELFlBQVQsQ0FBTCxFQUE2QjtBQUN6QixlQUFPLEtBQVA7QUFDSDtBQUNEQyxZQUFRQyxTQUFSLEdBQW9CRCxRQUFRQyxTQUFSLElBQXFCLENBQXpDO0FBQ0EsUUFBTUMsY0FBY0YsUUFBUUMsU0FBUixLQUFzQkUsU0FBdEIsR0FBa0NKLGFBQWFLLE1BQWIsSUFBdUJKLFFBQVFDLFNBQWpFLEdBQTZFLElBQWpHO0FBQ0EsUUFBTUksY0FBY0wsUUFBUU0sU0FBUixLQUFzQkgsU0FBdEIsR0FBa0NKLGFBQWFLLE1BQWIsSUFBdUJKLFFBQVFNLFNBQWpFLEdBQTZFLElBQWpHO0FBQ0EsV0FBT0osZUFBZUcsV0FBdEI7QUFDSCIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNTdHJpbmcgZnJvbSAnbG9kYXNoL2xhbmcvaXNTdHJpbmcnO1xyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlIGEgc3RyaW5nIGdpdmVuIG9wdGlvbnMuXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyaW5nVG9UZXN0IC0gVGhlIHN0cmluZyB0byB0ZXN0LlxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IG9wdGlvbnMgLSBWYWxpZGF0b3JzIG9wdGlvbnMsIHN1cHBvcnRzIG1pbkxlbmd0aCBhbmQgbWF4TGVuZ3RoIGJvdGggb3B0aW9uYWxzLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSAtIFRydWUgaWYgdGhlIHN0cmluZyBpcyB2YWxpZCAsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmluZ0xlbmd0aChzdHJpbmdUb1Rlc3QsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgaWYgKCFpc1N0cmluZyhzdHJpbmdUb1Rlc3QpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgb3B0aW9ucy5taW5MZW5ndGggPSBvcHRpb25zLm1pbkxlbmd0aCB8fCAwO1xyXG4gICAgY29uc3QgaXNNaW5MZW5ndGggPSBvcHRpb25zLm1pbkxlbmd0aCAhPT0gdW5kZWZpbmVkID8gc3RyaW5nVG9UZXN0Lmxlbmd0aCA+PSBvcHRpb25zLm1pbkxlbmd0aCA6IHRydWU7XHJcbiAgICBjb25zdCBpc01heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoICE9PSB1bmRlZmluZWQgPyBzdHJpbmdUb1Rlc3QubGVuZ3RoIDw9IG9wdGlvbnMubWF4TGVuZ3RoIDogdHJ1ZTtcclxuICAgIHJldHVybiBpc01pbkxlbmd0aCAmJiBpc01heExlbmd0aDtcclxufVxyXG4iXX0=