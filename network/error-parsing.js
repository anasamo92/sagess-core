'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.manageResponseErrors = exports.configure = undefined;

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _container = require('../definition/domain/container');

var _message = require('../message');

var _translation = require('../translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
* Define all the error types of the exceptions which are defined.
* @type {object}
*/
var errorTypes = {
    entity: 'entity',
    collection: 'collection',
    composite: 'composite'
};

/**
* List of all the global messages to look after.
* @type {Array}
*/
var globalMessages = [{
    name: 'globalErrors',
    type: 'error'
}, {
    name: 'globalSuccess',
    type: 'success'
}, {
    name: 'globalWarnings',
    type: 'warning'
}, {
    name: 'globalInfos',
    type: 'error'
}, {
    name: 'globalErrorMessages',
    type: 'error'
}, {
    name: 'globalSuccessMessages',
    type: 'success'
}, {
    name: 'globalWarningMessages',
    type: 'warning'
}, {
    name: 'globalInfoMessages',
    type: 'error'
}, {
    name: 'errors',
    type: 'error'
}];

/**
 * Configure the global messages and the error types.
 *
 * @param {object} options object containing global messages or error types
 */
function configure(options) {
    if (options && (0, _isArray2.default)(options.globalMessages)) {
        globalMessages = options.globalMessages;
    }
    if (options && (0, _isObject2.default)(options.errorTypes)) {
        errorTypes = options.errorTypes;
    }
}

/**
* Template an error message with parameters.
* @param  {object} parameters - The parameters to format.
* @return {object}            - The formated parameters.
*/
function _formatParameters(parameters) {
    var options = {},
        formatter = void 0,
        value = void 0;
    for (var prop in parameters) {
        if (parameters.hasOwnProperty(prop)) {
            if (parameters[prop].domain) {
                var domain = (0, _container.getAll)()[parameters[prop].domain];
                formatter = domain ? domain.format : undefined;
            } else {
                formatter = undefined;
            }
            value = formatter && formatter.value ? formatter.value(parameters[prop].value) : parameters[prop].value;
            options[prop] = value;
        }
    }
    return options;
}

/**
 * Treat the message (formatting), and dispatch them.
 *
 * @param {Array} messages array of message
 * @param {string} type the type of message
 */
function _treatGlobalMessagesPerType(messages, type) {
    messages.forEach(function convertErrorsIntoNotification(element) {
        var options = {};
        if ((0, _isObject2.default)(element)) {
            options = _formatParameters(element.parameters);
            element = element.message;
        }
        (0, _message.addMessage)({
            type: type,
            content: (0, _translation.translate)(element, options),
            creationDate: Date.now()
        });
    });
}

/**
* Treat the global errors.
* @param  {object} responseJSON - Treat the global errors.
* @param {object} options - Options for error handling.{isDisplay:[true/false], globalMessages: [{type: "error", name: "propertyName"}]}
* @return {array} array of all treated message
*/
function _treatGlobalErrors(responseJSON, options) {
    options = options || {};
    var allMessagesTypes = options.globalMessages || globalMessages;
    if (responseJSON !== undefined) {
        var globalMessagesContainer = [];
        var messages = responseJSON;
        //Looping through all messages types.
        allMessagesTypes.forEach(function (globalMessageConf) {
            //Treat all the globals
            var msgs = messages[globalMessageConf.name];
            if (msgs) {
                globalMessagesContainer = [].concat(_toConsumableArray(globalMessagesContainer), _toConsumableArray(msgs));
                //To remove
                _treatGlobalMessagesPerType(msgs, globalMessageConf.type);
            }
        });
        return globalMessagesContainer;
    }
    return null;
}

/**
 * Treat an object of error by translating every error content.
 *
 * @param {object} fieldErrors an object with key for fieldName, and values as error keys in i18n.
 * @returns {object} a new object, with translated error
 */
function _treatEntityDetail(fieldErrors) {
    return Object.keys(fieldErrors || {}).reduce(function (res, field) {
        res[field] = (0, _translation.translate)(fieldErrors[field]);
        return res;
    }, {});
}

/**
* Treat the response json of an error.
* @param  {object} responseJSON The json response from the server.
* @param  {object} options The options containing the model. {model: Backbone.Model}
* @return {object} The constructed object from the error response.
*/
function _treatEntityExceptions() {
    var responseJSON = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments[1];
    var node = options.node;

    var fieldJSONError = responseJSON.fieldErrors || {};
    var fieldErrors = {};
    if ((0, _isArray2.default)(node)) {
        node.forEach(function (nd) {
            fieldErrors[nd] = _treatEntityDetail(fieldJSONError[nd]);
        });
    } else {
        fieldErrors = _treatEntityDetail(fieldJSONError);
    }

    return fieldErrors;
}

/**
* Treat the collection exceptions.
* @param  {object} responseJSON The JSON response from the server.
* @param  {object} options Options for error handling. {isDisplay: boolean, model: Backbone.Model}
*/
function _treatCollectionExceptions(responseJSON, options) {
    console.error('Not yet implemented as collection are not savable.', responseJSON, options);
}

/**
* Treat with all the custom exception
* @param  {object} responseJSON - Response from the server.
* @param  {object} options      - Options for the exceptions teratement such as the {model: modelVar}.
* @return {object}              - The parsed error response.
*/
function _treatBadRequestExceptions() {
    var responseJSON = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments[1];

    responseJSON.type = responseJSON.type || errorTypes.entity;
    if (responseJSON.type !== undefined) {
        switch (responseJSON.type) {
            case errorTypes.entity:
                return _treatEntityExceptions(responseJSON, options);
            case errorTypes.collection:
                return _treatCollectionExceptions(responseJSON, options);
            default:
                break;
        }
    }
    return null;
}

/**
 * Treat the field errors only if the status code is right (400, 401, 422).
 *
 * @param {object} resErrors the errors to treat
 * @param {object} opts the options for handling errors
 * @returns {any} depends on the errors handled
 */
function _handleStatusError(resErrors, opts) {
    switch (resErrors.status) {
        case 400:
        case 401:
        case 422:
            return _treatBadRequestExceptions(resErrors, opts);
        default:
            return null;
    }
}

/**
* Transform errors send by API to application errors. Dispatch depending on the response http code.
* @param  {object} responseErrors Errors from fetch call
* @param  {object} options Options for the exceptions teratement such as the model, {model: modelVar}.
* @return {object} The parsed error response.
*/
function manageResponseErrors(responseErrors, options) {

    return {
        globals: _treatGlobalErrors(responseErrors),
        fields: _handleStatusError(responseErrors, options)
    };
}

exports.configure = configure;
exports.manageResponseErrors = manageResponseErrors;
exports.default = {
    configure: configure,
    manageResponseErrors: manageResponseErrors
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJlcnJvclR5cGVzIiwiZW50aXR5IiwiY29sbGVjdGlvbiIsImNvbXBvc2l0ZSIsImdsb2JhbE1lc3NhZ2VzIiwibmFtZSIsInR5cGUiLCJjb25maWd1cmUiLCJvcHRpb25zIiwiX2Zvcm1hdFBhcmFtZXRlcnMiLCJwYXJhbWV0ZXJzIiwiZm9ybWF0dGVyIiwidmFsdWUiLCJwcm9wIiwiaGFzT3duUHJvcGVydHkiLCJkb21haW4iLCJmb3JtYXQiLCJ1bmRlZmluZWQiLCJfdHJlYXRHbG9iYWxNZXNzYWdlc1BlclR5cGUiLCJtZXNzYWdlcyIsImZvckVhY2giLCJjb252ZXJ0RXJyb3JzSW50b05vdGlmaWNhdGlvbiIsImVsZW1lbnQiLCJtZXNzYWdlIiwiY29udGVudCIsImNyZWF0aW9uRGF0ZSIsIkRhdGUiLCJub3ciLCJfdHJlYXRHbG9iYWxFcnJvcnMiLCJyZXNwb25zZUpTT04iLCJhbGxNZXNzYWdlc1R5cGVzIiwiZ2xvYmFsTWVzc2FnZXNDb250YWluZXIiLCJnbG9iYWxNZXNzYWdlQ29uZiIsIm1zZ3MiLCJfdHJlYXRFbnRpdHlEZXRhaWwiLCJmaWVsZEVycm9ycyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJyZXMiLCJmaWVsZCIsIl90cmVhdEVudGl0eUV4Y2VwdGlvbnMiLCJub2RlIiwiZmllbGRKU09ORXJyb3IiLCJuZCIsIl90cmVhdENvbGxlY3Rpb25FeGNlcHRpb25zIiwiY29uc29sZSIsImVycm9yIiwiX3RyZWF0QmFkUmVxdWVzdEV4Y2VwdGlvbnMiLCJfaGFuZGxlU3RhdHVzRXJyb3IiLCJyZXNFcnJvcnMiLCJvcHRzIiwic3RhdHVzIiwibWFuYWdlUmVzcG9uc2VFcnJvcnMiLCJyZXNwb25zZUVycm9ycyIsImdsb2JhbHMiLCJmaWVsZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7Ozs7OztBQUNBOzs7O0FBSUEsSUFBSUEsYUFBYTtB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QUlIOztRQUdHRCxTLEdBQUFBLFM7UUFDQThDLG9CLEdBQUFBLG9CO2tCQUVXO0FBQ1g5Qyx3QkFEVztBQUVYOEM7QUFGVyxDIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc09iamVjdCBmcm9tICdsb2Rhc2gvbGFuZy9pc09iamVjdCc7XHJcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC9sYW5nL2lzQXJyYXknO1xyXG5cclxuaW1wb3J0IHsgZ2V0QWxsIGFzIGdldERvbWFpbnMgfSBmcm9tICcuLi9kZWZpbml0aW9uL2RvbWFpbi9jb250YWluZXInO1xyXG5cclxuaW1wb3J0IHsgYWRkTWVzc2FnZSB9IGZyb20gJy4uL21lc3NhZ2UnO1xyXG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICcuLi90cmFuc2xhdGlvbic7XHJcbi8qKlxyXG4qIERlZmluZSBhbGwgdGhlIGVycm9yIHR5cGVzIG9mIHRoZSBleGNlcHRpb25zIHdoaWNoIGFyZSBkZWZpbmVkLlxyXG4qIEB0eXBlIHtvYmplY3R9XHJcbiovXHJcbmxldCBlcnJvclR5cGVzID0ge1xyXG4gICAgZW50aXR5OiAnZW50aXR5JyxcclxuICAgIGNvbGxlY3Rpb246ICdjb2xsZWN0aW9uJyxcclxuICAgIGNvbXBvc2l0ZTogJ2NvbXBvc2l0ZSdcclxufTtcclxuXHJcbi8qKlxyXG4qIExpc3Qgb2YgYWxsIHRoZSBnbG9iYWwgbWVzc2FnZXMgdG8gbG9vayBhZnRlci5cclxuKiBAdHlwZSB7QXJyYXl9XHJcbiovXHJcbmxldCBnbG9iYWxNZXNzYWdlcyA9IFt7XHJcbiAgICBuYW1lOiAnZ2xvYmFsRXJyb3JzJyxcclxuICAgIHR5cGU6ICdlcnJvcidcclxufSwge1xyXG4gICAgbmFtZTogJ2dsb2JhbFN1Y2Nlc3MnLFxyXG4gICAgdHlwZTogJ3N1Y2Nlc3MnXHJcbn0sIHtcclxuICAgIG5hbWU6ICdnbG9iYWxXYXJuaW5ncycsXHJcbiAgICB0eXBlOiAnd2FybmluZydcclxufSwge1xyXG4gICAgbmFtZTogJ2dsb2JhbEluZm9zJyxcclxuICAgIHR5cGU6ICdlcnJvcidcclxufSwge1xyXG4gICAgbmFtZTogJ2dsb2JhbEVycm9yTWVzc2FnZXMnLFxyXG4gICAgdHlwZTogJ2Vycm9yJ1xyXG59LCB7XHJcbiAgICBuYW1lOiAnZ2xvYmFsU3VjY2Vzc01lc3NhZ2VzJyxcclxuICAgIHR5cGU6ICdzdWNjZXNzJ1xyXG59LCB7XHJcbiAgICBuYW1lOiAnZ2xvYmFsV2FybmluZ01lc3NhZ2VzJyxcclxuICAgIHR5cGU6ICd3YXJuaW5nJ1xyXG59LCB7XHJcbiAgICBuYW1lOiAnZ2xvYmFsSW5mb01lc3NhZ2VzJyxcclxuICAgIHR5cGU6ICdlcnJvcidcclxufSwge1xyXG4gICAgbmFtZTogJ2Vycm9ycycsXHJcbiAgICB0eXBlOiAnZXJyb3InXHJcbn1dO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyZSB0aGUgZ2xvYmFsIG1lc3NhZ2VzIGFuZCB0aGUgZXJyb3IgdHlwZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIGdsb2JhbCBtZXNzYWdlcyBvciBlcnJvciB0eXBlc1xyXG4gKi9cclxuZnVuY3Rpb24gY29uZmlndXJlKG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zICYmIGlzQXJyYXkob3B0aW9ucy5nbG9iYWxNZXNzYWdlcykpIHtcclxuICAgICAgICBnbG9iYWxNZXNzYWdlcyA9IG9wdGlvbnMuZ2xvYmFsTWVzc2FnZXM7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucyAmJiBpc09iamVjdChvcHRpb25zLmVycm9yVHlwZXMpKSB7XHJcbiAgICAgICAgZXJyb3JUeXBlcyA9IG9wdGlvbnMuZXJyb3JUeXBlcztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiogVGVtcGxhdGUgYW4gZXJyb3IgbWVzc2FnZSB3aXRoIHBhcmFtZXRlcnMuXHJcbiogQHBhcmFtICB7b2JqZWN0fSBwYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgdG8gZm9ybWF0LlxyXG4qIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgICAtIFRoZSBmb3JtYXRlZCBwYXJhbWV0ZXJzLlxyXG4qL1xyXG5mdW5jdGlvbiBfZm9ybWF0UGFyYW1ldGVycyhwYXJhbWV0ZXJzKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHt9LFxyXG4gICAgICAgIGZvcm1hdHRlciwgdmFsdWU7XHJcbiAgICBmb3IgKGxldCBwcm9wIGluIHBhcmFtZXRlcnMpIHtcclxuICAgICAgICBpZiAocGFyYW1ldGVycy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVyc1twcm9wXS5kb21haW4pIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb21haW4gPSBnZXREb21haW5zKClbcGFyYW1ldGVyc1twcm9wXS5kb21haW5dO1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyID0gZG9tYWluID8gZG9tYWluLmZvcm1hdCA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZSA9IGZvcm1hdHRlciAmJiBmb3JtYXR0ZXIudmFsdWUgPyBmb3JtYXR0ZXIudmFsdWUocGFyYW1ldGVyc1twcm9wXS52YWx1ZSkgOiBwYXJhbWV0ZXJzW3Byb3BdLnZhbHVlO1xyXG4gICAgICAgICAgICBvcHRpb25zW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVHJlYXQgdGhlIG1lc3NhZ2UgKGZvcm1hdHRpbmcpLCBhbmQgZGlzcGF0Y2ggdGhlbS5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gbWVzc2FnZXMgYXJyYXkgb2YgbWVzc2FnZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgdHlwZSBvZiBtZXNzYWdlXHJcbiAqL1xyXG5mdW5jdGlvbiBfdHJlYXRHbG9iYWxNZXNzYWdlc1BlclR5cGUobWVzc2FnZXMsIHR5cGUpIHtcclxuICAgIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24gY29udmVydEVycm9yc0ludG9Ob3RpZmljYXRpb24oZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge307XHJcbiAgICAgICAgaWYgKGlzT2JqZWN0KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBfZm9ybWF0UGFyYW1ldGVycyhlbGVtZW50LnBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5tZXNzYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhZGRNZXNzYWdlKHtcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgY29udGVudDogdHJhbnNsYXRlKGVsZW1lbnQsIG9wdGlvbnMpLFxyXG4gICAgICAgICAgICBjcmVhdGlvbkRhdGU6IERhdGUubm93KClcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiogVHJlYXQgdGhlIGdsb2JhbCBlcnJvcnMuXHJcbiogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZUpTT04gLSBUcmVhdCB0aGUgZ2xvYmFsIGVycm9ycy5cclxuKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIGVycm9yIGhhbmRsaW5nLntpc0Rpc3BsYXk6W3RydWUvZmFsc2VdLCBnbG9iYWxNZXNzYWdlczogW3t0eXBlOiBcImVycm9yXCIsIG5hbWU6IFwicHJvcGVydHlOYW1lXCJ9XX1cclxuKiBAcmV0dXJuIHthcnJheX0gYXJyYXkgb2YgYWxsIHRyZWF0ZWQgbWVzc2FnZVxyXG4qL1xyXG5mdW5jdGlvbiBfdHJlYXRHbG9iYWxFcnJvcnMocmVzcG9uc2VKU09OLCBvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIGNvbnN0IGFsbE1lc3NhZ2VzVHlwZXMgPSBvcHRpb25zLmdsb2JhbE1lc3NhZ2VzIHx8IGdsb2JhbE1lc3NhZ2VzO1xyXG4gICAgaWYgKHJlc3BvbnNlSlNPTiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IGdsb2JhbE1lc3NhZ2VzQ29udGFpbmVyID0gW107XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gcmVzcG9uc2VKU09OO1xyXG4gICAgICAgIC8vTG9vcGluZyB0aHJvdWdoIGFsbCBtZXNzYWdlcyB0eXBlcy5cclxuICAgICAgICBhbGxNZXNzYWdlc1R5cGVzLmZvckVhY2goKGdsb2JhbE1lc3NhZ2VDb25mKSA9PiB7XHJcbiAgICAgICAgICAgIC8vVHJlYXQgYWxsIHRoZSBnbG9iYWxzXHJcbiAgICAgICAgICAgIGxldCBtc2dzID0gbWVzc2FnZXNbZ2xvYmFsTWVzc2FnZUNvbmYubmFtZV07XHJcbiAgICAgICAgICAgIGlmIChtc2dzKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWxNZXNzYWdlc0NvbnRhaW5lciA9IFsuLi5nbG9iYWxNZXNzYWdlc0NvbnRhaW5lciwgLi4ubXNnc107XHJcbiAgICAgICAgICAgICAgICAvL1RvIHJlbW92ZVxyXG4gICAgICAgICAgICAgICAgX3RyZWF0R2xvYmFsTWVzc2FnZXNQZXJUeXBlKG1zZ3MsIGdsb2JhbE1lc3NhZ2VDb25mLnR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbE1lc3NhZ2VzQ29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmVhdCBhbiBvYmplY3Qgb2YgZXJyb3IgYnkgdHJhbnNsYXRpbmcgZXZlcnkgZXJyb3IgY29udGVudC5cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGZpZWxkRXJyb3JzIGFuIG9iamVjdCB3aXRoIGtleSBmb3IgZmllbGROYW1lLCBhbmQgdmFsdWVzIGFzIGVycm9yIGtleXMgaW4gaTE4bi5cclxuICogQHJldHVybnMge29iamVjdH0gYSBuZXcgb2JqZWN0LCB3aXRoIHRyYW5zbGF0ZWQgZXJyb3JcclxuICovXHJcbmZ1bmN0aW9uIF90cmVhdEVudGl0eURldGFpbChmaWVsZEVycm9ycykge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGZpZWxkRXJyb3JzIHx8IHt9KS5yZWR1Y2UoXHJcbiAgICAgICAgKHJlcywgZmllbGQpID0+IHtcclxuICAgICAgICAgICAgcmVzW2ZpZWxkXSA9IHRyYW5zbGF0ZShmaWVsZEVycm9yc1tmaWVsZF0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH0sIHt9KTtcclxufVxyXG5cclxuLyoqXHJcbiogVHJlYXQgdGhlIHJlc3BvbnNlIGpzb24gb2YgYW4gZXJyb3IuXHJcbiogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZUpTT04gVGhlIGpzb24gcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyLlxyXG4qIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9ucyBjb250YWluaW5nIHRoZSBtb2RlbC4ge21vZGVsOiBCYWNrYm9uZS5Nb2RlbH1cclxuKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBjb25zdHJ1Y3RlZCBvYmplY3QgZnJvbSB0aGUgZXJyb3IgcmVzcG9uc2UuXHJcbiovXHJcbmZ1bmN0aW9uIF90cmVhdEVudGl0eUV4Y2VwdGlvbnMocmVzcG9uc2VKU09OID0ge30sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHsgbm9kZSB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IGZpZWxkSlNPTkVycm9yID0gcmVzcG9uc2VKU09OLmZpZWxkRXJyb3JzIHx8IHt9O1xyXG4gICAgbGV0IGZpZWxkRXJyb3JzID0ge307XHJcbiAgICBpZiAoaXNBcnJheShub2RlKSkge1xyXG4gICAgICAgIG5vZGUuZm9yRWFjaCgobmQpID0+IHsgZmllbGRFcnJvcnNbbmRdID0gX3RyZWF0RW50aXR5RGV0YWlsKGZpZWxkSlNPTkVycm9yW25kXSk7IH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmaWVsZEVycm9ycyA9IF90cmVhdEVudGl0eURldGFpbChmaWVsZEpTT05FcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpZWxkRXJyb3JzO1xyXG59XHJcblxyXG4vKipcclxuKiBUcmVhdCB0aGUgY29sbGVjdGlvbiBleGNlcHRpb25zLlxyXG4qIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2VKU09OIFRoZSBKU09OIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlci5cclxuKiBAcGFyYW0gIHtvYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBmb3IgZXJyb3IgaGFuZGxpbmcuIHtpc0Rpc3BsYXk6IGJvb2xlYW4sIG1vZGVsOiBCYWNrYm9uZS5Nb2RlbH1cclxuKi9cclxuZnVuY3Rpb24gX3RyZWF0Q29sbGVjdGlvbkV4Y2VwdGlvbnMocmVzcG9uc2VKU09OLCBvcHRpb25zKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdOb3QgeWV0IGltcGxlbWVudGVkIGFzIGNvbGxlY3Rpb24gYXJlIG5vdCBzYXZhYmxlLicsIHJlc3BvbnNlSlNPTiwgb3B0aW9ucyk7XHJcbn1cclxuXHJcbi8qKlxyXG4qIFRyZWF0IHdpdGggYWxsIHRoZSBjdXN0b20gZXhjZXB0aW9uXHJcbiogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZUpTT04gLSBSZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zICAgICAgLSBPcHRpb25zIGZvciB0aGUgZXhjZXB0aW9ucyB0ZXJhdGVtZW50IHN1Y2ggYXMgdGhlIHttb2RlbDogbW9kZWxWYXJ9LlxyXG4qIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgICAgIC0gVGhlIHBhcnNlZCBlcnJvciByZXNwb25zZS5cclxuKi9cclxuZnVuY3Rpb24gX3RyZWF0QmFkUmVxdWVzdEV4Y2VwdGlvbnMocmVzcG9uc2VKU09OID0ge30sIG9wdGlvbnMpIHtcclxuICAgIHJlc3BvbnNlSlNPTi50eXBlID0gcmVzcG9uc2VKU09OLnR5cGUgfHwgZXJyb3JUeXBlcy5lbnRpdHk7XHJcbiAgICBpZiAocmVzcG9uc2VKU09OLnR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN3aXRjaCAocmVzcG9uc2VKU09OLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBlcnJvclR5cGVzLmVudGl0eTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdHJlYXRFbnRpdHlFeGNlcHRpb25zKHJlc3BvbnNlSlNPTiwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNhc2UgZXJyb3JUeXBlcy5jb2xsZWN0aW9uOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90cmVhdENvbGxlY3Rpb25FeGNlcHRpb25zKHJlc3BvbnNlSlNPTiwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUcmVhdCB0aGUgZmllbGQgZXJyb3JzIG9ubHkgaWYgdGhlIHN0YXR1cyBjb2RlIGlzIHJpZ2h0ICg0MDAsIDQwMSwgNDIyKS5cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IHJlc0Vycm9ycyB0aGUgZXJyb3JzIHRvIHRyZWF0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzIHRoZSBvcHRpb25zIGZvciBoYW5kbGluZyBlcnJvcnNcclxuICogQHJldHVybnMge2FueX0gZGVwZW5kcyBvbiB0aGUgZXJyb3JzIGhhbmRsZWRcclxuICovXHJcbmZ1bmN0aW9uIF9oYW5kbGVTdGF0dXNFcnJvcihyZXNFcnJvcnMsIG9wdHMpIHtcclxuICAgIHN3aXRjaCAocmVzRXJyb3JzLnN0YXR1cykge1xyXG4gICAgICAgIGNhc2UgNDAwOlxyXG4gICAgICAgIGNhc2UgNDAxOlxyXG4gICAgICAgIGNhc2UgNDIyOlxyXG4gICAgICAgICAgICByZXR1cm4gX3RyZWF0QmFkUmVxdWVzdEV4Y2VwdGlvbnMocmVzRXJyb3JzLCBvcHRzKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiogVHJhbnNmb3JtIGVycm9ycyBzZW5kIGJ5IEFQSSB0byBhcHBsaWNhdGlvbiBlcnJvcnMuIERpc3BhdGNoIGRlcGVuZGluZyBvbiB0aGUgcmVzcG9uc2UgaHR0cCBjb2RlLlxyXG4qIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2VFcnJvcnMgRXJyb3JzIGZyb20gZmV0Y2ggY2FsbFxyXG4qIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgZXhjZXB0aW9ucyB0ZXJhdGVtZW50IHN1Y2ggYXMgdGhlIG1vZGVsLCB7bW9kZWw6IG1vZGVsVmFyfS5cclxuKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBwYXJzZWQgZXJyb3IgcmVzcG9uc2UuXHJcbiovXHJcbmZ1bmN0aW9uIG1hbmFnZVJlc3BvbnNlRXJyb3JzKHJlc3BvbnNlRXJyb3JzLCBvcHRpb25zKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnbG9iYWxzOiBfdHJlYXRHbG9iYWxFcnJvcnMocmVzcG9uc2VFcnJvcnMpLFxyXG4gICAgICAgIGZpZWxkczogX2hhbmRsZVN0YXR1c0Vycm9yKHJlc3BvbnNlRXJyb3JzLCBvcHRpb25zKVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIGNvbmZpZ3VyZSxcclxuICAgIG1hbmFnZVJlc3BvbnNlRXJyb3JzXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbmZpZ3VyZSxcclxuICAgIG1hbmFnZVJlc3BvbnNlRXJyb3JzXHJcbn07Il19