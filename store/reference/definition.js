'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../../reference/config');

var _config2 = _interopRequireDefault(_config);

var _isEmpty = require('lodash/lang/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build the reference definition from the keys registered into the definitions.
 * @returns {object} - The reference definition.
 */
function buildReferenceDefinition() {
    //Read the current configuration in the reference config.
    var referenceConf = _config2.default.get();
    //Warn the user if empty.
    if (!referenceConf || (0, _isEmpty2.default)(referenceConf)) {
        console.warn('You did not set any reference list in the reference configuration, see Focus.reference.config.set.');
    }
    //Build an object from the keys.
    return Object.keys(referenceConf).reduce(function (acc, elt) {
        acc[elt] = elt;
        return acc;
    }, {});
}
exports.default = buildReferenceDefinition;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJidWlsZFJlZmVyZW5jZURlZmluaXRpb24iLCJyZWZlcmVuY2VDb25mIiwicmVmQ29uZmlnQWNjZXNzb3IiLCJnZXQiLCJjb25zb2xlIiwid2FybiIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhY2MiLCJlbHQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7O0FBSUEsU0FBU0Esd0JBQVQsR0FBb0M7QUFDaEM7QUFDQSxRQUFJQyxnQkFBZ0JDLGlCQUFrQkMsR0FBbEIsRUFBcEI7QUFDQTtBQUNBLFFBQUksQ0FBQ0YsYUFBRCxJQUFrQix1QkFBUUEsYUFBUixDQUF0QixFQUE4QztBQUMxQ0csZ0JBQVFDLElBQVIsQ0FBYSxvR0FBYjtBQUNIO0FBQ0Q7QUFDQSxXQUFPQyxPQUFPQyxJQUFQLENBQVlOLGFBQVosRUFBMkJPLE1BQTNCLENBQWtDLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ25ERCxZQUFJQyxHQUFKLElBQVdBLEdBQVg7QUFDQSxlQUFPRCxHQUFQO0FBQ0gsS0FITSxFQUdKLEVBSEksQ0FBUDtBQUlIO2tCQUNjVCx3QiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVmQ29uZmlnQWNjZXNzb3IgZnJvbSAnLi4vLi4vcmVmZXJlbmNlL2NvbmZpZyc7XHJcbmltcG9ydCBpc0VtcHR5IGZyb20gJ2xvZGFzaC9sYW5nL2lzRW1wdHknO1xyXG5cclxuLyoqXHJcbiAqIEJ1aWxkIHRoZSByZWZlcmVuY2UgZGVmaW5pdGlvbiBmcm9tIHRoZSBrZXlzIHJlZ2lzdGVyZWQgaW50byB0aGUgZGVmaW5pdGlvbnMuXHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIHJlZmVyZW5jZSBkZWZpbml0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gYnVpbGRSZWZlcmVuY2VEZWZpbml0aW9uKCkge1xyXG4gICAgLy9SZWFkIHRoZSBjdXJyZW50IGNvbmZpZ3VyYXRpb24gaW4gdGhlIHJlZmVyZW5jZSBjb25maWcuXHJcbiAgICBsZXQgcmVmZXJlbmNlQ29uZiA9IHJlZkNvbmZpZ0FjY2Vzc29yLmdldCgpO1xyXG4gICAgLy9XYXJuIHRoZSB1c2VyIGlmIGVtcHR5LlxyXG4gICAgaWYgKCFyZWZlcmVuY2VDb25mIHx8IGlzRW1wdHkocmVmZXJlbmNlQ29uZikpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ1lvdSBkaWQgbm90IHNldCBhbnkgcmVmZXJlbmNlIGxpc3QgaW4gdGhlIHJlZmVyZW5jZSBjb25maWd1cmF0aW9uLCBzZWUgRm9jdXMucmVmZXJlbmNlLmNvbmZpZy5zZXQuJyk7XHJcbiAgICB9XHJcbiAgICAvL0J1aWxkIGFuIG9iamVjdCBmcm9tIHRoZSBrZXlzLlxyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHJlZmVyZW5jZUNvbmYpLnJlZHVjZSgoYWNjLCBlbHQpID0+IHtcclxuICAgICAgICBhY2NbZWx0XSA9IGVsdDtcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkUmVmZXJlbmNlRGVmaW5pdGlvbjtcclxuIl19