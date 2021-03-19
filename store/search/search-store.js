'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CoreStore2 = require('../CoreStore');

var _CoreStore3 = _interopRequireDefault(_CoreStore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Class standing for all advanced search information.
* The state should be the complete state of the page.
*/
var SearchStore = function (_CoreStore) {
    _inherits(SearchStore, _CoreStore);

    function SearchStore() {
        _classCallCheck(this, SearchStore);

        return _possibleConstructorReturn(this, (SearchStore.__proto__ || Object.getPrototypeOf(SearchStore)).apply(this, arguments));
    }

    _createClass(SearchStore, [{
        key: 'getValue',
        value: function getValue() {
            return this.data.toJS();
        }
    }]);

    return SearchStore;
}(_CoreStore3.default);

exports.default = SearchStore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJTZWFyY2hTdG9yZSIsImRhdGEiLCJ0b0pTIiwiQ29yZVN0b3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFDQTs7OztJQUlNQSxXOzs7Ozs7Ozs7OzttQ0FDUztBQUNQLG1CQUFPLEtBQUtDLElBQUwsQ0FBVUMsSUFBVixFQUFQO0FBQ0g7Ozs7RUFIcUJDLG1COztrQkFNWEgsVyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29yZVN0b3JlIGZyb20gJy4uL0NvcmVTdG9yZSc7XHJcbi8qKlxyXG4qIENsYXNzIHN0YW5kaW5nIGZvciBhbGwgYWR2YW5jZWQgc2VhcmNoIGluZm9ybWF0aW9uLlxyXG4qIFRoZSBzdGF0ZSBzaG91bGQgYmUgdGhlIGNvbXBsZXRlIHN0YXRlIG9mIHRoZSBwYWdlLlxyXG4qL1xyXG5jbGFzcyBTZWFyY2hTdG9yZSBleHRlbmRzIENvcmVTdG9yZSB7XHJcbiAgICBnZXRWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnRvSlMoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoU3RvcmU7XHJcbiJdfQ==