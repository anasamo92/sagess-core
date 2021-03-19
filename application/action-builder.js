'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.preServiceCall = exports.dispatchServiceResponse = exports.errorOnCall = undefined;
exports.default = actionBuilder;

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _errorParsing = require('../network/error-parsing');

var _identity = require('lodash/utility/identity');

var _identity2 = _interopRequireDefault(_identity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Method call before the service.
 * @param {object} config The action builder config.
 * @param {obejct} payload Payload to dispatch.
 */
function _preServiceCall(_ref, payload) {
    var node = _ref.node,
        type = _ref.type,
        preStatus = _ref.preStatus,
        callerId = _ref.callerId,
        shouldDumpStoreOnActionCall = _ref.shouldDumpStoreOnActionCall;

    //There is a problem if the node is empty. //Node should be an array
    var data = {};
    var status = {};
    var STATUS = { name: preStatus, isLoading: true };
    type = shouldDumpStoreOnActionCall ? 'update' : 'updateStatus';
    // When there is a multi node update it should be an array.
    if (Array.isArray(node)) {
        node.forEach(function (nd) {
            data[nd] = shouldDumpStoreOnActionCall ? null : payload && payload[nd] || null;
            status[nd] = STATUS;
        });
    } else {
        data[node] = shouldDumpStoreOnActionCall ? null : payload || null;
        status[node] = STATUS;
    }
    //Dispatch store cleaning.
    _dispatcher2.default.handleViewAction({ data: data, type: type, status: status, callerId: callerId });
}

/**
 * Method call after the service call.
 * @param {object} config Action builder config.
 * @param {object} json  The data return from the service call.
 * @returns {promise} Update information.
 */
function _dispatchServiceResponse(_ref2, json) {
    var node = _ref2.node,
        type = _ref2.type,
        status = _ref2.status,
        callerId = _ref2.callerId;

    var isMultiNode = Array.isArray(node);
    var data = isMultiNode ? json : _defineProperty({}, node, json);
    var postStatus = { name: status, isLoading: false };
    var newStatus = {};
    if (isMultiNode) {
        node.forEach(function (nd) {
            newStatus[nd] = postStatus;
        });
    } else {
        newStatus[node] = postStatus;
    }
    _dispatcher2.default.handleServerAction({
        data: data,
        type: type,
        status: newStatus,
        callerId: callerId
    });

    // Update information similar to store::afterChange
    return {
        properties: Object.keys(data),
        data: data,
        status: newStatus,
        informations: { callerId: callerId }
    };
}

/**
 * The main objective of this function is to cancel the loading state on all the nodes concerned by the service call.
 * @param {obejct} config Action builder config.
 * @param {object} errorResult Error returned.
 */
function _dispatchFieldErrors(_ref4, errorResult) {
    var node = _ref4.node,
        callerId = _ref4.callerId;

    var isMultiNode = Array.isArray(node);
    var data = {};
    if (isMultiNode) {
        node.forEach(function (nd) {
            data[nd] = (errorResult || {})[nd] || null;
        });
    } else {
        data[node] = errorResult;
    }

    var errorStatus = {
        name: 'error',
        isLoading: false
    };
    var newStatus = {};
    if (isMultiNode) {
        node.forEach(function (nd) {
            newStatus[nd] = errorStatus;
        });
    } else {
        newStatus[node] = errorStatus;
    }
    _dispatcher2.default.handleServerAction({
        data: data,
        type: 'updateError',
        status: newStatus,
        callerId: callerId
    });
}

/**
 * Method call when there is an error.
 * @param {object} config The action builder configuration.
 * @param {object} err The error from the API call.
 */
function _errorOnCall(config, err) {
    var errorResult = (0, _errorParsing.manageResponseErrors)(err, config);
    _dispatchFieldErrors(config, errorResult.fields);
}

/**
 * Action builder function.
 * @param  {object} config The action builder configuration should contain:
 *                         type(:string) - Is the action an update, a load, a save.
 *                         preStatus(:string) The status to dispatch before the calling.
 *                         service(:function) The service to call for the action. Should return a Promise.
 *                         status(:string)} The status after the action.
 * @returns {function} The build action from the configuration. This action dispatch the preStatus, call the service and dispatch the result from the server.
 */
function actionBuilder() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    config.type = config.type || 'update';
    config.preStatus = config.preStatus || 'loading';
    config.shouldDumpStoreOnActionCall = config.shouldDumpStoreOnActionCall || false;
    if (!config.service) {
        throw new Error('You need to provide a service to call');
    }
    if (!config.status) {
        throw new Error('You need to provide a status to your action');
    }
    if (!config.node) {
        throw new Error('You shoud specify the store node name impacted by the action');
    }

    return function actionBuilderFn(payload, context) {
        context = context || this || {};
        var conf = Object.assign({
            callerId: context._identifier,
            postService: _identity2.default }, config);
        var postService = conf.postService;

        _preServiceCall(conf, payload);
        return conf.service(payload).then(postService).then(function (jsonData) {
            return _dispatchServiceResponse(conf, jsonData);
        }, function (err) {
            _errorOnCall(conf, err);
        });
    };
}

exports.errorOnCall = _errorOnCall;
exports.dispatchServiceResponse = _dispatchServiceResponse;
exports.preServiceCall = _preServiceCall;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJhY3Rpb25CdWlsZGVyIiwiX3ByZVNlcnZpY2VDYWxsIiwicGF5bG9hZCIsIm5vZGUiLCJ0eXBlIiwicHJlU3RhdHVzIiwiY2FsbGVySWQiLCJzaG91bGREdW1wU3RvcmVPbkFjdGlvbkNhbGwiLCJkYXRhIiwic3RhdHVzIiwiU1RBVFVTIiwibmFtZSIsImlzTG9hZGluZyIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJuZCIsImRpc3BhdGNoZXIiLCJoYW5kbGVWaWV3QWN0aW9uIiwiX2Rpc3BhdGNoU2VydmljZVJlc3BvbnNlIiwianNvbiIsImlzTXVsdGlOb2RlIiwicG9zdFN0YXR1cyIsIm5ld1N0YXR1cyIsImhhbmRsZVNlcnZlckFjdGlvbiIsInByb3BlcnRpZXMiLCJPYmplY3QiLCJrZXlzIiwiaW5mb3JtYXRpb25zIiwiX2Rpc3BhdGNoRmllbGRFcnJvcnMiLCJlcnJvclJlc3VsdCIsImVycm9yU3RhdHVzIiwiX2Vycm9yT25DYWxsIiwiY29uZmlnIiwiZXJyIiwiZmllbGRzIiwic2VydmljZSIsIkVycm9yIiwiYWN0aW9uQnVpbGRlckZuIiwiY29udGV4dCIsImNvbmYiLCJfaWRlbnRpZmllciIsInBvc3RTZXJ2aWNlIiwiaWRlbnRpdHkiLCJ0aGVuIiwianNvbkRhdGEiLCJlcnJvck9uQ2FsbCIsImRpc3BhdGNoU2VydmljZVJlc3BvbnNlIiwicHJlU2VydmljZUNhbGwiXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFvSHdCQSxhOztBQXBIeEI7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7QUFLQSxTQUFTQyxlQUFULE9BQTJGQyxPQUEzRixFQUFvRztBQUFBLFFBQXpFQyxJQUF5RSxRQUF6RUEsSUFBeUU7QUFBQSxRQUFuRUMsSUFBbUUsUUFBbkVBLElBQW1FO0FBQUEsUUFBN0RDLFNBQTZELFFBQTdEQSxTQUE2RDtBQUFBLFFBQWxEQyxRQUFrRCxRQUFsREEsUUFBa0Q7QUFBQSxRQUF4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O0FBQ0EsWUFBTUM7QUFDRmxDLHNCQUFVaUMsUUFBUUUsV0FEaEI7QUFFRkMseUJBQWFDLGtCQUZYLElBRXdCVixNQUZ4QixDQUFOO0FBRjhDLFlBTXRDUyxXQU5zQyxHQU10QkYsSUFOc0IsQ0FNdENFLFdBTnNDOztBQU85Q3pDLHdCQUFnQnVDLElBQWhCLEVBQXNCdEMsT0FBdEI7QUFDQSxlQUFPc0MsS0FBS0osT0FBTCxDQUFhbEMsT0FBYixFQUFzQjBDLElBQXRCLENBQTJCRixXQUEzQixFQUF3Q0UsSUFBeEMsQ0FBNkMsVUFBQ0MsUUFBRCxFQUFjO0FBQzlELG1CQUFPMUIseUJBQXlCcUIsSUFBekIsRUFBK0JLLFFBQS9CLENBQVA7QUFDSCxTQUZNLEVBRUosVUFBQ1gsR0FBRCxFQUFTO0FBQ1JGLHlCQUFhUSxJQUFiLEVBQW1CTixHQUFuQjtBQUNILFNBSk0sQ0FBUDtBQUtILEtBYkQ7QUFjSDs7UUFHbUJZLFcsR0FBaEJkLFk7UUFDNEJlLHVCLEdBQTVCNUIsd0I7UUFDbUI2QixjLEdBQW5CL0MsZSIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyJztcclxuaW1wb3J0IHsgbWFuYWdlUmVzcG9uc2VFcnJvcnMgfSBmcm9tICcuLi9uZXR3b3JrL2Vycm9yLXBhcnNpbmcnO1xyXG5pbXBvcnQgaWRlbnRpdHkgZnJvbSAnbG9kYXNoL3V0aWxpdHkvaWRlbnRpdHknO1xyXG5cclxuLyoqXHJcbiAqIE1ldGhvZCBjYWxsIGJlZm9yZSB0aGUgc2VydmljZS5cclxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgYWN0aW9uIGJ1aWxkZXIgY29uZmlnLlxyXG4gKiBAcGFyYW0ge29iZWpjdH0gcGF5bG9hZCBQYXlsb2FkIHRvIGRpc3BhdGNoLlxyXG4gKi9cclxuZnVuY3Rpb24gX3ByZVNlcnZpY2VDYWxsKHsgbm9kZSwgdHlwZSwgcHJlU3RhdHVzLCBjYWxsZXJJZCwgc2hvdWxkRHVtcFN0b3JlT25BY3Rpb25DYWxsIH0sIHBheWxvYWQpIHtcclxuICAgIC8vVGhlcmUgaXMgYSBwcm9ibGVtIGlmIHRoZSBub2RlIGlzIGVtcHR5LiAvL05vZGUgc2hvdWxkIGJlIGFuIGFycmF5XHJcbiAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgbGV0IHN0YXR1cyA9IHt9O1xyXG4gICAgY29uc3QgU1RBVFVTID0geyBuYW1lOiBwcmVTdGF0dXMsIGlzTG9hZGluZzogdHJ1ZSB9O1xyXG4gICAgdHlwZSA9IHNob3VsZER1bXBTdG9yZU9uQWN0aW9uQ2FsbCA/ICd1cGRhdGUnIDogJ3VwZGF0ZVN0YXR1cyc7XHJcbiAgICAvLyBXaGVuIHRoZXJlIGlzIGEgbXVsdGkgbm9kZSB1cGRhdGUgaXQgc2hvdWxkIGJlIGFuIGFycmF5LlxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcclxuICAgICAgICBub2RlLmZvckVhY2goKG5kKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFbbmRdID0gc2hvdWxkRHVtcFN0b3JlT25BY3Rpb25DYWxsID8gbnVsbCA6IChwYXlsb2FkICYmIHBheWxvYWRbbmRdKSB8fCBudWxsO1xyXG4gICAgICAgICAgICBzdGF0dXNbbmRdID0gU1RBVFVTO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkYXRhW25vZGVdID0gc2hvdWxkRHVtcFN0b3JlT25BY3Rpb25DYWxsID8gbnVsbCA6IChwYXlsb2FkIHx8IG51bGwpO1xyXG4gICAgICAgIHN0YXR1c1tub2RlXSA9IFNUQVRVUztcclxuICAgIH1cclxuICAgIC8vRGlzcGF0Y2ggc3RvcmUgY2xlYW5pbmcuXHJcbiAgICBkaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oeyBkYXRhLCB0eXBlLCBzdGF0dXMsIGNhbGxlcklkIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogTWV0aG9kIGNhbGwgYWZ0ZXIgdGhlIHNlcnZpY2UgY2FsbC5cclxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBBY3Rpb24gYnVpbGRlciBjb25maWcuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBqc29uICBUaGUgZGF0YSByZXR1cm4gZnJvbSB0aGUgc2VydmljZSBjYWxsLlxyXG4gKiBAcmV0dXJucyB7cHJvbWlzZX0gVXBkYXRlIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gX2Rpc3BhdGNoU2VydmljZVJlc3BvbnNlKHsgbm9kZSwgdHlwZSwgc3RhdHVzLCBjYWxsZXJJZCB9LCBqc29uKSB7XHJcbiAgICBjb25zdCBpc011bHRpTm9kZSA9IEFycmF5LmlzQXJyYXkobm9kZSk7XHJcbiAgICBjb25zdCBkYXRhID0gaXNNdWx0aU5vZGUgPyBqc29uIDogeyBbbm9kZV06IGpzb24gfTtcclxuICAgIGNvbnN0IHBvc3RTdGF0dXMgPSB7IG5hbWU6IHN0YXR1cywgaXNMb2FkaW5nOiBmYWxzZSB9O1xyXG4gICAgbGV0IG5ld1N0YXR1cyA9IHt9O1xyXG4gICAgaWYgKGlzTXVsdGlOb2RlKSB7XHJcbiAgICAgICAgbm9kZS5mb3JFYWNoKChuZCkgPT4geyBuZXdTdGF0dXNbbmRdID0gcG9zdFN0YXR1czsgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1N0YXR1c1tub2RlXSA9IHBvc3RTdGF0dXM7XHJcbiAgICB9XHJcbiAgICBkaXNwYXRjaGVyLmhhbmRsZVNlcnZlckFjdGlvbih7XHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIHN0YXR1czogbmV3U3RhdHVzLFxyXG4gICAgICAgIGNhbGxlcklkXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGUgaW5mb3JtYXRpb24gc2ltaWxhciB0byBzdG9yZTo6YWZ0ZXJDaGFuZ2VcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcHJvcGVydGllczogT2JqZWN0LmtleXMoZGF0YSksXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBzdGF0dXM6IG5ld1N0YXR1cyxcclxuICAgICAgICBpbmZvcm1hdGlvbnM6IHsgY2FsbGVySWQgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBtYWluIG9iamVjdGl2ZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNhbmNlbCB0aGUgbG9hZGluZyBzdGF0ZSBvbiBhbGwgdGhlIG5vZGVzIGNvbmNlcm5lZCBieSB0aGUgc2VydmljZSBjYWxsLlxyXG4gKiBAcGFyYW0ge29iZWpjdH0gY29uZmlnIEFjdGlvbiBidWlsZGVyIGNvbmZpZy5cclxuICogQHBhcmFtIHtvYmplY3R9IGVycm9yUmVzdWx0IEVycm9yIHJldHVybmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gX2Rpc3BhdGNoRmllbGRFcnJvcnMoeyBub2RlLCBjYWxsZXJJZCB9LCBlcnJvclJlc3VsdCkge1xyXG4gICAgY29uc3QgaXNNdWx0aU5vZGUgPSBBcnJheS5pc0FycmF5KG5vZGUpO1xyXG4gICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgaWYgKGlzTXVsdGlOb2RlKSB7XHJcbiAgICAgICAgbm9kZS5mb3JFYWNoKChuZCkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhW25kXSA9IChlcnJvclJlc3VsdCB8fCB7fSlbbmRdIHx8IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRhdGFbbm9kZV0gPSBlcnJvclJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlcnJvclN0YXR1cyA9IHtcclxuICAgICAgICBuYW1lOiAnZXJyb3InLFxyXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2VcclxuICAgIH07XHJcbiAgICBsZXQgbmV3U3RhdHVzID0ge307XHJcbiAgICBpZiAoaXNNdWx0aU5vZGUpIHtcclxuICAgICAgICBub2RlLmZvckVhY2goKG5kKSA9PiB7XHJcbiAgICAgICAgICAgIG5ld1N0YXR1c1tuZF0gPSBlcnJvclN0YXR1cztcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3U3RhdHVzW25vZGVdID0gZXJyb3JTdGF0dXM7XHJcbiAgICB9XHJcbiAgICBkaXNwYXRjaGVyLmhhbmRsZVNlcnZlckFjdGlvbih7XHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICB0eXBlOiAndXBkYXRlRXJyb3InLFxyXG4gICAgICAgIHN0YXR1czogbmV3U3RhdHVzLFxyXG4gICAgICAgIGNhbGxlcklkXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1ldGhvZCBjYWxsIHdoZW4gdGhlcmUgaXMgYW4gZXJyb3IuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGFjdGlvbiBidWlsZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlcnIgVGhlIGVycm9yIGZyb20gdGhlIEFQSSBjYWxsLlxyXG4gKi9cclxuZnVuY3Rpb24gX2Vycm9yT25DYWxsKGNvbmZpZywgZXJyKSB7XHJcbiAgICBjb25zdCBlcnJvclJlc3VsdCA9IG1hbmFnZVJlc3BvbnNlRXJyb3JzKGVyciwgY29uZmlnKTtcclxuICAgIF9kaXNwYXRjaEZpZWxkRXJyb3JzKGNvbmZpZywgZXJyb3JSZXN1bHQuZmllbGRzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFjdGlvbiBidWlsZGVyIGZ1bmN0aW9uLlxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyBUaGUgYWN0aW9uIGJ1aWxkZXIgY29uZmlndXJhdGlvbiBzaG91bGQgY29udGFpbjpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSg6c3RyaW5nKSAtIElzIHRoZSBhY3Rpb24gYW4gdXBkYXRlLCBhIGxvYWQsIGEgc2F2ZS5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgcHJlU3RhdHVzKDpzdHJpbmcpIFRoZSBzdGF0dXMgdG8gZGlzcGF0Y2ggYmVmb3JlIHRoZSBjYWxsaW5nLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlKDpmdW5jdGlvbikgVGhlIHNlcnZpY2UgdG8gY2FsbCBmb3IgdGhlIGFjdGlvbi4gU2hvdWxkIHJldHVybiBhIFByb21pc2UuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyg6c3RyaW5nKX0gVGhlIHN0YXR1cyBhZnRlciB0aGUgYWN0aW9uLlxyXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IFRoZSBidWlsZCBhY3Rpb24gZnJvbSB0aGUgY29uZmlndXJhdGlvbi4gVGhpcyBhY3Rpb24gZGlzcGF0Y2ggdGhlIHByZVN0YXR1cywgY2FsbCB0aGUgc2VydmljZSBhbmQgZGlzcGF0Y2ggdGhlIHJlc3VsdCBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhY3Rpb25CdWlsZGVyKGNvbmZpZyA9IHt9KSB7XHJcbiAgICBjb25maWcudHlwZSA9IGNvbmZpZy50eXBlIHx8ICd1cGRhdGUnO1xyXG4gICAgY29uZmlnLnByZVN0YXR1cyA9IGNvbmZpZy5wcmVTdGF0dXMgfHwgJ2xvYWRpbmcnO1xyXG4gICAgY29uZmlnLnNob3VsZER1bXBTdG9yZU9uQWN0aW9uQ2FsbCA9IGNvbmZpZy5zaG91bGREdW1wU3RvcmVPbkFjdGlvbkNhbGwgfHwgZmFsc2U7XHJcbiAgICBpZiAoIWNvbmZpZy5zZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBwcm92aWRlIGEgc2VydmljZSB0byBjYWxsJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWNvbmZpZy5zdGF0dXMpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBzdGF0dXMgdG8geW91ciBhY3Rpb24nKTtcclxuICAgIH1cclxuICAgIGlmICghY29uZmlnLm5vZGUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBzaG91ZCBzcGVjaWZ5IHRoZSBzdG9yZSBub2RlIG5hbWUgaW1wYWN0ZWQgYnkgdGhlIGFjdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiBhY3Rpb25CdWlsZGVyRm4ocGF5bG9hZCwgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IHRoaXMgfHwge307XHJcbiAgICAgICAgY29uc3QgY29uZiA9IHtcclxuICAgICAgICAgICAgY2FsbGVySWQ6IGNvbnRleHQuX2lkZW50aWZpZXIsXHJcbiAgICAgICAgICAgIHBvc3RTZXJ2aWNlOiBpZGVudGl0eSwgLi4uY29uZmlnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCB7IHBvc3RTZXJ2aWNlIH0gPSBjb25mO1xyXG4gICAgICAgIF9wcmVTZXJ2aWNlQ2FsbChjb25mLCBwYXlsb2FkKTtcclxuICAgICAgICByZXR1cm4gY29uZi5zZXJ2aWNlKHBheWxvYWQpLnRoZW4ocG9zdFNlcnZpY2UpLnRoZW4oKGpzb25EYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBfZGlzcGF0Y2hTZXJ2aWNlUmVzcG9uc2UoY29uZiwganNvbkRhdGEpO1xyXG4gICAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICAgICAgX2Vycm9yT25DYWxsKGNvbmYsIGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgX2Vycm9yT25DYWxsIGFzIGVycm9yT25DYWxsLFxyXG4gICAgX2Rpc3BhdGNoU2VydmljZVJlc3BvbnNlIGFzIGRpc3BhdGNoU2VydmljZVJlc3BvbnNlLFxyXG4gICAgX3ByZVNlcnZpY2VDYWxsIGFzIHByZVNlcnZpY2VDYWxsXHJcbn07XHJcbiJdfQ==