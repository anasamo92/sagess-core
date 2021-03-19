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
* Class standing for the FocusException exceptions.
*/
var FocusException = function (_CustomException) {
    _inherits(FocusException, _CustomException);

    /**
    * Exception constructor..
    * @param messgae {string} - Exception message.
    * @param options {object} - Object to add to the exception.
    */
    function FocusException(message, options) {
        _classCallCheck(this, FocusException);

        return _possibleConstructorReturn(this, (FocusException.__proto__ || Object.getPrototypeOf(FocusException)).call(this, 'FocusException', message, options));
    }

    return FocusException;
}(_customException2.default);

exports.default = FocusException;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJGb2N1c0V4Y2VwdGlvbiIsIm1lc3NhZ2UiLCJvcHRpb25zIiwiQ3VzdG9tRXhjZXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBQ0E7OztJQUdNQSxjOzs7QUFDRjs7Ozs7QUFLQSw0QkFBWUMsT0FBWixFQUFxQkMsT0FBckIsRUFBOEI7QUFBQTs7QUFBQSwrSEFDcEIsZ0JBRG9CLEVBQ0ZELE9BREUsRUFDT0MsT0FEUDtBQUU3Qjs7O0VBUndCQyx5Qjs7a0JBV2RILGMiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEN1c3RvbUV4Y2VwdGlvbiBmcm9tICcuL2N1c3RvbS1leGNlcHRpb24nO1xyXG4vKipcclxuKiBDbGFzcyBzdGFuZGluZyBmb3IgdGhlIEZvY3VzRXhjZXB0aW9uIGV4Y2VwdGlvbnMuXHJcbiovXHJcbmNsYXNzIEZvY3VzRXhjZXB0aW9uIGV4dGVuZHMgQ3VzdG9tRXhjZXB0aW9uIHtcclxuICAgIC8qKlxyXG5cdCogRXhjZXB0aW9uIGNvbnN0cnVjdG9yLi5cclxuXHQqIEBwYXJhbSBtZXNzZ2FlIHtzdHJpbmd9IC0gRXhjZXB0aW9uIG1lc3NhZ2UuXHJcblx0KiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fSAtIE9iamVjdCB0byBhZGQgdG8gdGhlIGV4Y2VwdGlvbi5cclxuXHQqL1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKCdGb2N1c0V4Y2VwdGlvbicsIG1lc3NhZ2UsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb2N1c0V4Y2VwdGlvbjtcclxuIl19