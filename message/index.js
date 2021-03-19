'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.builtInStore = exports.clearMessages = exports.addSuccessMessage = exports.addErrorMessage = exports.addInformationMessage = exports.addWarningMessage = exports.addMessage = undefined;

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireDefault(_isString);

var _builtInStore = require('./built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transform the message into objet if it is a string.
 * @param {[string, object]} message - The message to display (object or string).
 * @returns {object} - The well constructed message.
 */
function _parseString(message) {
    if ((0, _isString2.default)(message)) {
        message = { content: message };
    }
    return message;
}

/**
 * Add a message.
 * @param {object} message - The message object.
 */
function addMessage(message) {
    _dispatcher2.default.handleServerAction({
        data: { message: message },
        type: 'push'
    });
}

/**
 * Add an error message.
 * @param {object} message - The message content.
 */
function addErrorMessage(message) {
    message = _parseString(message);
    message.type = 'error';
    addMessage(message);
}
/**
 * Add a warning message.
 * @param {object} message - The message content.
 */
function addWarningMessage(message) {
    message = _parseString(message);
    message.type = 'warning';
    addMessage(message);
}

/**
 * Add an information message.
 * @param {object} message - The message content.
 */
function addInformationMessage(message) {
    message = _parseString(message);
    message.type = 'info';
    addMessage(message);
}

/**
 * Add a success message.
 * @param {object} message - The message content.
 */
function addSuccessMessage(message) {
    message = _parseString(message);
    message.type = 'success';
    addMessage(message);
}

function clearMessages() {
    _dispatcher2.default.handleServerAction({ data: { messages: {} }, type: 'clear' });
}

exports.addMessage = addMessage;
exports.addWarningMessage = addWarningMessage;
exports.addInformationMessage = addInformationMessage;
exports.addErrorMessage = addErrorMessage;
exports.addSuccessMessage = addSuccessMessage;
exports.clearMessages = clearMessages;
exports.builtInStore = _builtInStore2.default;
exports.default = {
    addMessage: addMessage,
    addWarningMessage: addWarningMessage,
    addInformationMessage: addInformationMessage,
    addErrorMessage: addErrorMessage,
    addSuccessMessage: addSuccessMessage,
    clearMessages: clearMessages,
    builtInStore: _builtInStore2.default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJfcGFyc2VTdHJpbmciLCJtZXNzYWdlIiwiY29udGVudCIsImFkZE1lc3NhZ2UiLCJkaXNwYXRjaGVyIiwiaGFuZGxlU2VydmVyQWN0aW9uIiwiZGF0YSIsInR5cGUiLCJhZGRFcnJvck1lc3NhZ2UiLCJhZGRXYXJuaW5nTWVzc2FnZSIsImFkZEluZm9ybWF0aW9uTWVzc2FnZSIsImFkZFN1Y2Nlc3NNZXNzYWdlIiwiY2xlYXJNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiYnVpbHRJblN0b3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7Ozs7QUFLQSxTQUFTQSxZQUFULENBQXNCQyxPQUF0QixFQUErQjtBQUMzQixRQUFJLHdCQUFTQSxPQUFULENBQUosRUFBdUI7QUFDbkJBLGtCQUFVLEVBQUVDLFNBQVNELE9BQVgsRUFBVjtBQUNIO0FBQ0QsV0FBT0EsT0FBUDtBQUNIOztBQUVEOzs7O0FBSUEsU0FBU0UsVUFBVCxDQUFvQkYsT0FBcEIsRUFBNkI7QUFDekJHLHlCQUFXQyxrQkFBWCxDQUE4QjtBQUMxQkMsY0FBTSxFQUFFTCxTQUFTQSxPQUFYLEVBRG9CO0FBRTFCTSxjQUFNO0FBRm9CLEtBQTlCO0FBSUg7O0FBRUQ7Ozs7QUFJQSxTQUFTQyxlQUFULENBQXlCUCxPQUF6QixFQUFrQztBQUM5QkEsY0FBVUQsYUFBYUMsT0FBYixDQUFWO0FBQ0FBLFlBQVFNLElBQVIsR0FBZSxPQUFmO0FBQ0FKLGVBQVdGLE9BQVg7QUFDSDtBQUNEOzs7O0FBSUEsU0FBU1EsaUJBQVQsQ0FBMkJSLE9BQTNCLEVBQW9DO0FBQ2hDQSxjQUFVRCxhQUFhQyxPQUFiLENBQVY7QUFDQUEsWUFBUU0sSUFBUixHQUFlLFNBQWY7QUFDQUosZUFBV0YsT0FBWDtBQUNIOztBQUVEOzs7O0FBSUEsU0FBU1MscUJBQVQsQ0FBK0JULE9BQS9CLEVBQXdDO0FBQ3BDQSxjQUFVRCxhQUFhQyxPQUFiLENBQVY7QUFDQUEsWUFBUU0sSUFBUixHQUFlLE1BQWY7QUFDQUosZUFBV0YsT0FBWDtBQUNIOztBQUVEOzs7O0FBSUEsU0FBU1UsaUJBQVQsQ0FBMkJWLE9BQTNCLEVBQW9DO0FBQ2hDQSxjQUFVRCxhQUFhQyxPQUFiLENBQVY7QUFDQUEsWUFBUU0sSUFBUixHQUFlLFNBQWY7QUFDQUosZUFBV0YsT0FBWDtBQUNIOztBQUVELFNBQVNXLGFBQVQsR0FBeUI7QUFDckJSLHlCQUFXQyxrQkFBWCxDQUE4QixFQUFFQyxNQUFNLEVBQUVPLFVBQVUsRUFBWixFQUFSLEVBQTBCTixNQUFNLE9BQWhDLEVBQTlCO0FBQ0g7O1FBR0dKLFUsR0FBQUEsVTtRQUNBTSxpQixHQUFBQSxpQjtRQUNBQyxxQixHQUFBQSxxQjtRQUNBRixlLEdBQUFBLGU7UUFDQUcsaUIsR0FBQUEsaUI7UUFDQUMsYSxHQUFBQSxhO1FBQ0FFLFksR0FBQUEsc0I7a0JBR1c7QUFDWFgsMEJBRFc7QUFFWE0sd0NBRlc7QUFHWEMsZ0RBSFc7QUFJWEYsb0NBSlc7QUFLWEcsd0NBTFc7QUFNWEMsZ0NBTlc7QUFPWEU7QUFQVyxDIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXInO1xyXG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnbG9kYXNoL2xhbmcvaXNTdHJpbmcnO1xyXG5pbXBvcnQgYnVpbHRJblN0b3JlIGZyb20gJy4vYnVpbHQtaW4tc3RvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFRyYW5zZm9ybSB0aGUgbWVzc2FnZSBpbnRvIG9iamV0IGlmIGl0IGlzIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1tzdHJpbmcsIG9iamVjdF19IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IChvYmplY3Qgb3Igc3RyaW5nKS5cclxuICogQHJldHVybnMge29iamVjdH0gLSBUaGUgd2VsbCBjb25zdHJ1Y3RlZCBtZXNzYWdlLlxyXG4gKi9cclxuZnVuY3Rpb24gX3BhcnNlU3RyaW5nKG1lc3NhZ2UpIHtcclxuICAgIGlmIChpc1N0cmluZyhtZXNzYWdlKSkge1xyXG4gICAgICAgIG1lc3NhZ2UgPSB7IGNvbnRlbnQ6IG1lc3NhZ2UgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBtZXNzYWdlO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgbWVzc2FnZS5cclxuICogQHBhcmFtIHtvYmplY3R9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgIGRpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcclxuICAgICAgICBkYXRhOiB7IG1lc3NhZ2U6IG1lc3NhZ2UgfSxcclxuICAgICAgICB0eXBlOiAncHVzaCdcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGFuIGVycm9yIG1lc3NhZ2UuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXNzYWdlIC0gVGhlIG1lc3NhZ2UgY29udGVudC5cclxuICovXHJcbmZ1bmN0aW9uIGFkZEVycm9yTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICBtZXNzYWdlID0gX3BhcnNlU3RyaW5nKG1lc3NhZ2UpO1xyXG4gICAgbWVzc2FnZS50eXBlID0gJ2Vycm9yJztcclxuICAgIGFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbn1cclxuLyoqXHJcbiAqIEFkZCBhIHdhcm5pbmcgbWVzc2FnZS5cclxuICogQHBhcmFtIHtvYmplY3R9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSBjb250ZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gYWRkV2FybmluZ01lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgbWVzc2FnZSA9IF9wYXJzZVN0cmluZyhtZXNzYWdlKTtcclxuICAgIG1lc3NhZ2UudHlwZSA9ICd3YXJuaW5nJztcclxuICAgIGFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGQgYW4gaW5mb3JtYXRpb24gbWVzc2FnZS5cclxuICogQHBhcmFtIHtvYmplY3R9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSBjb250ZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gYWRkSW5mb3JtYXRpb25NZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgIG1lc3NhZ2UgPSBfcGFyc2VTdHJpbmcobWVzc2FnZSk7XHJcbiAgICBtZXNzYWdlLnR5cGUgPSAnaW5mbyc7XHJcbiAgICBhZGRNZXNzYWdlKG1lc3NhZ2UpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGEgc3VjY2VzcyBtZXNzYWdlLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIGNvbnRlbnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRTdWNjZXNzTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICBtZXNzYWdlID0gX3BhcnNlU3RyaW5nKG1lc3NhZ2UpO1xyXG4gICAgbWVzc2FnZS50eXBlID0gJ3N1Y2Nlc3MnO1xyXG4gICAgYWRkTWVzc2FnZShtZXNzYWdlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJNZXNzYWdlcygpIHtcclxuICAgIGRpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHsgZGF0YTogeyBtZXNzYWdlczoge30gfSwgdHlwZTogJ2NsZWFyJyB9KTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIGFkZE1lc3NhZ2UsXHJcbiAgICBhZGRXYXJuaW5nTWVzc2FnZSxcclxuICAgIGFkZEluZm9ybWF0aW9uTWVzc2FnZSxcclxuICAgIGFkZEVycm9yTWVzc2FnZSxcclxuICAgIGFkZFN1Y2Nlc3NNZXNzYWdlLFxyXG4gICAgY2xlYXJNZXNzYWdlcyxcclxuICAgIGJ1aWx0SW5TdG9yZVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgYWRkTWVzc2FnZSxcclxuICAgIGFkZFdhcm5pbmdNZXNzYWdlLFxyXG4gICAgYWRkSW5mb3JtYXRpb25NZXNzYWdlLFxyXG4gICAgYWRkRXJyb3JNZXNzYWdlLFxyXG4gICAgYWRkU3VjY2Vzc01lc3NhZ2UsXHJcbiAgICBjbGVhck1lc3NhZ2VzLFxyXG4gICAgYnVpbHRJblN0b3JlXHJcbn07XHJcbiJdfQ==