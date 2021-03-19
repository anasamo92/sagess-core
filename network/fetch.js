'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _uuid = require('uuid');

var _merge = require('lodash/object/merge');

var _merge2 = _interopRequireDefault(_merge);

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
* Create a pending status.
* @return {object} The instanciated request status.
*/
function createRequestStatus() {
    return {
        id: (0, _uuid.v4)(),
        status: 'pending'
    };
}
/**
* Update the request status.
* @param  {object} request - The request to treat.
* @return {object} - The request to dispatch.
*/
function updateRequestStatus(request) {
    if (!request || !request.id || !request.status) {
        return;
    }
    _dispatcher2.default.handleViewAction({
        data: { request: request },
        type: 'update'
    });
    return request;
}

/**
 * Extract the data from the response, and handle network or server errors or wrong data format.
 *
 * @param {Response} response the response to extract from
 * @param {string} dataType the datatype (can be 'arrayBuffer', 'blob', 'formData', 'json' or 'text')
 * @returns {Promise} a Promise containing response data, or error data
 */
function getResponseContent(response, dataType) {
    var type = response.type,
        status = response.status,
        ok = response.ok;

    // Handling errors

    if (type === 'opaque') {
        console.error('You tried to make a Cross Domain Request with no-cors options');
        return Promise.reject({ status: status, globalErrors: ['error.noCorsOptsOnCors'] });
    }

    if (type === 'error') {
        console.error('An unknown network issue has happened');
        return Promise.reject({ status: status, globalErrors: ['error.unknownNetworkIssue'] });
    }

    if (!ok && dataType === 'json') {
        return response.json().catch(function (err) {
            return Promise.reject({ globalErrors: [err] });
        }).then(function (data) {
            return Promise.reject(Object.assign({ status: status }, data));
        });
    }

    if (!ok) {
        return response.text().then(function (text) {
            return Promise.reject({ status: status, globalErrors: [text] });
        });
    }

    // Handling success
    if (ok && status === '204') {
        return Promise.resolve(null);
    }
    return ['arrayBuffer', 'blob', 'formData', 'json'].includes(dataType) ? response[dataType]().catch(function (err) {
        return Promise.reject({ globalErrors: [err] });
    }) : response.text();
}

/**
 *  Check if a special treatment is specify for a specific error code
 * 
 * @param {Object} response The fetch response
 * @param {Object} xhrErrors The specific treatment
 */
function checkErrors(response, xhrErrors) {
    var status = response.status,
        ok = response.ok;

    if (!ok) {
        if (xhrErrors[status]) {
            xhrErrors[status](response);
        }
    }
}

/**
* Fetch function to ease http request.
* @param  {object} obj - method: http verb, url: http url, data:The json to save.
* @param  {object} options - The options object.
* @return {CancellablePromise} The promise of the execution of the HTTP request.
*/
function wrappingFetch(_ref, optionsArg) {
    var url = _ref.url,
        method = _ref.method,
        data = _ref.data;

    var requestStatus = createRequestStatus();
    // Here we are using destruct to filter properties we do not want to give to fetch.
    // CORS and isCORS are useless legacy code, xhrErrors is used only in error parsing
    // eslint-disable-next-line no-unused-vars

    var _configGetter = (0, _config.get)(),
        CORS = _configGetter.CORS,
        isCORS = _configGetter.isCORS,
        xhrErrors = _configGetter.xhrErrors,
        config = _objectWithoutProperties(_configGetter, ['CORS', 'isCORS', 'xhrErrors']);

    var _ref2 = optionsArg || {},
        noStringify = _ref2.noStringify,
        options = _objectWithoutProperties(_ref2, ['noStringify']);

    var reqOptions = (0, _merge2.default)({ headers: {} }, config, options, { method: method, body: noStringify ? data : JSON.stringify(data) });
    //By default, add json content-type
    if (!reqOptions.noContentType && !reqOptions.headers['Content-Type']) {
        reqOptions.headers['Content-Type'] = 'application/json';
    }
    // Set the requesting as pending
    updateRequestStatus({ id: requestStatus.id, status: 'pending' });
    // Do the request
    return fetch(url, reqOptions)
    // Catch the possible TypeError from fetch
    .catch(function (error) {
        updateRequestStatus({ id: requestStatus.id, status: 'error' });
        return Promise.reject({ globalErrors: [error] });
    }).then(function (response) {
        updateRequestStatus({ id: requestStatus.id, status: response.ok ? 'success' : 'error' });
        var contentType = response.headers.get('content-type');
        return getResponseContent(response, reqOptions.dataType ? reqOptions.dataType : contentType && contentType.includes('application/json') ? 'json' : 'text');
    }).catch(function (data) {
        checkErrors(data, xhrErrors);
        return Promise.reject(data);
    });
}

exports.default = wrappingFetch;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVSZXF1ZXN0U3RhdHVzIiwiaWQiLCJzdGF0dXMiLCJ1cGRhdGVSZXF1ZXN0U3RhdHVzIiwicmVxdWVzdCIsImRpc3BhdGNoZXIiLCJoYW5kbGVWaWV3QWN0aW9uIiwiZGF0YSIsInR5cGUiLCJnZXRSZXNwb25zZUNvbnRlbnQiLCJyZXNwb25zZSIsImRhdGFUeXBlIiwib2siLCJjb25zb2xlIiwiZXJyb3IiLCJQcm9taXNlIiwicmVqZWN0IiwiZ2xvYmFsRXJyb3JzIiwianNvbiIsImNhdGNoIiwiZXJyIiwidGhlbiIsInRleHQiLCJyZXNvbHZlIiwiaW5jbHVkZXMiLCJjaGVja0Vycm9ycyIsInhockVycm9ycyIsIndyYXBwaW5nRmV0Y2giLCJvcHRpb25zQXJnIiwidXJsIiwibWV0aG9kIiwicmVxdWVzdFN0YXR1cyIsIkNPUlMiLCJpc0NPUlMiLCJjb25maWciLCJub1N0cmluZ2lmeSIsIm9wdGlvbnMiLCJyZXFPcHRpb25zIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwibm9Db250ZW50VHlwZSIsImZldGNoIiwiY29udGVudFR5cGUiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7QUFJQSxTQUFTQSxtQkFBVCxHQUErQjtBQUMzQixXQUFPO0FBQ0hDLFlBQUksZUFERDtBQUVIQyxnQkFBUTtBQUZMLEtBQVA7QUFJSDtBQUNEOzs7OztBQUtBLFNBQVNDLG1CQUFULENBQTZCQyxPQUE3QixFQUFzQztBQUNsQyxRQUFJLENBQUNBLE9BQUQsSUFBWSxDQUFDQSxRQUFRSCxFQUFyQixJQUEyQixDQUFDRyxRQUFRRixNQUF4QyxFQUFnRDtBQUFFO0FBQVM7QUFDM0RHLHlCQUFXQyxnQkFBWCxDQUE0QjtBQUN4QkMsY0FBTSxFQUFFSCxTQUFTQSxPQUFYLEVBRGtCO0FBRXhCSSxjQUFNO0FBRmtCLEtBQTVCO0FB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QUFXMUIsUUFBakMsR0FBNENpQyxlQUFlQSxZQUFZcEIsUUFBWixDQUFxQixrQkFBckIsQ0FBZixHQUEwRCxNQUExRCxHQUFtRSxNQUE1SSxDQUFQO0FBQ0gsS0FURSxFQVNBTCxLQVRBLENBU00sZ0JBQVE7QUFDYk0sb0JBQVlsQixJQUFaLEVBQWtCbUIsU0FBbEI7QUFDQSxlQUFPWCxRQUFRQyxNQUFSLENBQWVULElBQWYsQ0FBUDtBQUNILEtBWkUsQ0FBUDtBQWFIOztrQkFFY29CLGEiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xyXG5pbXBvcnQgbWVyZ2UgZnJvbSAnbG9kYXNoL29iamVjdC9tZXJnZSc7XHJcblxyXG5pbXBvcnQgZGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyJztcclxuaW1wb3J0IHsgZ2V0IGFzIGNvbmZpZ0dldHRlciB9IGZyb20gJy4vY29uZmlnJztcclxuXHJcbi8qKlxyXG4qIENyZWF0ZSBhIHBlbmRpbmcgc3RhdHVzLlxyXG4qIEByZXR1cm4ge29iamVjdH0gVGhlIGluc3RhbmNpYXRlZCByZXF1ZXN0IHN0YXR1cy5cclxuKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVxdWVzdFN0YXR1cygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgICBzdGF0dXM6ICdwZW5kaW5nJ1xyXG4gICAgfTtcclxufVxyXG4vKipcclxuKiBVcGRhdGUgdGhlIHJlcXVlc3Qgc3RhdHVzLlxyXG4qIEBwYXJhbSAge29iamVjdH0gcmVxdWVzdCAtIFRoZSByZXF1ZXN0IHRvIHRyZWF0LlxyXG4qIEByZXR1cm4ge29iamVjdH0gLSBUaGUgcmVxdWVzdCB0byBkaXNwYXRjaC5cclxuKi9cclxuZnVuY3Rpb24gdXBkYXRlUmVxdWVzdFN0YXR1cyhyZXF1ZXN0KSB7XHJcbiAgICBpZiAoIXJlcXVlc3QgfHwgIXJlcXVlc3QuaWQgfHwgIXJlcXVlc3Quc3RhdHVzKSB7IHJldHVybjsgfVxyXG4gICAgZGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgICBkYXRhOiB7IHJlcXVlc3Q6IHJlcXVlc3QgfSxcclxuICAgICAgICB0eXBlOiAndXBkYXRlJ1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4dHJhY3QgdGhlIGRhdGEgZnJvbSB0aGUgcmVzcG9uc2UsIGFuZCBoYW5kbGUgbmV0d29yayBvciBzZXJ2ZXIgZXJyb3JzIG9yIHdyb25nIGRhdGEgZm9ybWF0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZSB0aGUgcmVzcG9uc2UgdG8gZXh0cmFjdCBmcm9tXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhVHlwZSB0aGUgZGF0YXR5cGUgKGNhbiBiZSAnYXJyYXlCdWZmZXInLCAnYmxvYicsICdmb3JtRGF0YScsICdqc29uJyBvciAndGV4dCcpXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBhIFByb21pc2UgY29udGFpbmluZyByZXNwb25zZSBkYXRhLCBvciBlcnJvciBkYXRhXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSZXNwb25zZUNvbnRlbnQocmVzcG9uc2UsIGRhdGFUeXBlKSB7XHJcbiAgICBjb25zdCB7IHR5cGUsIHN0YXR1cywgb2sgfSA9IHJlc3BvbnNlO1xyXG5cclxuICAgIC8vIEhhbmRsaW5nIGVycm9yc1xyXG4gICAgaWYgKHR5cGUgPT09ICdvcGFxdWUnKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignWW91IHRyaWVkIHRvIG1ha2UgYSBDcm9zcyBEb21haW4gUmVxdWVzdCB3aXRoIG5vLWNvcnMgb3B0aW9ucycpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh7IHN0YXR1czogc3RhdHVzLCBnbG9iYWxFcnJvcnM6IFsnZXJyb3Iubm9Db3JzT3B0c09uQ29ycyddIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQW4gdW5rbm93biBuZXR3b3JrIGlzc3VlIGhhcyBoYXBwZW5lZCcpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh7IHN0YXR1czogc3RhdHVzLCBnbG9iYWxFcnJvcnM6IFsnZXJyb3IudW5rbm93bk5ldHdvcmtJc3N1ZSddIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghb2sgJiYgZGF0YVR5cGUgPT09ICdqc29uJykge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCkuY2F0Y2goZXJyID0+IFByb21pc2UucmVqZWN0KHsgZ2xvYmFsRXJyb3JzOiBbZXJyXSB9KSkudGhlbihkYXRhID0+IFByb21pc2UucmVqZWN0KHsgc3RhdHVzLCAuLi5kYXRhIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKS50aGVuKHRleHQgPT4gUHJvbWlzZS5yZWplY3QoeyBzdGF0dXMsIGdsb2JhbEVycm9yczogW3RleHRdIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGluZyBzdWNjZXNzXHJcbiAgICBpZiAob2sgJiYgc3RhdHVzID09PSAnMjA0Jykge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gWydhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ2pzb24nXS5pbmNsdWRlcyhkYXRhVHlwZSkgPyByZXNwb25zZVtkYXRhVHlwZV0oKS5jYXRjaChlcnIgPT4gUHJvbWlzZS5yZWplY3QoeyBnbG9iYWxFcnJvcnM6IFtlcnJdIH0pKSA6IHJlc3BvbnNlLnRleHQoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqICBDaGVjayBpZiBhIHNwZWNpYWwgdHJlYXRtZW50IGlzIHNwZWNpZnkgZm9yIGEgc3BlY2lmaWMgZXJyb3IgY29kZVxyXG4gKiBcclxuICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlIFRoZSBmZXRjaCByZXNwb25zZVxyXG4gKiBAcGFyYW0ge09iamVjdH0geGhyRXJyb3JzIFRoZSBzcGVjaWZpYyB0cmVhdG1lbnRcclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrRXJyb3JzKHJlc3BvbnNlLCB4aHJFcnJvcnMpIHtcclxuICAgIGxldCB7IHN0YXR1cywgb2sgfSA9IHJlc3BvbnNlO1xyXG4gICAgaWYgKCFvaykge1xyXG4gICAgICAgIGlmICh4aHJFcnJvcnNbc3RhdHVzXSkge1xyXG4gICAgICAgICAgICB4aHJFcnJvcnNbc3RhdHVzXShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuKiBGZXRjaCBmdW5jdGlvbiB0byBlYXNlIGh0dHAgcmVxdWVzdC5cclxuKiBAcGFyYW0gIHtvYmplY3R9IG9iaiAtIG1ldGhvZDogaHR0cCB2ZXJiLCB1cmw6IGh0dHAgdXJsLCBkYXRhOlRoZSBqc29uIHRvIHNhdmUuXHJcbiogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0LlxyXG4qIEByZXR1cm4ge0NhbmNlbGxhYmxlUHJvbWlzZX0gVGhlIHByb21pc2Ugb2YgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgSFRUUCByZXF1ZXN0LlxyXG4qL1xyXG5mdW5jdGlvbiB3cmFwcGluZ0ZldGNoKHsgdXJsLCBtZXRob2QsIGRhdGEgfSwgb3B0aW9uc0FyZykge1xyXG4gICAgbGV0IHJlcXVlc3RTdGF0dXMgPSBjcmVhdGVSZXF1ZXN0U3RhdHVzKCk7XHJcbiAgICAvLyBIZXJlIHdlIGFyZSB1c2luZyBkZXN0cnVjdCB0byBmaWx0ZXIgcHJvcGVydGllcyB3ZSBkbyBub3Qgd2FudCB0byBnaXZlIHRvIGZldGNoLlxyXG4gICAgLy8gQ09SUyBhbmQgaXNDT1JTIGFyZSB1c2VsZXNzIGxlZ2FjeSBjb2RlLCB4aHJFcnJvcnMgaXMgdXNlZCBvbmx5IGluIGVycm9yIHBhcnNpbmdcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gICAgbGV0IHsgQ09SUywgaXNDT1JTLCB4aHJFcnJvcnMsIC4uLmNvbmZpZyB9ID0gY29uZmlnR2V0dGVyKCk7XHJcbiAgICBjb25zdCB7IG5vU3RyaW5naWZ5LCAuLi5vcHRpb25zIH0gPSBvcHRpb25zQXJnIHx8IHt9O1xyXG4gICAgY29uc3QgcmVxT3B0aW9ucyA9IG1lcmdlKHsgaGVhZGVyczoge30gfSwgY29uZmlnLCBvcHRpb25zLCB7IG1ldGhvZCwgYm9keTogbm9TdHJpbmdpZnkgPyBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZGF0YSkgfSk7XHJcbiAgICAvL0J5IGRlZmF1bHQsIGFkZCBqc29uIGNvbnRlbnQtdHlwZVxyXG4gICAgaWYgKCFyZXFPcHRpb25zLm5vQ29udGVudFR5cGUgJiYgIXJlcU9wdGlvbnMuaGVhZGVyc1snQ29udGVudC1UeXBlJ10pIHtcclxuICAgICAgICByZXFPcHRpb25zLmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xyXG4gICAgfVxyXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0aW5nIGFzIHBlbmRpbmdcclxuICAgIHVwZGF0ZVJlcXVlc3RTdGF0dXMoeyBpZDogcmVxdWVzdFN0YXR1cy5pZCwgc3RhdHVzOiAncGVuZGluZycgfSk7XHJcbiAgICAvLyBEbyB0aGUgcmVxdWVzdFxyXG4gICAgcmV0dXJuIGZldGNoKHVybCwgcmVxT3B0aW9ucylcclxuICAgICAgICAvLyBDYXRjaCB0aGUgcG9zc2libGUgVHlwZUVycm9yIGZyb20gZmV0Y2hcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICB1cGRhdGVSZXF1ZXN0U3RhdHVzKHsgaWQ6IHJlcXVlc3RTdGF0dXMuaWQsIHN0YXR1czogJ2Vycm9yJyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHsgZ2xvYmFsRXJyb3JzOiBbZXJyb3JdIH0pO1xyXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICB1cGRhdGVSZXF1ZXN0U3RhdHVzKHsgaWQ6IHJlcXVlc3RTdGF0dXMuaWQsIHN0YXR1czogcmVzcG9uc2Uub2sgPyAnc3VjY2VzcycgOiAnZXJyb3InIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFJlc3BvbnNlQ29udGVudChyZXNwb25zZSwgcmVxT3B0aW9ucy5kYXRhVHlwZSA/IHJlcU9wdGlvbnMuZGF0YVR5cGUgOiBjb250ZW50VHlwZSAmJiBjb250ZW50VHlwZS5pbmNsdWRlcygnYXBwbGljYXRpb24vanNvbicpID8gJ2pzb24nIDogJ3RleHQnKTtcclxuICAgICAgICB9KS5jYXRjaChkYXRhID0+IHtcclxuICAgICAgICAgICAgY2hlY2tFcnJvcnMoZGF0YSwgeGhyRXJyb3JzKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3cmFwcGluZ0ZldGNoO1xyXG4iXX0=