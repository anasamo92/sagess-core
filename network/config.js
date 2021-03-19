'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = exports.configure = undefined;

var _merge = require('lodash/object/merge');

var _merge2 = _interopRequireDefault(_merge);

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _cloneDeep = require('lodash/lang/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Configuration object. Except for xhrErrors, see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 */
var configuration = {
    xhrErrors: {},
    mode: 'cors', //cors, no-cors, same-origin
    credentials: 'same-origin', //omit, same-origin, include
    cache: 'no-cache', //default, no-store, reload, no-cache, force-cache, ou only-if-cached.
    redirect: 'follow' // follow, manual, error
};

/**
 * Function which overrides the configuration.
 * @param {object} conf configuration to merge with existing conf
 */
function configure(conf) {
    if (!(0, _isObject2.default)(conf)) {
        throw new Error('Network configuration should be an object');
    }
    (0, _merge2.default)(configuration, conf);
}

/**
 * Getter on the configuration, returning a clone of the configuration.
 *
 * @returns {object} a copy of the current configuration
 */
function get() {
    return (0, _cloneDeep2.default)(configuration);
}

exports.configure = configure;
exports.get = get;
exports.default = {
    configure: configure,
    get: get
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJjb25maWd1cmF0aW9uIiwieGhyRXJyb3JzIiwibW9kZSIsImNyZWRlbnRpYWxzIiwiY2FjaGUiLCJyZWRpcmVjdCIsImNvbmZpZ3VyZSIsImNvbmYiLCJFcnJvciIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQUdBLElBQUlBLGdCQUFnQjtBQUNoQkMsZUFBVyxFQURLO0FBRWhCQyxVQUFNLE1BRlUsRUFFRjtBQUNkQyxpQkFBYSxhQUhHLEVBR1k7QUFDNUJDLFdBQU8sVUFKUyxFQUlHO0FBQ25CQyxjQUFVLFFBTE0sQ0FLRztBQUxILENBQXBCOztBQVFBOzs7O0FBSUEsU0FBU0MsU0FBVCxDQUFtQkMsSUFBbkIsRUFBeUI7QUFDckIsUUFBSSxDQUFDLHdCQUFTQSxJQUFULENBQUwsRUFBcUI7QUFDakIsY0FBTSxJQUFJQyxLQUFKLENBQVUsMkNBQVYsQ0FBTjtBQUNIO0FBQ0QseUJBQU1SLGFBQU4sRUFBcUJPLElBQXJCO0FBQ0g7O0FBRUQ7Ozs7O0FBS0EsU0FBU0UsR0FBVCxHQUFlO0FBQ1gsV0FBTyx5QkFBTVQsYUFBTixDQUFQO0FBQ0g7O1FBR0dNLFMsR0FBQUEsUztRQUNBRyxHLEdBQUFBLEc7a0JBR1c7QUFDWEgsd0JBRFc7QUFFWEc7QUFGVyxDIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gvb2JqZWN0L21lcmdlJztcclxuaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9sYW5nL2lzT2JqZWN0JztcclxuaW1wb3J0IGNsb25lIGZyb20gJ2xvZGFzaC9sYW5nL2Nsb25lRGVlcCc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBvYmplY3QuIEV4Y2VwdCBmb3IgeGhyRXJyb3JzLCBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd09yV29ya2VyR2xvYmFsU2NvcGUvZmV0Y2hcclxuICovXHJcbmxldCBjb25maWd1cmF0aW9uID0ge1xyXG4gICAgeGhyRXJyb3JzOiB7fSxcclxuICAgIG1vZGU6ICdjb3JzJywgLy9jb3JzLCBuby1jb3JzLCBzYW1lLW9yaWdpblxyXG4gICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsIC8vb21pdCwgc2FtZS1vcmlnaW4sIGluY2x1ZGVcclxuICAgIGNhY2hlOiAnbm8tY2FjaGUnLCAvL2RlZmF1bHQsIG5vLXN0b3JlLCByZWxvYWQsIG5vLWNhY2hlLCBmb3JjZS1jYWNoZSwgb3Ugb25seS1pZi1jYWNoZWQuXHJcbiAgICByZWRpcmVjdDogJ2ZvbGxvdycgLy8gZm9sbG93LCBtYW51YWwsIGVycm9yXHJcbn07XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gd2hpY2ggb3ZlcnJpZGVzIHRoZSBjb25maWd1cmF0aW9uLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZiBjb25maWd1cmF0aW9uIHRvIG1lcmdlIHdpdGggZXhpc3RpbmcgY29uZlxyXG4gKi9cclxuZnVuY3Rpb24gY29uZmlndXJlKGNvbmYpIHtcclxuICAgIGlmICghaXNPYmplY3QoY29uZikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgY29uZmlndXJhdGlvbiBzaG91bGQgYmUgYW4gb2JqZWN0JylcclxuICAgIH1cclxuICAgIG1lcmdlKGNvbmZpZ3VyYXRpb24sIGNvbmYpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0dGVyIG9uIHRoZSBjb25maWd1cmF0aW9uLCByZXR1cm5pbmcgYSBjbG9uZSBvZiB0aGUgY29uZmlndXJhdGlvbi5cclxuICpcclxuICogQHJldHVybnMge29iamVjdH0gYSBjb3B5IG9mIHRoZSBjdXJyZW50IGNvbmZpZ3VyYXRpb25cclxuICovXHJcbmZ1bmN0aW9uIGdldCgpIHtcclxuICAgIHJldHVybiBjbG9uZShjb25maWd1cmF0aW9uKTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIGNvbmZpZ3VyZSxcclxuICAgIGdldFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29uZmlndXJlLFxyXG4gICAgZ2V0XHJcbn07XHJcbiJdfQ==