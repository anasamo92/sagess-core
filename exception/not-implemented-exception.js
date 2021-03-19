'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _customException = require('./custom-exception');

var _customException2 = _interopRequireDefault(_customException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Class standing for the NotImplemented exceptions.
*/
var NotImplementedException = function (_CustomException) {
    _inherits(NotImplementedException, _CustomException);

    /**
    * Exception constructor.
    * @param message {string} - Exception message.
    * @param options {object} - Object to add to the exception.
    */
    function NotImplementedException(message, options) {
        _classCallCheck(this, NotImplementedException);

        return _possibleConstructorReturn(this, (NotImplementedException.__proto__ || Object.getPrototypeOf(NotImplementedException)).call(this, 'NotImplementedException', message, options));
    }

    return NotImplementedException;
}(_customException2.default);

exports.default = NotImplementedException;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbiIsIm1lc3NhZ2UiLCJvcHRpb25zIiwiQ3VzdG9tRXhjZXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBQ0E7OztJQUdNQSx1Qjs7O0FBQ0Y7Ozs7O0FBS0EscUNBQVlDLE9BQVosRUFBcUJDLE9BQXJCLEVBQThCO0FBQUE7O0FBQUEsaUpBQ3BCLHlCQURvQixFQUNPRCxPQURQLEVBQ2dCQyxPQURoQjtBQUU3Qjs7O0VBUmlDQyx5Qjs7a0JBV3ZCSCx1QiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ3VzdG9tRXhjZXB0aW9uIGZyb20gJy4vY3VzdG9tLWV4Y2VwdGlvbic7XHJcbi8qKlxyXG4qIENsYXNzIHN0YW5kaW5nIGZvciB0aGUgTm90SW1wbGVtZW50ZWQgZXhjZXB0aW9ucy5cclxuKi9cclxuY2xhc3MgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24gZXh0ZW5kcyBDdXN0b21FeGNlcHRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAqIEV4Y2VwdGlvbiBjb25zdHJ1Y3Rvci5cclxuICAgICogQHBhcmFtIG1lc3NhZ2Uge3N0cmluZ30gLSBFeGNlcHRpb24gbWVzc2FnZS5cclxuICAgICogQHBhcmFtIG9wdGlvbnMge29iamVjdH0gLSBPYmplY3QgdG8gYWRkIHRvIHRoZSBleGNlcHRpb24uXHJcbiAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKCdOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbicsIG1lc3NhZ2UsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbjtcclxuIl19