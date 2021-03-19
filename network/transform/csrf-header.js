'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildXsrfHeader = exports.getCookieByName = undefined;

var _apiDriver = require('../api-driver');

var COOKIE_TOKEN_NAME = 'XSRF-TOKEN';
var HEADER_TOKEN_NAME = 'X-XSRF-TOKEN';

/**
 * Utility method to extract a cookie value by its name
 * 
 * @param {string} name the cookie name 
 * @returns {string} the value of the cookie
 */
var getCookieByName = function getCookieByName(name) {
    var cookies = document.cookie.split('; ').reduce(function (acc, curr) {
        var cookie = curr.split('=');
        acc[cookie[0]] = cookie[1];
        return acc;
    }, {});

    return cookies[name];
};

/**
 * Build an object with CSRF token as a header if it exists
 * 
 * @returns {object} an object with headers to add in request.
 */
var buildXsrfHeader = function buildXsrfHeader() {
    var token = getCookieByName(COOKIE_TOKEN_NAME);
    var headers = {};

    if (token) {
        headers[HEADER_TOKEN_NAME] = token;
    }
    return headers;
};

/**
 * Register CSRF token header addition from cookie. 
 * 
 */
var register = function register() {
    (0, _apiDriver.registerPreFetchTransform)(function (_ref) {
        var urlData = _ref.urlData,
            data = _ref.data,
            options = _ref.options;

        options = options || {};
        options.headers = Object.assign({}, buildXsrfHeader(), options.headers);
        return { urlData: urlData, data: data, options: options };
    });
};

exports.default = register;
exports.getCookieByName = getCookieByName;
exports.buildXsrfHeader = buildXsrfHeader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJDT09LSUVfVE9LRU5fTkFNRSIsIkhFQURFUl9UT0tFTl9OQU1FIiwiZ2V0Q29va2llQnlOYW1lIiwibmFtZSIsImNvb2tpZXMiLCJkb2N1bWVudCIsImNvb2tpZSIsInNwbGl0IiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImJ1aWxkWHNyZkhlYWRlciIsInRva2VuIiwiaGVhZGVycyIsInJlZ2lzdGVyIiwidXJsRGF0YSIsImRhdGEiLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsb0JBQW9CLFlBQTFCO0FBQ0EsSUFBTUMsb0JBQW9CLGNBQTFCOztBQUVBOzs7Ozs7QUFNQSxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNDLElBQUQsRUFBVTtBQUM5QixRQUFNQyxVQUFVQyxTQUFTQyxNQUFULENBQWdCQyxLQUFoQixDQUFzQixJQUF0QixFQUE0QkMsTUFBNUIsQ0FBbUMsVUFBQ0MsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDOUQsWUFBTUosU0FBU0ksS0FBS0gsS0FBTCxDQUFXLEdBQVgsQ0FBZjtBQUNBRSxZQUFJSCxPQUFPLENBQVAsQ0FBSixJQUFpQkEsT0FBTyxDQUFQLENBQWpCO0FBQ0EsZUFBT0csR0FBUDtBQUNILEtBSmUsRUFJYixFQUphLENBQWhCOztBQU1BLFdBQU9MLFFBQVFELElBQVIsQ0FBUDtBQUNILENBUkQ7O0FBVUE7Ozs7O0FBS0EsSUFBTVEsa0JBQWtCLFNBQWxCQSxlQUFrQixHQUFNO0FBQzFCLFFBQU1DLFFBQVFWLGdCQUFnQkYsaUJBQWhCLENBQWQ7QUFDQSxRQUFNYSxVQUFVLEVBQWhCOztBQUVBLFFBQUlELEtBQUosRUFBVztBQUNQQyxnQkFBUVosaUJBQVIsSUFBNkJXLEtBQTdCO0FBQ0g7QUFDRCxXQUFPQyxPQUFQO0FBQ0gsQ0FSRDs7QUFVQTs7OztBQUlBLElBQU1DLFdBQVcsU0FBWEEsUUFBVyxHQUFNO0FBQ25CLDhDQUEwQixnQkFBZ0M7QUFBQSxZQUE3QkMsT0FBNkIsUUFBN0JBLE9BQTZCO0FBQUEsWUFBcEJDLElBQW9CLFFBQXBCQSxJQUFvQjtBQUFBLFlBQWRDLE9BQWMsUUFBZEEsT0FBYzs7QUFDdERBLGtCQUFVQSxXQUFXLEVBQXJCO0FBQ0FBLGdCQUFRSixPQUFSLHFCQUF1QkYsaUJBQXZCLEVBQTZDTSxRQUFRSixPQUFyRDtBQUNBLGVBQU8sRUFBRUUsZ0JBQUYsRUFBV0MsVUFBWCxFQUFpQkMsZ0JBQWpCLEVBQVA7QUFDSCxLQUpEO0FBS0gsQ0FORDs7a0JBUWVILFE7UUFFWFosZSxHQUFBQSxlO1FBQ0FTLGUsR0FBQUEsZSIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWdpc3RlclByZUZldGNoVHJhbnNmb3JtIH0gZnJvbSAnLi4vYXBpLWRyaXZlcic7XHJcblxyXG5jb25zdCBDT09LSUVfVE9LRU5fTkFNRSA9ICdYU1JGLVRPS0VOJztcclxuY29uc3QgSEVBREVSX1RPS0VOX05BTUUgPSAnWC1YU1JGLVRPS0VOJztcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXR5IG1ldGhvZCB0byBleHRyYWN0IGEgY29va2llIHZhbHVlIGJ5IGl0cyBuYW1lXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgY29va2llIG5hbWUgXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSB2YWx1ZSBvZiB0aGUgY29va2llXHJcbiAqL1xyXG5jb25zdCBnZXRDb29raWVCeU5hbWUgPSAobmFtZSkgPT4ge1xyXG4gICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKS5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvb2tpZSA9IGN1cnIuc3BsaXQoJz0nKTtcclxuICAgICAgICBhY2NbY29va2llWzBdXSA9IGNvb2tpZVsxXTtcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG5cclxuICAgIHJldHVybiBjb29raWVzW25hbWVdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEJ1aWxkIGFuIG9iamVjdCB3aXRoIENTUkYgdG9rZW4gYXMgYSBoZWFkZXIgaWYgaXQgZXhpc3RzXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBhbiBvYmplY3Qgd2l0aCBoZWFkZXJzIHRvIGFkZCBpbiByZXF1ZXN0LlxyXG4gKi9cclxuY29uc3QgYnVpbGRYc3JmSGVhZGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBnZXRDb29raWVCeU5hbWUoQ09PS0lFX1RPS0VOX05BTUUpO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xyXG5cclxuICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgIGhlYWRlcnNbSEVBREVSX1RPS0VOX05BTUVdID0gdG9rZW47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVhZGVycztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBDU1JGIHRva2VuIGhlYWRlciBhZGRpdGlvbiBmcm9tIGNvb2tpZS4gXHJcbiAqIFxyXG4gKi9cclxuY29uc3QgcmVnaXN0ZXIgPSAoKSA9PiB7XHJcbiAgICByZWdpc3RlclByZUZldGNoVHJhbnNmb3JtKCh7IHVybERhdGEsIGRhdGEsIG9wdGlvbnMgfSkgPT4ge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIG9wdGlvbnMuaGVhZGVycyA9IHsgLi4uYnVpbGRYc3JmSGVhZGVyKCksIC4uLm9wdGlvbnMuaGVhZGVycyB9O1xyXG4gICAgICAgIHJldHVybiB7IHVybERhdGEsIGRhdGEsIG9wdGlvbnMgfVxyXG4gICAgfSlcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyO1xyXG5leHBvcnQge1xyXG4gICAgZ2V0Q29va2llQnlOYW1lLFxyXG4gICAgYnVpbGRYc3JmSGVhZGVyXHJcbn07Il19