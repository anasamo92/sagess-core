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
var ArgumentInvalidException = function (_CustomException) {
    _inherits(ArgumentInvalidException, _CustomException);

    /**
    * Exception constructor.
    * @param {string} message  - Exception message.
    * @param {object} options  - Object to add to the exception.
    */
    function ArgumentInvalidException(message, options) {
        _classCallCheck(this, ArgumentInvalidException);

        return _possibleConstructorReturn(this, (ArgumentInvalidException.__proto__ || Object.getPrototypeOf(ArgumentInvalidException)).call(this, 'ArgumentInvalidException', message, options));
    }

    return ArgumentInvalidException;
}(_customException2.default);

exports.default = ArgumentInvalidException;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJBcmd1bWVudEludmFsaWRFeGNlcHRpb24iLCJtZXNzYWdlIiwib3B0aW9ucyIsIkN1c3RvbUV4Y2VwdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUNBOzs7SUFHTUEsd0I7OztBQUNGOzs7OztBQUtBLHNDQUFZQyxPQUFaLEVBQXFCQyxPQUFyQixFQUE4QjtBQUFBOztBQUFBLG1KQUNwQiwwQkFEb0IsRUFDUUQsT0FEUixFQUNpQkMsT0FEakI7QUFFN0I7OztFQVJrQ0MseUI7O2tCQVd4Qkgsd0IiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEN1c3RvbUV4Y2VwdGlvbiBmcm9tICcuL2N1c3RvbS1leGNlcHRpb24nO1xyXG4vKipcclxuKiBDbGFzcyBzdGFuZGluZyBmb3IgdGhlIE5vdEltcGxlbWVudGVkIGV4Y2VwdGlvbnMuXHJcbiovXHJcbmNsYXNzIEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbiBleHRlbmRzIEN1c3RvbUV4Y2VwdGlvbiB7XHJcbiAgICAvKipcclxuXHQqIEV4Y2VwdGlvbiBjb25zdHJ1Y3Rvci5cclxuXHQqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlICAtIEV4Y2VwdGlvbiBtZXNzYWdlLlxyXG5cdCogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgIC0gT2JqZWN0IHRvIGFkZCB0byB0aGUgZXhjZXB0aW9uLlxyXG5cdCovXHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIoJ0FyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbicsIG1lc3NhZ2UsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmd1bWVudEludmFsaWRFeGNlcHRpb247XHJcbiJdfQ==