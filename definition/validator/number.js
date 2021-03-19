'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = numberValidation;

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isNull = require('lodash/lang/isNull');

var _isNull2 = _interopRequireDefault(_isNull);

var _isNaN = require('lodash/lang/isNaN');

var _isNaN2 = _interopRequireDefault(_isNaN);

var _isNumber = require('lodash/lang/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Function to  validate that an input is a number.
 * @param  {string || number} numberToValidate - Number to validate with the function.
 * @param  {object} options = {}, Allow the caller to specify min and max values.
 * @return {boolean} True if the validator works.
 */
function numberValidation(numberToValidate) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if ((0, _isUndefined2.default)(numberToValidate) || (0, _isNull2.default)(numberToValidate)) {
        return true;
    }
    var castNumberToValidate = +numberToValidate; //Cast it into a number.
    if ((0, _isNaN2.default)(castNumberToValidate)) {
        return false;
    }
    if (!(0, _isNumber2.default)(castNumberToValidate)) {
        return false;
    }
    var isMin = options.min !== undefined ? castNumberToValidate >= options.min : true;
    var isMax = options.max !== undefined ? castNumberToValidate <= options.max : true;
    return isMin && isMax;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJudW1iZXJWYWxpZGF0aW9uIiwibnVtYmVyVG9WYWxpZGF0ZSIsIm9wdGlvbnMiLCJjYXN0TnVtYmVyVG9WYWxpZGF0ZSIsImlzTWluIiwibWluIiwidW5kZWZpbmVkIiwiaXNNYXgiLCJtYXgiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQVV3QkEsZ0I7O0FBVnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7Ozs7QUFLZSxTQUFTQSxnQkFBVCxDQUEwQkMsZ0JBQTFCLEVBQTBEO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUNyRSxRQUFJLDJCQUFZRCxnQkFBWixLQUFpQyxzQkFBT0EsZ0JBQVAsQ0FBckMsRUFBK0Q7QUFDM0QsZUFBTyxJQUFQO0FBQ0g7QUFDRCxRQUFJRSx1QkFBdUIsQ0FBQ0YsZ0JBQTVCLENBSnFFLENBSXZCO0FBQzlDLFFBQUkscUJBQU1FLG9CQUFOLENBQUosRUFBaUM7QUFDN0IsZUFBTyxLQUFQO0FBQ0g7QUFDRCxRQUFJLENBQUMsd0JBQVNBLG9CQUFULENBQUwsRUFBcUM7QUFDakMsZUFBTyxLQUFQO0FBQ0g7QUFDRCxRQUFJQyxRQUFRRixRQUFRRyxHQUFSLEtBQWdCQyxTQUFoQixHQUE0Qkgsd0JBQXdCRCxRQUFRRyxHQUE1RCxHQUFrRSxJQUE5RTtBQUNBLFFBQUlFLFFBQVFMLFFBQVFNLEdBQVIsS0FBZ0JGLFNBQWhCLEdBQTRCSCx3QkFBd0JELFFBQVFNLEdBQTVELEdBQWtFLElBQTlFO0FBQ0EsV0FBT0osU0FBU0csS0FBaEI7QUFDSCIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNVbmRlZmluZWQgZnJvbSAnbG9kYXNoL2xhbmcvaXNVbmRlZmluZWQnO1xyXG5pbXBvcnQgaXNOdWxsIGZyb20gJ2xvZGFzaC9sYW5nL2lzTnVsbCc7XHJcbmltcG9ydCBpc05hTiBmcm9tICdsb2Rhc2gvbGFuZy9pc05hTic7XHJcbmltcG9ydCBpc051bWJlciBmcm9tICdsb2Rhc2gvbGFuZy9pc051bWJlcic7XHJcblxyXG4vKiBGdW5jdGlvbiB0byAgdmFsaWRhdGUgdGhhdCBhbiBpbnB1dCBpcyBhIG51bWJlci5cclxuICogQHBhcmFtICB7c3RyaW5nIHx8IG51bWJlcn0gbnVtYmVyVG9WYWxpZGF0ZSAtIE51bWJlciB0byB2YWxpZGF0ZSB3aXRoIHRoZSBmdW5jdGlvbi5cclxuICogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zID0ge30sIEFsbG93IHRoZSBjYWxsZXIgdG8gc3BlY2lmeSBtaW4gYW5kIG1heCB2YWx1ZXMuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbGlkYXRvciB3b3Jrcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG51bWJlclZhbGlkYXRpb24obnVtYmVyVG9WYWxpZGF0ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQobnVtYmVyVG9WYWxpZGF0ZSkgfHwgaXNOdWxsKG51bWJlclRvVmFsaWRhdGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBsZXQgY2FzdE51bWJlclRvVmFsaWRhdGUgPSArbnVtYmVyVG9WYWxpZGF0ZTsgLy9DYXN0IGl0IGludG8gYSBudW1iZXIuXHJcbiAgICBpZiAoaXNOYU4oY2FzdE51bWJlclRvVmFsaWRhdGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc051bWJlcihjYXN0TnVtYmVyVG9WYWxpZGF0ZSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsZXQgaXNNaW4gPSBvcHRpb25zLm1pbiAhPT0gdW5kZWZpbmVkID8gY2FzdE51bWJlclRvVmFsaWRhdGUgPj0gb3B0aW9ucy5taW4gOiB0cnVlO1xyXG4gICAgbGV0IGlzTWF4ID0gb3B0aW9ucy5tYXggIT09IHVuZGVmaW5lZCA/IGNhc3ROdW1iZXJUb1ZhbGlkYXRlIDw9IG9wdGlvbnMubWF4IDogdHJ1ZTtcclxuICAgIHJldHVybiBpc01pbiAmJiBpc01heDtcclxufVxyXG4iXX0=