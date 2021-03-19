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
var DependencyException = function (_CustomException) {
    _inherits(DependencyException, _CustomException);

    /**
    * Exception constructor..
    * @param message {string} - Exception message.
    * @param options {object} - Object to add to the exception.
    */
    function DependencyException(message, options) {
        _classCallCheck(this, DependencyException);

        return _possibleConstructorReturn(this, (DependencyException.__proto__ || Object.getPrototypeOf(DependencyException)).call(this, 'DependencyException', message, options));
    }

    return DependencyException;
}(_customException2.default);

exports.default = DependencyException;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJEZXBlbmRlbmN5RXhjZXB0aW9uIiwibWVzc2FnZSIsIm9wdGlvbnMiLCJDdXN0b21FeGNlcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFDQTs7O0lBR01BLG1COzs7QUFDRjs7Ozs7QUFLQSxpQ0FBWUMsT0FBWixFQUFxQkMsT0FBckIsRUFBOEI7QUFBQTs7QUFBQSx5SUFDcEIscUJBRG9CLEVBQ0dELE9BREgsRUFDWUMsT0FEWjtBQUU3Qjs7O0VBUjZCQyx5Qjs7a0JBV25CSCxtQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ3VzdG9tRXhjZXB0aW9uIGZyb20gJy4vY3VzdG9tLWV4Y2VwdGlvbic7XHJcbi8qKlxyXG4qIENsYXNzIHN0YW5kaW5nIGZvciB0aGUgTm90SW1wbGVtZW50ZWQgZXhjZXB0aW9ucy5cclxuKi9cclxuY2xhc3MgRGVwZW5kZW5jeUV4Y2VwdGlvbiBleHRlbmRzIEN1c3RvbUV4Y2VwdGlvbiB7XHJcbiAgICAvKipcclxuICAgICogRXhjZXB0aW9uIGNvbnN0cnVjdG9yLi5cclxuICAgICogQHBhcmFtIG1lc3NhZ2Uge3N0cmluZ30gLSBFeGNlcHRpb24gbWVzc2FnZS5cclxuICAgICogQHBhcmFtIG9wdGlvbnMge29iamVjdH0gLSBPYmplY3QgdG8gYWRkIHRvIHRoZSBleGNlcHRpb24uXHJcbiAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKCdEZXBlbmRlbmN5RXhjZXB0aW9uJywgbWVzc2FnZSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlcGVuZGVuY3lFeGNlcHRpb247XHJcbiJdfQ==