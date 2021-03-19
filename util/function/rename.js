'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Rename a function to a new name, for call stack and debugging
 *
 * @param {Function} func the function to rename
 * @param {String} newName the new name
 */
function renameFunction(func, newName) {
    // eslint-disable-next-line no-unused-vars
    var prop = Object.getOwnPropertyDescriptor(func, 'name');
    if (prop) {
        var value = prop.value,
            others = _objectWithoutProperties(prop, ['value']);

        Object.defineProperty(func, 'name', Object.assign({ value: newName }, others));
    }
}

exports.default = renameFunction;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJyZW5hbWVGdW5jdGlvbiIsImZ1bmMiLCJuZXdOYW1lIiwicHJvcCIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInZhbHVlIiwib3RoZXJzIiwiZGVmaW5lUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7Ozs7OztBQU1BLFNBQVNBLGNBQVQsQ0FBd0JDLElBQXhCLEVBQThCQyxPQUE5QixFQUF1QztBQUNuQztBQUNBLFFBQU1DLE9BQU9DLE9BQU9DLHdCQUFQLENBQWdDSixJQUFoQyxFQUFzQyxNQUF0QyxDQUFiO0FBQ0EsUUFBSUUsSUFBSixFQUFVO0FBQUEsWUFDRUcsS0FERixHQUN1QkgsSUFEdkIsQ0FDRUcsS0FERjtBQUFBLFlBQ1lDLE1BRFosNEJBQ3VCSixJQUR2Qjs7QUFFTkMsZUFBT0ksY0FBUCxDQUFzQlAsSUFBdEIsRUFBNEIsTUFBNUIsa0JBQXNDSyxPQUFPSixPQUE3QyxJQUF5REssTUFBekQ7QUFDSDtBQUNKOztrQkFFY1AsYyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qKlxyXG4gKiBSZW5hbWUgYSBmdW5jdGlvbiB0byBhIG5ldyBuYW1lLCBmb3IgY2FsbCBzdGFjayBhbmQgZGVidWdnaW5nXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgdGhlIGZ1bmN0aW9uIHRvIHJlbmFtZVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV3TmFtZSB0aGUgbmV3IG5hbWVcclxuICovXHJcbmZ1bmN0aW9uIHJlbmFtZUZ1bmN0aW9uKGZ1bmMsIG5ld05hbWUpIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gICAgY29uc3QgcHJvcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZnVuYywgJ25hbWUnKTtcclxuICAgIGlmIChwcm9wKSB7XHJcbiAgICAgICAgY29uc3QgeyB2YWx1ZSwgLi4ub3RoZXJzIH0gPSBwcm9wO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jLCAnbmFtZScsIHsgdmFsdWU6IG5ld05hbWUsIC4uLm90aGVycyB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVuYW1lRnVuY3Rpb247Il19