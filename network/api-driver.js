'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerPostFetchTransform = exports.registerPreFetchTransform = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _pairs = require('lodash/object/pairs');

var _pairs2 = _interopRequireDefault(_pairs);

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _builder = require('../util/url/builder');

var _builder2 = _interopRequireDefault(_builder);

var _rename = require('../util/function/rename');

var _rename2 = _interopRequireDefault(_rename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultMethod = 'GET';

var preFetchActions = [];
var postFetchActions = [];

/**
 * Utility function, to build a query string from an object
 * 
 * @param {object} obj the object to serialize in a query string
 * @param {string} [prefix=''] the name of the object in the query string
 * @returns {string} the built query string
 */
var buildQueryString = function buildQueryString(obj) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var queryString = '';
    if ((0, _isObject2.default)(obj)) {
        queryString = (0, _pairs2.default)(obj).reduce(function (acc, _ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            return acc + (acc && acc !== '' && !acc.endsWith('&') ? '&' : '') + buildQueryString(value, prefix !== '' ? prefix + '.' + key : key);
        }, '');
    } else if (prefix && prefix !== '') {
        queryString = prefix + '=' + encodeURIComponent(obj);
    }
    return queryString;
};

/**
 * Utility method that ensure that data passed in the url is properly encoded
 * 
 * @param {any} urlData the data to pass in the url
 * @returns {any} the data properly encoded
 */
var urlDataObjectBuilder = function urlDataObjectBuilder(urlData) {
    var escapedUrlData = {};
    var propData = {};
    for (var prop in urlData) {
        propData = urlData[prop];

        if ((0, _isArray2.default)(propData)) {
            escapedUrlData[prop] = propData.map(urlDataObjectBuilder);
        } else if ((0, _isObject2.default)(propData)) {
            escapedUrlData[prop] = urlDataObjectBuilder(propData);
        } else {
            escapedUrlData[prop] = encodeURIComponent(propData);
        }
    }

    return escapedUrlData;
};

/**
 * Register a function to transform data before giving it to. It can be to add headers, etc.
 * The function must take one argument, an object {urlData, data, options} and return an object of the same format.
 * All registered functions are called sequentially on data.    
 *
 * @param {function} action a function to transform an object to another object of the same format
 */
var registerPreFetchTransform = function registerPreFetchTransform(action) {
    if (!action || typeof action !== 'function') {
        throw new Error('A transform action must be a function');
    }
    preFetchActions.push(action);
};

/**
 * Register a function to transform data after the fetch return.
 * The function must take one argument, an object {data, options} and return an object of the same format.
 * All registered functions are called sequentially on data.    
 *
 * @param {function} action a function to transform an object to another object of the same format
 */
var registerPostFetchTransform = function registerPostFetchTransform(action) {
    if (!action || typeof action !== 'function') {
        throw new Error('A transform action must be a function');
    }
    postFetchActions.push(action);
};

/**
 * Private function, to simplify call to fetch.
 *
 * @param {function} urlFunc the result of the call to urlBuilder.
 * @param {object} urlData data to provide in the url
 * @param {object} bodyData data to provide in the body of the request
 * @param {object} options options for fetch
 * @returns {any} the result of the fetch call
 */
var fetchCall = function fetchCall(urlFunc, urlData, bodyData, options) {
    return (0, _fetch2.default)(urlFunc({
        urlData: urlDataObjectBuilder(urlData || {}),
        data: bodyData
    }), options);
};
/* eslint-disable valid-jsdoc */
/**
 * Build api driver method, from url, method and function name.
 *
 * @param {object} { url, method = defaultMethod } object containing url and method
 * @param {string} funcName name to give to the function
 * @returns {function} the built function
 */
var buildApiDriverMethod = function buildApiDriverMethod(_ref3, funcName) {
    var url = _ref3.url,
        _ref3$method = _ref3.method,
        method = _ref3$method === undefined ? defaultMethod : _ref3$method;

    /* eslint-disable require-jsdoc */
    var toRename = function toRename(urlData, data, optionsArg) {
        var options = optionsArg || {};
        var transformed = preFetchActions.reduce(function (data, func) {
            return func(data);
        }, { urlData: urlData, data: data, options: options });
        return fetchCall((0, _builder2.default)(url + (options.queryObj ? '?' + buildQueryString(options.queryObj) : ''), method), transformed.urlData, transformed.data, transformed.options).then(function (dataResult) {
            return postFetchActions.reduce(function (data, func) {
                return func(data, options);
            }, dataResult);
        });
    };
    (0, _rename2.default)(toRename, funcName);
    return toRename;
};
/* eslint-enable */

/**
 * Function, to build API driver, so easy call can be made in service.
 *
 * @param {object} urls an object containing for each key an url and a method, like { getById : { url: 'api/test/action/', method: 'GET' } }
 * @returns {object} an object, with properties named as the config given, like a DAO or DAL (myDriver.loadMyObject({id:myId}), or myDriver.saveMyObject(null, toSave)).
 */
var apiDriverBuilder = function apiDriverBuilder(urls) {
    if (!urls || (typeof urls === 'undefined' ? 'undefined' : _typeof(urls)) !== 'object') {
        throw new Error('The config given to api driver must be an object, like { getById : { url: \'api/test/action/\', method: \'GET\' } }, instead got :' + urls);
    }
    return (0, _pairs2.default)(urls).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            prop = _ref5[0],
            url = _ref5[1];

        if (!url || !url.url || typeof url.url !== 'string') {
            throw new Error(prop + ' does not contain an url for property url, instead got : ' + url);
        }
        return [prop, url];
    }).reduce(function (apiDriver, _ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            prop = _ref7[0],
            url = _ref7[1];

        apiDriver[prop] = buildApiDriverMethod(url, prop);
        return apiDriver;
    }, {});
};

exports.default = apiDriverBuilder;
exports.registerPreFetchTransform = registerPreFetchTransform;
exports.registerPostFetchTransform = registerPostFetchTransform;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0TWV0aG9kIiwicHJlRmV0Y2hBY3Rpb25zIiwicG9zdEZldGNoQWN0aW9ucyIsImJ1aWxkUXVlcnlTdHJpbmciLCJvYmoiLCJwcmVmaXgiLCJxdWVyeVN0cmluZyIsInJlZHVjZSIsImFjYyIsImtleSIsInZhbHVlIiwiZW5kc1dpdGgiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ1cmxEYXRhT2JqZWN0QnVpbGRlciIsInVybERhdGEiLCJlc2NhcGVkVXJsRGF0YSIsInByb3BEYXRhIiwicHJvcCIsIm1hcCIsInJlZ2lzdGVyUHJlRmV0Y2hUcmFuc2Zvcm0iLCJhY3Rpb24iLCJFcnJvciIsInB1c2giLCJyZWdpc3RlclBvc3RGZXRjaFRyYW5zZm9ybSIsImZldGNoQ2FsbCIsInVybEZ1bmMiLCJib2R5RGF0YSIsIm9wdGlvbnMiLCJkYXRhIiwiYnVpbGRBcGlEcml2ZXJNZXRob2QiLCJmdW5jTmFtZSIsInVybCIsIm1ldGhvZCIsInRvUmVuYW1lIiwib3B0aW9uc0FyZyIsInRyYW5zZm9ybWVkIiwiZnVuYyIsInF1ZXJ5T2JqIiwidGhlbiIsImRhdGFSZXN1bHQiLCJhcGlEcml2ZXJCdWlsZGVyIiwidXJscyIsImFwaURyaXZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixLQUF0Qjs7QUFFQSxJQUFNQyxrQkFBa0IsRUFBeEI7QUFDQSxJQUFNQyxtQkFBbUIsRUFBekI7O0FBR0E7Ozs7Ozs7QUFPQSxJQUFNQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFDQyxHQUFELEVBQXNCO0FBQUEsUUFBaEJDLE1BQWdCLHVFQUFQLEVBQU87O0FBQzNDLFFBQUlDLGNBQWMsRUFBbEI7QUFDQSxRQUFJLHdCQUFTRixHQUFULENBQUosRUFBbUI7QUFDZkUsc0JBQWMscUJBQVFGLEdBQVIsRUFBYUcsTUFBYixDQUFvQixVQUFDQyxHQUFELFFBQXVCO0FBQUE7QUFBQSxnQkFBaEJDLEdBQWdCO0FBQUEsZ0JBQVhDLEtBQVc7O0FBQ3JELG1CQUFPRixPQUFPQSxPQUFPQSxRQUFRLEVBQWYsSUFBcUIsQ0FBQ0EsSUFBSUcsUUFBSixDQUFhLEdBQWIsQ0FBdEIsR0FBMEMsR0FBMUMsR0FBZ0QsRUFBdkQsSUFBNkRSLGlCQUFpQk8sS0FBakIsRUFBd0JMLFdBQVcsRUFBWCxHQUFnQkEsU0FBUyxHQUFULEdBQWVJLEdBQS9CLEdBQXFDQSxHQUE3RCxDQUFwRTtBQUNILFNBRmEsRUFFWCxFQUZXLENBQWQ7QUFHSCxLQUpELE1BSU8sSUFBSUosVUFBVUEsV0FBVyxFQUF6QixFQUE2QjtBQUNoQ0Msc0JBQWNELFNBQVMsR0FBVCxHQUFlTyxtQkFBbUJSLEdBQW5CLENBQTdCO0FBQ0g7QUFDRCxXQUFPRSxXQUFQO0FBQ0gsQ0FWRDs7QUFZQTs7Ozs7O0FBTUEsSUFBTU8sdUJBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBQ0MsT0FBRCxFQUFhO0FBQ3RDLFFBQUlDLGlCQUFpQixFQUFyQjtBQUNBLFFBQUlDLFdBQVcsRUFBZjtBQUNBLFNBQUssSUFBSUMsSUFBVCxJQUFpQkgsT0FBakIsRUFBMEI7QUFDdEJFLG1CQUFXRixRQUFRRyxJQUFSLENBQVg7O0FBRUEsWUFBSSx1QkFBUUQsUUFBUixDQUFKLEVBQXVCO0FBQ25CRCwyQkFBZUUsSUFBZixJQUF1QkQsU0FBU0UsR0FBVCxDQUFhTCxvQkFBYixDQUF2QjtBQUNILFNBRkQsTUFFTyxJQUFJLHdCQUFTRyxRQUFULENBQUosRUFBd0I7QUFDM0JELDJCQUFlRSxJQUFmLElBQXVCSixxQkFBcUJHLFFBQXJCLENBQXZCO0FBQ0gsU0FGTSxNQUVBO0FBQ0hELDJCQUFlRSxJQUFmLElBQXVCTCxtQkFBbUJJLFFBQW5CLENBQXZCO0FBQ0g7QUFDSjs7QUFFRCxXQUFPRCxjQUFQO0FBQ0gsQ0FoQkQ7O0FBa0JBOzs7Ozs7O0FBT0EsSUFBTUksNEJBQTRCLFNBQTVCQSx5QkFBNEIsQ0FBQ0MsTUFBRCxFQUFZO0FBQzFDLFFBQUksQ0FBQ0EsTUFBRCxJQUFXLE9BQVFBLE1BQVIsS0FBb0IsVUFBbkMsRUFBK0M7QUFDM0MsY0FBTSxJQUFJQyxLQUFKLENBQVUsdUNBQVYsQ0FBTjtBQUNIO0FBQ0RwQixvQkFBZ0JxQixJQUFoQixDQUFxQkYsTUFBckI7QUFDSCxDQUxEOztBQU9BOzs7Ozs7O0FBT0EsSUFBTUcsNkJBQTZCLFNBQTdCQSwwQkFBNkIsQ0FBQ0gsTUFBRCxFQUFZO0FBQzNDLFFBQUksQ0FBQ0EsTUFBRCxJQUFXLE9BQVFBLE1BQVIsS0FBb0IsVUFBbkMsRUFBK0M7QUFDM0MsY0FBTSxJQUFJQyxLQUFKLENBQVUsdUNBQVYsQ0FBTjtBQUNIO0FBQ0RuQixxQkFBaUJvQixJQUFqQixDQUFzQkYsTUFBdEI7QUFDSCxDQUxEOztBQU9BOzs7Ozs7Ozs7QUFTQSxJQUFNSSxZQUFZLFNBQVpBLFNBQVksQ0FBQ0MsT0FBRCxFQUFVWCxPQUFWLEVBQW1CWSxRQUFuQixFQUE2QkMsT0FBN0I7QUFBQSxXQUNkLHFCQUNJRixRQUFRO0FBQ0pYLGlCQUFTRCxxQkFBcUJDLFdBQVcsRUFBaEMsQ0FETDtBQUVKYyxjQUFNRjtBQUZGLEtBQVIsQ0FESixFQUlRQyxPQUpSLENBRGM7QUFBQSxDQUFsQjtBQVFBO0FBQ0E7Ozs7Ozs7QUFPQSxJQUFNRSx1QkFBdUIsU0FBdkJBLG9CQUF1QixRQUFrQ0MsUUFBbEMsRUFBK0M7QUFBQSxRQUE1Q0MsR0FBNEMsU0FBNUNBLEdBQTRDO0FBQUEsNkJBQXZDQyxNQUF1QztBQUFBLFFBQXZDQSxNQUF1QyxnQ0FBOUJoQyxhQUE4Qjs7QUFDeEU7QUFDQSxRQUFNaUMsV0FBVyxTQUFYQSxRQUFXLENBQUNuQixPQUFELEVBQVVjLElBQVYsRUFBZ0JNLFVBQWhCLEVBQStCO0FBQzVDLFlBQU1QLFVBQVVPLGNBQWMsRUFBOUI7QUFDQSxZQUFNQyxjQUFjbEMsZ0JBQWdCTSxNQUFoQixDQUF1QixVQUFDcUIsSUFBRCxFQUFPUSxJQUFQO0FBQUEsbUJBQWlCQSxLQUFLUixJQUFMLENBQWpCO0FBQUEsU0FBdkIsRUFBcUQsRUFBRWQsZ0JBQUYsRUFBV2MsVUFBWCxFQUFpQkQsZ0JBQWpCLEVBQXJELENBQXBCO0FBQ0EsZUFBT0gsVUFDSCx1QkFBV08sT0FBT0osUUFBUVUsUUFBUixHQUFtQixNQUFNbEMsaUJBQWlCd0IsUUFBUVUsUUFBekIsQ0FBekIsR0FBOEQsRUFBckUsQ0FBWCxFQUFxRkwsTUFBckYsQ0FERyxFQUVIRyxZQUFZckIsT0FGVCxFQUdIcUIsWUFBWVAsSUFIVCxFQUlITyxZQUFZUixPQUpULEVBS0xXLElBTEssQ0FLQSxVQUFDQyxVQUFELEVBQWdCO0FBQ25CLG1CQUFPckMsaUJBQWlCSyxNQUFqQixDQUF3QixVQUFDcUIsSUFBRCxFQUFPUSxJQUFQLEVBQWdCO0FBQzNDLHVCQUFPQSxLQUFLUixJQUFMLEVBQVdELE9BQVgsQ0FBUDtBQUNILGFBRk0sRUFFSlksVUFGSSxDQUFQO0FBR0gsU0FUTSxDQUFQO0FBVUgsS0FiRDtBQWNBLDBCQUFPTixRQUFQLEVBQWlCSCxRQUFqQjtBQUNBLFdBQU9HLFFBQVA7QUFDSCxDQWxCRDtBQW1CQTs7QUFFQTs7Ozs7O0FBTUEsSUFBTU8sbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsSUFBRCxFQUFVO0FBQy9CLFFBQUksQ0FBQ0EsSUFBRCxJQUFTLFFBQU9BLElBQVAseUNBQU9BLElBQVAsT0FBZ0IsUUFBN0IsRUFBdUM7QUFDbkMsY0FBTSxJQUFJcEIsS0FBSixDQUFVLHVJQUF1SW9CLElBQWpKLENBQU47QUFDSDtBQUNELFdBQU8scUJBQVFBLElBQVIsRUFDRnZCLEdBREUsQ0FDRSxpQkFBaUI7QUFBQTtBQUFBLFlBQWZELElBQWU7QUFBQSxZQUFUYyxHQUFTOztBQUNsQixZQUFJLENBQUNBLEdBQUQsSUFBUSxDQUFDQSxJQUFJQSxHQUFiLElBQW9CLE9BQU9BLElBQUlBLEdBQVgsS0FBbUIsUUFBM0MsRUFBcUQ7QUFDakQsa0JBQU0sSUFBSVYsS0FBSixDQUFhSixJQUFILGlFQUFxRWMsR0FBL0UsQ0FBTjtBQUNIO0FBQ0QsZUFBTyxDQUFDZCxJQUFELEVBQU9jLEdBQVAsQ0FBUDtBQUNILEtBTkUsRUFPRnhCLE1BUEUsQ0FPSyxVQUFDbUMsU0FBRCxTQUE0QjtBQUFBO0FBQUEsWUFBZnpCLElBQWU7QUFBQSxZQUFUYyxHQUFTOztBQUNoQ1csa0JBQVV6QixJQUFWLElBQWtCWSxxQkFBcUJFLEdBQXJCLEVBQTBCZCxJQUExQixDQUFsQjtBQUNBLGVBQU95QixTQUFQO0FBQ0gsS0FWRSxFQVVBLEVBVkEsQ0FBUDtBQVdILENBZkQ7O2tCQWlCZUYsZ0I7UUFDTnJCLHlCLEdBQUFBLHlCO1FBQTJCSSwwQixHQUFBQSwwQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZW50cmllcyBmcm9tICdsb2Rhc2gvb2JqZWN0L3BhaXJzJztcclxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoL2xhbmcvaXNBcnJheSc7XHJcbmltcG9ydCBpc09iamVjdCBmcm9tICdsb2Rhc2gvbGFuZy9pc09iamVjdCc7XHJcblxyXG5pbXBvcnQgZmV0Y2ggZnJvbSAnLi9mZXRjaCc7XHJcbmltcG9ydCB1cmxCdWlsZGVyIGZyb20gJy4uL3V0aWwvdXJsL2J1aWxkZXInO1xyXG5pbXBvcnQgcmVuYW1lIGZyb20gJy4uL3V0aWwvZnVuY3Rpb24vcmVuYW1lJztcclxuXHJcbmNvbnN0IGRlZmF1bHRNZXRob2QgPSAnR0VUJztcclxuXHJcbmNvbnN0IHByZUZldGNoQWN0aW9ucyA9IFtdO1xyXG5jb25zdCBwb3N0RmV0Y2hBY3Rpb25zID0gW107XHJcblxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgZnVuY3Rpb24sIHRvIGJ1aWxkIGEgcXVlcnkgc3RyaW5nIGZyb20gYW4gb2JqZWN0XHJcbiAqIFxyXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqIHRoZSBvYmplY3QgdG8gc2VyaWFsaXplIGluIGEgcXVlcnkgc3RyaW5nXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcHJlZml4PScnXSB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0IGluIHRoZSBxdWVyeSBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGJ1aWx0IHF1ZXJ5IHN0cmluZ1xyXG4gKi9cclxuY29uc3QgYnVpbGRRdWVyeVN0cmluZyA9IChvYmosIHByZWZpeCA9ICcnKSA9PiB7XHJcbiAgICBsZXQgcXVlcnlTdHJpbmcgPSAnJztcclxuICAgIGlmIChpc09iamVjdChvYmopKSB7XHJcbiAgICAgICAgcXVlcnlTdHJpbmcgPSBlbnRyaWVzKG9iaikucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjICsgKGFjYyAmJiBhY2MgIT09ICcnICYmICFhY2MuZW5kc1dpdGgoJyYnKSA/ICcmJyA6ICcnKSArIGJ1aWxkUXVlcnlTdHJpbmcodmFsdWUsIHByZWZpeCAhPT0gJycgPyBwcmVmaXggKyAnLicgKyBrZXkgOiBrZXkpO1xyXG4gICAgICAgIH0sICcnKTtcclxuICAgIH0gZWxzZSBpZiAocHJlZml4ICYmIHByZWZpeCAhPT0gJycpIHtcclxuICAgICAgICBxdWVyeVN0cmluZyA9IHByZWZpeCArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmopO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHF1ZXJ5U3RyaW5nO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgbWV0aG9kIHRoYXQgZW5zdXJlIHRoYXQgZGF0YSBwYXNzZWQgaW4gdGhlIHVybCBpcyBwcm9wZXJseSBlbmNvZGVkXHJcbiAqIFxyXG4gKiBAcGFyYW0ge2FueX0gdXJsRGF0YSB0aGUgZGF0YSB0byBwYXNzIGluIHRoZSB1cmxcclxuICogQHJldHVybnMge2FueX0gdGhlIGRhdGEgcHJvcGVybHkgZW5jb2RlZFxyXG4gKi9cclxuY29uc3QgdXJsRGF0YU9iamVjdEJ1aWxkZXIgPSAodXJsRGF0YSkgPT4ge1xyXG4gICAgbGV0IGVzY2FwZWRVcmxEYXRhID0ge307XHJcbiAgICBsZXQgcHJvcERhdGEgPSB7fTtcclxuICAgIGZvciAobGV0IHByb3AgaW4gdXJsRGF0YSkge1xyXG4gICAgICAgIHByb3BEYXRhID0gdXJsRGF0YVtwcm9wXTtcclxuXHJcbiAgICAgICAgaWYgKGlzQXJyYXkocHJvcERhdGEpKSB7XHJcbiAgICAgICAgICAgIGVzY2FwZWRVcmxEYXRhW3Byb3BdID0gcHJvcERhdGEubWFwKHVybERhdGFPYmplY3RCdWlsZGVyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHByb3BEYXRhKSkge1xyXG4gICAgICAgICAgICBlc2NhcGVkVXJsRGF0YVtwcm9wXSA9IHVybERhdGFPYmplY3RCdWlsZGVyKHByb3BEYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlc2NhcGVkVXJsRGF0YVtwcm9wXSA9IGVuY29kZVVSSUNvbXBvbmVudChwcm9wRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlc2NhcGVkVXJsRGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIGZ1bmN0aW9uIHRvIHRyYW5zZm9ybSBkYXRhIGJlZm9yZSBnaXZpbmcgaXQgdG8uIEl0IGNhbiBiZSB0byBhZGQgaGVhZGVycywgZXRjLlxyXG4gKiBUaGUgZnVuY3Rpb24gbXVzdCB0YWtlIG9uZSBhcmd1bWVudCwgYW4gb2JqZWN0IHt1cmxEYXRhLCBkYXRhLCBvcHRpb25zfSBhbmQgcmV0dXJuIGFuIG9iamVjdCBvZiB0aGUgc2FtZSBmb3JtYXQuXHJcbiAqIEFsbCByZWdpc3RlcmVkIGZ1bmN0aW9ucyBhcmUgY2FsbGVkIHNlcXVlbnRpYWxseSBvbiBkYXRhLiAgICBcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uIGEgZnVuY3Rpb24gdG8gdHJhbnNmb3JtIGFuIG9iamVjdCB0byBhbm90aGVyIG9iamVjdCBvZiB0aGUgc2FtZSBmb3JtYXRcclxuICovXHJcbmNvbnN0IHJlZ2lzdGVyUHJlRmV0Y2hUcmFuc2Zvcm0gPSAoYWN0aW9uKSA9PiB7XHJcbiAgICBpZiAoIWFjdGlvbiB8fCB0eXBlb2YgKGFjdGlvbikgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgdHJhbnNmb3JtIGFjdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuICAgIH1cclxuICAgIHByZUZldGNoQWN0aW9ucy5wdXNoKGFjdGlvbik7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBmdW5jdGlvbiB0byB0cmFuc2Zvcm0gZGF0YSBhZnRlciB0aGUgZmV0Y2ggcmV0dXJuLlxyXG4gKiBUaGUgZnVuY3Rpb24gbXVzdCB0YWtlIG9uZSBhcmd1bWVudCwgYW4gb2JqZWN0IHtkYXRhLCBvcHRpb25zfSBhbmQgcmV0dXJuIGFuIG9iamVjdCBvZiB0aGUgc2FtZSBmb3JtYXQuXHJcbiAqIEFsbCByZWdpc3RlcmVkIGZ1bmN0aW9ucyBhcmUgY2FsbGVkIHNlcXVlbnRpYWxseSBvbiBkYXRhLiAgICBcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uIGEgZnVuY3Rpb24gdG8gdHJhbnNmb3JtIGFuIG9iamVjdCB0byBhbm90aGVyIG9iamVjdCBvZiB0aGUgc2FtZSBmb3JtYXRcclxuICovXHJcbmNvbnN0IHJlZ2lzdGVyUG9zdEZldGNoVHJhbnNmb3JtID0gKGFjdGlvbikgPT4ge1xyXG4gICAgaWYgKCFhY3Rpb24gfHwgdHlwZW9mIChhY3Rpb24pICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHRyYW5zZm9ybSBhY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcbiAgICB9XHJcbiAgICBwb3N0RmV0Y2hBY3Rpb25zLnB1c2goYWN0aW9uKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcml2YXRlIGZ1bmN0aW9uLCB0byBzaW1wbGlmeSBjYWxsIHRvIGZldGNoLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB1cmxGdW5jIHRoZSByZXN1bHQgb2YgdGhlIGNhbGwgdG8gdXJsQnVpbGRlci5cclxuICogQHBhcmFtIHtvYmplY3R9IHVybERhdGEgZGF0YSB0byBwcm92aWRlIGluIHRoZSB1cmxcclxuICogQHBhcmFtIHtvYmplY3R9IGJvZHlEYXRhIGRhdGEgdG8gcHJvdmlkZSBpbiB0aGUgYm9keSBvZiB0aGUgcmVxdWVzdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBvcHRpb25zIGZvciBmZXRjaFxyXG4gKiBAcmV0dXJucyB7YW55fSB0aGUgcmVzdWx0IG9mIHRoZSBmZXRjaCBjYWxsXHJcbiAqL1xyXG5jb25zdCBmZXRjaENhbGwgPSAodXJsRnVuYywgdXJsRGF0YSwgYm9keURhdGEsIG9wdGlvbnMpID0+IChcclxuICAgIGZldGNoKFxyXG4gICAgICAgIHVybEZ1bmMoe1xyXG4gICAgICAgICAgICB1cmxEYXRhOiB1cmxEYXRhT2JqZWN0QnVpbGRlcih1cmxEYXRhIHx8IHt9KSxcclxuICAgICAgICAgICAgZGF0YTogYm9keURhdGFcclxuICAgICAgICB9KSwgb3B0aW9uc1xyXG4gICAgKVxyXG4pO1xyXG4vKiBlc2xpbnQtZGlzYWJsZSB2YWxpZC1qc2RvYyAqL1xyXG4vKipcclxuICogQnVpbGQgYXBpIGRyaXZlciBtZXRob2QsIGZyb20gdXJsLCBtZXRob2QgYW5kIGZ1bmN0aW9uIG5hbWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB7IHVybCwgbWV0aG9kID0gZGVmYXVsdE1ldGhvZCB9IG9iamVjdCBjb250YWluaW5nIHVybCBhbmQgbWV0aG9kXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmdW5jTmFtZSBuYW1lIHRvIGdpdmUgdG8gdGhlIGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gdGhlIGJ1aWx0IGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCBidWlsZEFwaURyaXZlck1ldGhvZCA9ICh7IHVybCwgbWV0aG9kID0gZGVmYXVsdE1ldGhvZCB9LCBmdW5jTmFtZSkgPT4ge1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgcmVxdWlyZS1qc2RvYyAqL1xyXG4gICAgY29uc3QgdG9SZW5hbWUgPSAodXJsRGF0YSwgZGF0YSwgb3B0aW9uc0FyZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25zQXJnIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gcHJlRmV0Y2hBY3Rpb25zLnJlZHVjZSgoZGF0YSwgZnVuYykgPT4gKGZ1bmMoZGF0YSkpLCB7IHVybERhdGEsIGRhdGEsIG9wdGlvbnMgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoQ2FsbChcclxuICAgICAgICAgICAgdXJsQnVpbGRlcih1cmwgKyAob3B0aW9ucy5xdWVyeU9iaiA/ICc/JyArIGJ1aWxkUXVlcnlTdHJpbmcob3B0aW9ucy5xdWVyeU9iaikgOiAnJyksIG1ldGhvZCksXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkLnVybERhdGEsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkLmRhdGEsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkLm9wdGlvbnNcclxuICAgICAgICApLnRoZW4oKGRhdGFSZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBvc3RGZXRjaEFjdGlvbnMucmVkdWNlKChkYXRhLCBmdW5jKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYyhkYXRhLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgfSwgZGF0YVJlc3VsdClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmFtZSh0b1JlbmFtZSwgZnVuY05hbWUpO1xyXG4gICAgcmV0dXJuIHRvUmVuYW1lO1xyXG59O1xyXG4vKiBlc2xpbnQtZW5hYmxlICovXHJcblxyXG4vKipcclxuICogRnVuY3Rpb24sIHRvIGJ1aWxkIEFQSSBkcml2ZXIsIHNvIGVhc3kgY2FsbCBjYW4gYmUgbWFkZSBpbiBzZXJ2aWNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gdXJscyBhbiBvYmplY3QgY29udGFpbmluZyBmb3IgZWFjaCBrZXkgYW4gdXJsIGFuZCBhIG1ldGhvZCwgbGlrZSB7IGdldEJ5SWQgOiB7IHVybDogJ2FwaS90ZXN0L2FjdGlvbi8nLCBtZXRob2Q6ICdHRVQnIH0gfVxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBhbiBvYmplY3QsIHdpdGggcHJvcGVydGllcyBuYW1lZCBhcyB0aGUgY29uZmlnIGdpdmVuLCBsaWtlIGEgREFPIG9yIERBTCAobXlEcml2ZXIubG9hZE15T2JqZWN0KHtpZDpteUlkfSksIG9yIG15RHJpdmVyLnNhdmVNeU9iamVjdChudWxsLCB0b1NhdmUpKS5cclxuICovXHJcbmNvbnN0IGFwaURyaXZlckJ1aWxkZXIgPSAodXJscykgPT4ge1xyXG4gICAgaWYgKCF1cmxzIHx8IHR5cGVvZiB1cmxzICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbmZpZyBnaXZlbiB0byBhcGkgZHJpdmVyIG11c3QgYmUgYW4gb2JqZWN0LCBsaWtlIHsgZ2V0QnlJZCA6IHsgdXJsOiBcXCdhcGkvdGVzdC9hY3Rpb24vXFwnLCBtZXRob2Q6IFxcJ0dFVFxcJyB9IH0sIGluc3RlYWQgZ290IDonICsgdXJscyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50cmllcyh1cmxzKVxyXG4gICAgICAgIC5tYXAoKFtwcm9wLCB1cmxdKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdXJsIHx8ICF1cmwudXJsIHx8IHR5cGVvZiB1cmwudXJsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3Byb3B9IGRvZXMgbm90IGNvbnRhaW4gYW4gdXJsIGZvciBwcm9wZXJ0eSB1cmwsIGluc3RlYWQgZ290IDogYCArIHVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFtwcm9wLCB1cmxdO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnJlZHVjZSgoYXBpRHJpdmVyLCBbcHJvcCwgdXJsXSkgPT4ge1xyXG4gICAgICAgICAgICBhcGlEcml2ZXJbcHJvcF0gPSBidWlsZEFwaURyaXZlck1ldGhvZCh1cmwsIHByb3ApO1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpRHJpdmVyO1xyXG4gICAgICAgIH0sIHt9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpRHJpdmVyQnVpbGRlcjtcclxuZXhwb3J0IHsgcmVnaXN0ZXJQcmVGZXRjaFRyYW5zZm9ybSwgcmVnaXN0ZXJQb3N0RmV0Y2hUcmFuc2Zvcm0gfTsiXX0=