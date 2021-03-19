'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apiDriver = require('../api-driver');

/**
 * Register adding ORIGIN_URL_APP header, with url from the page the service was called from. 
 */
var register = function register() {
    (0, _apiDriver.registerPreFetchTransform)(function (_ref) {
        var urlData = _ref.urlData,
            data = _ref.data,
            options = _ref.options;

        options = options || {};
        options.headers = Object.assign({ ORIGIN_URL_APP: location.href }, options.headers);
        return { urlData: urlData, data: data, options: options };
    });
};

exports.default = register;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJyZWdpc3RlciIsInVybERhdGEiLCJkYXRhIiwib3B0aW9ucyIsImhlYWRlcnMiLCJPUklHSU5fVVJMX0FQUCIsImxvY2F0aW9uIiwiaHJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUE7OztBQUdBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxHQUFNO0FBQ25CLDhDQUEwQixnQkFBZ0M7QUFBQSxZQUE3QkMsT0FBNkIsUUFBN0JBLE9BQTZCO0FBQUEsWUFBcEJDLElBQW9CLFFBQXBCQSxJQUFvQjtBQUFBLFlBQWRDLE9BQWMsUUFBZEEsT0FBYzs7QUFDdERBLGtCQUFVQSxXQUFXLEVBQXJCO0FBQ0FBLGdCQUFRQyxPQUFSLG1CQUFvQkMsZ0JBQWdCQyxTQUFTQyxJQUE3QyxJQUFzREosUUFBUUMsT0FBOUQ7QUFDQSxlQUFPLEVBQUVILGdCQUFGLEVBQVdDLFVBQVgsRUFBaUJDLGdCQUFqQixFQUFQO0FBQ0gsS0FKRDtBQUtILENBTkQ7O2tCQVFlSCxRIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZ2lzdGVyUHJlRmV0Y2hUcmFuc2Zvcm0gfSBmcm9tICcuLi9hcGktZHJpdmVyJztcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhZGRpbmcgT1JJR0lOX1VSTF9BUFAgaGVhZGVyLCB3aXRoIHVybCBmcm9tIHRoZSBwYWdlIHRoZSBzZXJ2aWNlIHdhcyBjYWxsZWQgZnJvbS4gXHJcbiAqL1xyXG5jb25zdCByZWdpc3RlciA9ICgpID0+IHtcclxuICAgIHJlZ2lzdGVyUHJlRmV0Y2hUcmFuc2Zvcm0oKHsgdXJsRGF0YSwgZGF0YSwgb3B0aW9ucyB9KSA9PiB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0geyBPUklHSU5fVVJMX0FQUDogbG9jYXRpb24uaHJlZiwgLi4ub3B0aW9ucy5oZWFkZXJzIH07XHJcbiAgICAgICAgcmV0dXJuIHsgdXJsRGF0YSwgZGF0YSwgb3B0aW9ucyB9XHJcbiAgICB9KVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXI7Il19