'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setCacheDuration = exports.getCacheDuration = exports.set = exports.getElement = exports.get = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _check = require('../util/object/check');

var _check2 = _interopRequireDefault(_check);

var _check3 = require('../util/string/check');

var _check4 = _interopRequireDefault(_check3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _immutable2.default.Map({});


var cacheDuration = 1000 * 60;

/**
 * Sets the cache duration (defaults to 1 min).
 */
function setCacheDuration(newDuration) {
    cacheDuration = newDuration;
}

/**
 * Gets the cache duration.
 */
function getCacheDuration() {
    return cacheDuration;
}

/**
 * Set the reference configuration.
 * @param {object}  newConf         - The new configuration to set.
 * @param {Boolean} isClearPrevious - Does the config should be reset.
 */
function setConfig(newConf, isClearPrevious) {
    (0, _check2.default)(newConf);
    config = isClearPrevious ? _immutable2.default.fromJS(newConf) : config.merge(newConf);
}

/**
 * Get a configuration copy.
 * @returns {object} - A copy of the configuration.
 */
function getConfig() {
    return config.toJS();
}

/**
 * Get an element from the configuration using its name.
 * @param {string} name - The key identifier of the configuration.
 * @returns {object} - The configuration of the list element.
 */
function getConfigElement(name) {
    (0, _check4.default)('name', name);
    if (config.has(name)) {
        return config.get(name);
    }
}

exports.get = getConfig;
exports.getElement = getConfigElement;
exports.set = setConfig;
exports.getCacheDuration = getCacheDuration;
exports.setCacheDuration = setCacheDuration;
exports.default = {
    get: getConfig,
    getElement: getConfigElement,
    set: setConfig,
    getCacheDuration: getCacheDuration,
    setCacheDuration: setCacheDuration

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJJbW11dGFibGUiLCJNYXAiLCJjYWNoZUR1cmF0aW9uIiwic2V0Q2FjaGVEdXJhdGlvbiIsIm5ld0R1cmF0aW9uIiwiZ2V0Q2FjaGVEdXJhdGlvbiIsInNldENvbmZpZyIsIm5ld0NvbmYiLCJpc0NsZWFyUHJldmlvdXMiLCJmcm9tSlMiLCJtZXJnZSIsImdldENvbmZpZyIsInRvSlMiLCJnZXRDb25maWdFbGVtZW50IiwibmFtZSIsImhhcyIsImdldCIsImdldEVsZW1lbnQiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUZBLElBQUlBLFNBQVNDLG9CQUFVQyxHQUFWLENBQWMsRUFBZCxDQUFiOzs7QUFJQSxJQUFJQyxnQkFBZ0IsT0FBTyxFQUEzQjs7QUFFQTs7O0FBR0EsU0FBU0MsZ0JBQVQsQ0FBMEJDLFdBQTFCLEVBQXVDO0FBQ25DRixvQkFBZ0JFLFdBQWhCO0FBQ0g7O0FBRUQ7OztBQUdBLFNBQVNDLGdCQUFULEdBQTRCO0FBQ3hCLFdBQU9ILGFBQVA7QUFDSDs7QUFFRDs7Ozs7QUFLQSxTQUFTSSxTQUFULENBQW1CQyxPQUFuQixFQUE0QkMsZUFBNUIsRUFBNkM7QUFDekMseUJBQWNELE9BQWQ7QUFDQVIsYUFBU1Msa0JBQWtCUixvQkFBVVMsTUFBVixDQUFpQkYsT0FBakIsQ0FBbEIsR0FBOENSLE9BQU9XLEtBQVAsQ0FBYUgsT0FBYixDQUF2RDtBQUNIOztBQUVEOzs7O0FBSUEsU0FBU0ksU0FBVCxHQUFxQjtBQUNqQixXQUFPWixPQUFPYSxJQUFQLEVBQVA7QUFDSDs7QUFFRDs7Ozs7QUFLQSxTQUFTQyxnQkFBVCxDQUEwQkMsSUFBMUIsRUFBZ0M7QUFDNUIseUJBQWMsTUFBZCxFQUFzQkEsSUFBdEI7QUFDQSxRQUFJZixPQUFPZ0IsR0FBUCxDQUFXRCxJQUFYLENBQUosRUFBc0I7QUFDbEIsZUFBT2YsT0FBT2lCLEdBQVAsQ0FBV0YsSUFBWCxDQUFQO0FBQ0g7QUFDSjs7UUFHZ0JFLEcsR0FBYkwsUztRQUNvQk0sVSxHQUFwQkosZ0I7UUFDYUssRyxHQUFiWixTO1FBQ0FELGdCLEdBQUFBLGdCO1FBQ0FGLGdCLEdBQUFBLGdCO2tCQUdXO0FBQ1hhLFNBQUtMLFNBRE07QUFFWE0sZ0JBQVlKLGdCQUZEO0FBR1hLLFNBQUtaLFNBSE07QUFJWEQsc0NBSlc7QUFLWEY7O0FBTFcsQyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XHJcbmxldCBjb25maWcgPSBJbW11dGFibGUuTWFwKHt9KTtcclxuaW1wb3J0IGNoZWNrSXNPYmplY3QgZnJvbSAnLi4vdXRpbC9vYmplY3QvY2hlY2snO1xyXG5pbXBvcnQgY2hlY2tJc1N0cmluZyBmcm9tICcuLi91dGlsL3N0cmluZy9jaGVjayc7XHJcblxyXG5sZXQgY2FjaGVEdXJhdGlvbiA9IDEwMDAgKiA2MDtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBjYWNoZSBkdXJhdGlvbiAoZGVmYXVsdHMgdG8gMSBtaW4pLlxyXG4gKi9cclxuZnVuY3Rpb24gc2V0Q2FjaGVEdXJhdGlvbihuZXdEdXJhdGlvbikge1xyXG4gICAgY2FjaGVEdXJhdGlvbiA9IG5ld0R1cmF0aW9uO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgY2FjaGUgZHVyYXRpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDYWNoZUR1cmF0aW9uKCkge1xyXG4gICAgcmV0dXJuIGNhY2hlRHVyYXRpb247XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHJlZmVyZW5jZSBjb25maWd1cmF0aW9uLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gIG5ld0NvbmYgICAgICAgICAtIFRoZSBuZXcgY29uZmlndXJhdGlvbiB0byBzZXQuXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNDbGVhclByZXZpb3VzIC0gRG9lcyB0aGUgY29uZmlnIHNob3VsZCBiZSByZXNldC5cclxuICovXHJcbmZ1bmN0aW9uIHNldENvbmZpZyhuZXdDb25mLCBpc0NsZWFyUHJldmlvdXMpIHtcclxuICAgIGNoZWNrSXNPYmplY3QobmV3Q29uZik7XHJcbiAgICBjb25maWcgPSBpc0NsZWFyUHJldmlvdXMgPyBJbW11dGFibGUuZnJvbUpTKG5ld0NvbmYpIDogY29uZmlnLm1lcmdlKG5ld0NvbmYpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IGEgY29uZmlndXJhdGlvbiBjb3B5LlxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSAtIEEgY29weSBvZiB0aGUgY29uZmlndXJhdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbmZpZygpIHtcclxuICAgIHJldHVybiBjb25maWcudG9KUygpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IGFuIGVsZW1lbnQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiB1c2luZyBpdHMgbmFtZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUga2V5IGlkZW50aWZpZXIgb2YgdGhlIGNvbmZpZ3VyYXRpb24uXHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGxpc3QgZWxlbWVudC5cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbmZpZ0VsZW1lbnQobmFtZSkge1xyXG4gICAgY2hlY2tJc1N0cmluZygnbmFtZScsIG5hbWUpO1xyXG4gICAgaWYgKGNvbmZpZy5oYXMobmFtZSkpIHtcclxuICAgICAgICByZXR1cm4gY29uZmlnLmdldChuYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIGdldENvbmZpZyBhcyBnZXQsXHJcbiAgICBnZXRDb25maWdFbGVtZW50IGFzIGdldEVsZW1lbnQsXHJcbiAgICBzZXRDb25maWcgYXMgc2V0LFxyXG4gICAgZ2V0Q2FjaGVEdXJhdGlvbixcclxuICAgIHNldENhY2hlRHVyYXRpb25cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGdldDogZ2V0Q29uZmlnLFxyXG4gICAgZ2V0RWxlbWVudDogZ2V0Q29uZmlnRWxlbWVudCxcclxuICAgIHNldDogc2V0Q29uZmlnLFxyXG4gICAgZ2V0Q2FjaGVEdXJhdGlvbixcclxuICAgIHNldENhY2hlRHVyYXRpb25cclxuXHJcbn07XHJcbiJdfQ==