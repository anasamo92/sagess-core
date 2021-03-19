'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.format = exports.init = undefined;

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// see http://numeraljs.com
var DEFAULT_FORMAT = '0,0';

/**
* Format a number using a given format.
* @param  {number} number - The number to format.
* @param  {string} format - The format to transform.
* @return {string} - The formated number.
*/
function format(number, format) {
    return (0, _numeral2.default)(number).format(format);
}

/**
 * Initialize numeral locale and default format.
 * 
 * @param {string} [format='0,0'] format to use 
 * @param {string} [locale='fr'] locale to use
 */
function init() {
    var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_FORMAT;
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'fr';

    _numeral2.default.locale(locale);
    _numeral2.default.defaultFormat(format);
}

exports.default = {
    init: init,
    format: format
};
exports.init = init;
exports.format = format;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0ZPUk1BVCIsImZvcm1hdCIsIm51bWJlciIsImluaXQiLCJsb2NhbGUiLCJudW1lcmFsIiwiZGVmYXVsdEZvcm1hdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFDQTtBQUNBLElBQU1BLGlCQUFpQixLQUF2Qjs7QUFFQTs7Ozs7O0FBTUEsU0FBU0MsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JELE1BQXhCLEVBQWdDO0FBQzVCLFdBQU8sdUJBQVFDLE1BQVIsRUFBZ0JELE1BQWhCLENBQXVCQSxNQUF2QixDQUFQO0FBQ0g7O0FBRUQ7Ozs7OztBQU1BLFNBQVNFLElBQVQsR0FBc0Q7QUFBQSxRQUF4Q0YsTUFBd0MsdUVBQS9CRCxjQUErQjtBQUFBLFFBQWZJLE1BQWUsdUVBQU4sSUFBTTs7QUFDbERDLHNCQUFRRCxNQUFSLENBQWVBLE1BQWY7QUFDQUMsc0JBQVFDLGFBQVIsQ0FBc0JMLE1BQXRCO0FBQ0g7O2tCQUVjO0FBQ1hFLGNBRFc7QUFFWEY7QUFGVyxDO1FBTVhFLEksR0FBQUEsSTtRQUNBRixNLEdBQUFBLE0iLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XHJcbi8vIHNlZSBodHRwOi8vbnVtZXJhbGpzLmNvbVxyXG5jb25zdCBERUZBVUxUX0ZPUk1BVCA9ICcwLDAnO1xyXG5cclxuLyoqXHJcbiogRm9ybWF0IGEgbnVtYmVyIHVzaW5nIGEgZ2l2ZW4gZm9ybWF0LlxyXG4qIEBwYXJhbSAge251bWJlcn0gbnVtYmVyIC0gVGhlIG51bWJlciB0byBmb3JtYXQuXHJcbiogQHBhcmFtICB7c3RyaW5nfSBmb3JtYXQgLSBUaGUgZm9ybWF0IHRvIHRyYW5zZm9ybS5cclxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIGZvcm1hdGVkIG51bWJlci5cclxuKi9cclxuZnVuY3Rpb24gZm9ybWF0KG51bWJlciwgZm9ybWF0KSB7XHJcbiAgICByZXR1cm4gbnVtZXJhbChudW1iZXIpLmZvcm1hdChmb3JtYXQpO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBudW1lcmFsIGxvY2FsZSBhbmQgZGVmYXVsdCBmb3JtYXQuXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2Zvcm1hdD0nMCwwJ10gZm9ybWF0IHRvIHVzZSBcclxuICogQHBhcmFtIHtzdHJpbmd9IFtsb2NhbGU9J2ZyJ10gbG9jYWxlIHRvIHVzZVxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdChmb3JtYXQgPSBERUZBVUxUX0ZPUk1BVCwgbG9jYWxlID0gJ2ZyJykge1xyXG4gICAgbnVtZXJhbC5sb2NhbGUobG9jYWxlKTtcclxuICAgIG51bWVyYWwuZGVmYXVsdEZvcm1hdChmb3JtYXQpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0LFxyXG4gICAgZm9ybWF0XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gICAgaW5pdCxcclxuICAgIGZvcm1hdFxyXG59OyJdfQ==