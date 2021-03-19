'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (url, method) {
    /**
     * Function returns by the module.
     * @param  {object} param - urlData: The JSON data to inject in the URL, data: The JSON data to give to the request.
     * @return {function} returns a function which takes the URL as parameters.
     */
    return function generateUrl(param) {
        if (param == undefined) {
            param = {};
        }
        return {
            url: (0, _processor2.default)(url, param.urlData),
            method: method,
            data: param.data || param.bodyData
        };
    };
};

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
/*
* @module config/server/url-builder
* @param url - url with params such as http://url/entity/${id}
* @param method - HTTP verb {GET, POST, PUT, DELETE}
* @return {function}
*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJ1cmwiLCJtZXRob2QiLCJnZW5lcmF0ZVVybCIsInBhcmFtIiwidW5kZWZpbmVkIiwidXJsRGF0YSIsImRhdGEiLCJib2R5RGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQU9lLFVBQVVBLEdBQVYsRUFBZUMsTUFBZixFQUF1QjtBQUNsQzs7Ozs7QUFLQSxXQUFPLFNBQVNDLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQy9CLFlBQUlBLFNBQVNDLFNBQWIsRUFBd0I7QUFDcEJELG9CQUFRLEVBQVI7QUFDSDtBQUNELGVBQU87QUFDSEgsaUJBQUsseUJBQWFBLEdBQWIsRUFBa0JHLE1BQU1FLE9BQXhCLENBREY7QUFFSEosb0JBQVFBLE1BRkw7QUFHSEssa0JBQU1ILE1BQU1HLElBQU4sSUFBY0gsTUFBTUk7QUFIdkIsU0FBUDtBQUtILEtBVEQ7QUFVSCxDOztBQXZCRDs7Ozs7OztBQUNBIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1cmxQcm9jZXNzb3IgZnJvbSAnLi9wcm9jZXNzb3InO1xyXG4vKlxyXG4qIEBtb2R1bGUgY29uZmlnL3NlcnZlci91cmwtYnVpbGRlclxyXG4qIEBwYXJhbSB1cmwgLSB1cmwgd2l0aCBwYXJhbXMgc3VjaCBhcyBodHRwOi8vdXJsL2VudGl0eS8ke2lkfVxyXG4qIEBwYXJhbSBtZXRob2QgLSBIVFRQIHZlcmIge0dFVCwgUE9TVCwgUFVULCBERUxFVEV9XHJcbiogQHJldHVybiB7ZnVuY3Rpb259XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiByZXR1cm5zIGJ5IHRoZSBtb2R1bGUuXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IHBhcmFtIC0gdXJsRGF0YTogVGhlIEpTT04gZGF0YSB0byBpbmplY3QgaW4gdGhlIFVSTCwgZGF0YTogVGhlIEpTT04gZGF0YSB0byBnaXZlIHRvIHRoZSByZXF1ZXN0LlxyXG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259IHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCB0YWtlcyB0aGUgVVJMIGFzIHBhcmFtZXRlcnMuXHJcbiAgICAgKi9cclxuICAgIHJldHVybiBmdW5jdGlvbiBnZW5lcmF0ZVVybChwYXJhbSkge1xyXG4gICAgICAgIGlmIChwYXJhbSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcGFyYW0gPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdXJsOiB1cmxQcm9jZXNzb3IodXJsLCBwYXJhbS51cmxEYXRhKSxcclxuICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLmRhdGEgfHwgcGFyYW0uYm9keURhdGFcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxufVxyXG4iXX0=