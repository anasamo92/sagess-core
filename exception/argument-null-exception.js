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
var ArgumentNullException = function (_CustomException) {
    _inherits(ArgumentNullException, _CustomException);

    /**
    * Exception constructor..
    * @param message {string} - Exception message.
    * @param options {object} - Object to add to the exception.
    */
    function ArgumentNullException(message, options) {
        _classCallCheck(this, ArgumentNullException);

        return _possibleConstructorReturn(this, (ArgumentNullException.__proto__ || Object.getPrototypeOf(ArgumentNullException)).call(this, 'ArgumentNullException', message, options));
    }

    return ArgumentNullException;
}(_customException2.default);

exports.default = ArgumentNullException;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJBcmd1bWVudE51bGxFeGNlcHRpb24iLCJtZXNzYWdlIiwib3B0aW9ucyIsIkN1c3RvbUV4Y2VwdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUNBOzs7SUFHTUEscUI7OztBQUNGOzs7OztBQUtBLG1DQUFZQyxPQUFaLEVBQXFCQyxPQUFyQixFQUE4QjtBQUFBOztBQUFBLDZJQUNwQix1QkFEb0IsRUFDS0QsT0FETCxFQUNjQyxPQURkO0FBRTdCOzs7RUFSK0JDLHlCOztrQkFXckJILHFCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDdXN0b21FeGNlcHRpb24gZnJvbSAnLi9jdXN0b20tZXhjZXB0aW9uJztcclxuLyoqXHJcbiogQ2xhc3Mgc3RhbmRpbmcgZm9yIHRoZSBOb3RJbXBsZW1lbnRlZCBleGNlcHRpb25zLlxyXG4qL1xyXG5jbGFzcyBBcmd1bWVudE51bGxFeGNlcHRpb24gZXh0ZW5kcyBDdXN0b21FeGNlcHRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAqIEV4Y2VwdGlvbiBjb25zdHJ1Y3Rvci4uXHJcbiAgICAqIEBwYXJhbSBtZXNzYWdlIHtzdHJpbmd9IC0gRXhjZXB0aW9uIG1lc3NhZ2UuXHJcbiAgICAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9IC0gT2JqZWN0IHRvIGFkZCB0byB0aGUgZXhjZXB0aW9uLlxyXG4gICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcignQXJndW1lbnROdWxsRXhjZXB0aW9uJywgbWVzc2FnZSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbjtcclxuIl19