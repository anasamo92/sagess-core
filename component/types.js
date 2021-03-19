'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = types;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Expose a React type validation for the component properties validation.
* @see http://facebook.github.io/react/docs/reusable-components.html
* @param   {string} type - String or array of the types to use.
* @param   {boolean} isRequired - Defines if the props is mandatory.
* @return {object} The corresponding react type.
*/
function types(type, isRequired) {
    var isStringType = (0, _isString2.default)(type);
    if (!isStringType && !(0, _isArray2.default)(type)) {
        throw new Error('The type should be a string or an array');
    }
    //Container for the propTypes.
    var propTypeToReturn = void 0;
    //Array case.
    if (isStringType) {
        propTypeToReturn = _react2.default.PropTypes[type];
    } else {
        propTypeToReturn = _react2.default.PropTypes.oneOfType(type.map(function (t) {
            return _react2.default.PropTypes[t];
        }));
    }
    //Mandatory case
    if (isRequired) {
        propTypeToReturn = propTypeToReturn.isRequired;
    }
    return propTypeToReturn;
} //Dependencies.
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJ0eXBlcyIsInR5cGUiLCJpc1JlcXVpcmVkIiwiaXNTdHJpbmdUeXBlIiwiRXJyb3IiLCJwcm9wVHlwZVRvUmV0dXJuIiwiUmVhY3QiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJtYXAiLCJ0Il0sIm1hcHBpbmdzIjoiOzs7OztrQkFZd0JBLEs7O0FBWHhCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7QUFPZSxTQUFTQSxLQUFULENBQWVDLElBQWYsRUFBcUJDLFVBQXJCLEVBQWlDO0FBQzVDLFFBQU1DLGVBQWUsd0JBQVNGLElBQVQsQ0FBckI7QUFDQSxRQUFJLENBQUNFLFlBQUQsSUFBaUIsQ0FBQyx1QkFBUUYsSUFBUixDQUF0QixFQUFxQztBQUNqQyxjQUFNLElBQUlHLEtBQUosQ0FBVSx5Q0FBVixDQUFOO0FBQ0g7QUFDRDtBQUNBLFFBQUlDLHlCQUFKO0FBQ0E7QUFDQSxRQUFJRixZQUFKLEVBQWtCO0FBQ2RFLDJCQUFtQkMsZ0JBQU1DLFNBQU4sQ0FBZ0JOLElBQWhCLENBQW5CO0FBQ0gsS0FGRCxNQUVPO0FBQ0hJLDJCQUFtQkMsZ0JBQU1DLFNBQU4sQ0FBZ0JDLFNBQWhCLENBQ2ZQLEtBQUtRLEdBQUwsQ0FDSSxVQUFDQyxDQUFELEVBQU87QUFDSCxtQkFBT0osZ0JBQU1DLFNBQU4sQ0FBZ0JHLENBQWhCLENBQVA7QUFDSCxTQUhMLENBRGUsQ0FBbkI7QUFLSDtBQUNEO0FBQ0EsUUFBSVIsVUFBSixFQUFnQjtBQUNaRywyQkFBbUJBLGlCQUFpQkgsVUFBcEM7QUFDSDtBQUNELFdBQU9HLGdCQUFQO0FBQ0gsQyxDQWxDRCIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RlcGVuZGVuY2llcy5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGlzU3RyaW5nIGZyb20gJ2xvZGFzaC9sYW5nL2lzU3RyaW5nJztcclxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoL2xhbmcvaXNBcnJheSc7XHJcblxyXG4vKipcclxuKiBFeHBvc2UgYSBSZWFjdCB0eXBlIHZhbGlkYXRpb24gZm9yIHRoZSBjb21wb25lbnQgcHJvcGVydGllcyB2YWxpZGF0aW9uLlxyXG4qIEBzZWUgaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3JldXNhYmxlLWNvbXBvbmVudHMuaHRtbFxyXG4qIEBwYXJhbSAgIHtzdHJpbmd9IHR5cGUgLSBTdHJpbmcgb3IgYXJyYXkgb2YgdGhlIHR5cGVzIHRvIHVzZS5cclxuKiBAcGFyYW0gICB7Ym9vbGVhbn0gaXNSZXF1aXJlZCAtIERlZmluZXMgaWYgdGhlIHByb3BzIGlzIG1hbmRhdG9yeS5cclxuKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBjb3JyZXNwb25kaW5nIHJlYWN0IHR5cGUuXHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHR5cGVzKHR5cGUsIGlzUmVxdWlyZWQpIHtcclxuICAgIGNvbnN0IGlzU3RyaW5nVHlwZSA9IGlzU3RyaW5nKHR5cGUpO1xyXG4gICAgaWYgKCFpc1N0cmluZ1R5cGUgJiYgIWlzQXJyYXkodHlwZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0eXBlIHNob3VsZCBiZSBhIHN0cmluZyBvciBhbiBhcnJheScpO1xyXG4gICAgfVxyXG4gICAgLy9Db250YWluZXIgZm9yIHRoZSBwcm9wVHlwZXMuXHJcbiAgICBsZXQgcHJvcFR5cGVUb1JldHVybjtcclxuICAgIC8vQXJyYXkgY2FzZS5cclxuICAgIGlmIChpc1N0cmluZ1R5cGUpIHtcclxuICAgICAgICBwcm9wVHlwZVRvUmV0dXJuID0gUmVhY3QuUHJvcFR5cGVzW3R5cGVdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9wVHlwZVRvUmV0dXJuID0gUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShcclxuICAgICAgICAgICAgdHlwZS5tYXAoXHJcbiAgICAgICAgICAgICAgICAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5Qcm9wVHlwZXNbdF07XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICAvL01hbmRhdG9yeSBjYXNlXHJcbiAgICBpZiAoaXNSZXF1aXJlZCkge1xyXG4gICAgICAgIHByb3BUeXBlVG9SZXR1cm4gPSBwcm9wVHlwZVRvUmV0dXJuLmlzUmVxdWlyZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJvcFR5cGVUb1JldHVybjtcclxufVxyXG4iXX0=