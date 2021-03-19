'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CoreStore2 = require('../CoreStore');

var _CoreStore3 = _interopRequireDefault(_CoreStore2);

var _definition = require('./definition');

var _definition2 = _interopRequireDefault(_definition);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Dependencies.


/**
 * Class standing for the cartridge store.
 */
var ApplicationStore = function (_CoreStore) {
    _inherits(ApplicationStore, _CoreStore);

    function ApplicationStore(conf) {
        _classCallCheck(this, ApplicationStore);

        conf = conf || {};
        conf.definition = conf.definition || (0, _definition2.default)();
        return _possibleConstructorReturn(this, (ApplicationStore.__proto__ || Object.getPrototypeOf(ApplicationStore)).call(this, conf));
    }
    /**
     * Update the mode value.
     * @param  {object} dataNode - The value of the data.
     */


    _createClass(ApplicationStore, [{
        key: 'updateMode',
        value: function updateMode(dataNode) {
            var modeData = (this.data.has('mode') ? this.data.get('mode') : _immutable2.default.fromJS({})).set(dataNode.newMode, 1).set(dataNode.previousMode, 0);
            this.data = this.data.set('mode', modeData);
            this.willEmit('mode:change');
        }
    }]);

    return ApplicationStore;
}(_CoreStore3.default);

exports.default = ApplicationStore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJBcHBsaWNhdGlvblN0b3JlIiwiY29uZiIsImRlZmluaXRpb24iLCJkYXRhTm9kZSIsIm1vZGVEYXRhIiwiZGF0YSIsImhhcyIsImdldCIsIkltbXV0YWJsZSIsImZyb21KUyIsInNldCIsIm5ld01vZGUiLCJwcmV2aW91c01vZGUiLCJ3aWxsRW1pdCIsIkNvcmVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBSEE7OztBQUlBOzs7SUFHTUEsZ0I7OztBQUNGLDhCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2RBLGVBQU9BLFFBQVEsRUFBZjtBQUNBQSxhQUFLQyxVQUFMLEdBQWtCRCxLQUFLQyxVQUFMLElBQW1CLDJCQUFyQztBQUZjLG1JQUdSRCxJQUhRO0FBSWpCO0FBQ0Q7Ozs7Ozs7O21DQUlXRSxRLEVBQVU7QUFDakIsZ0JBQU1DLFdBQVcsQ0FBQyxLQUFLQyxJQUFMLENBQVVDLEdBQVYsQ0FBYyxNQUFkLElBQXdCLEtBQUtELElBQUwsQ0FBVUUsR0FBVixDQUFjLE1BQWQsQ0FBeEIsR0FBZ0RDLG9CQUFVQyxNQUFWLENBQWlCLEVBQWpCLENBQWpELEVBQ1pDLEdBRFksQ0FDUlAsU0FBU1EsT0FERCxFQUNVLENBRFYsRUFFWkQsR0FGWSxDQUVSUCxTQUFTUyxZQUZELEVBRWUsQ0FGZixDQUFqQjtBQUdBLGlCQUFLUCxJQUFMLEdBQVksS0FBS0EsSUFBTCxDQUFVSyxHQUFWLENBQWMsTUFBZCxFQUFzQk4sUUFBdEIsQ0FBWjtBQUNBLGlCQUFLUyxRQUFMLENBQWMsYUFBZDtBQUNIOzs7O0VBaEIwQkMsbUI7O2tCQW1CaEJkLGdCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG5pbXBvcnQgQ29yZVN0b3JlIGZyb20gJy4uL0NvcmVTdG9yZSc7XHJcbmltcG9ydCBnZXREZWZpbml0aW9uIGZyb20gJy4vZGVmaW5pdGlvbic7XHJcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcclxuLyoqXHJcbiAqIENsYXNzIHN0YW5kaW5nIGZvciB0aGUgY2FydHJpZGdlIHN0b3JlLlxyXG4gKi9cclxuY2xhc3MgQXBwbGljYXRpb25TdG9yZSBleHRlbmRzIENvcmVTdG9yZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25mKSB7XHJcbiAgICAgICAgY29uZiA9IGNvbmYgfHwge307XHJcbiAgICAgICAgY29uZi5kZWZpbml0aW9uID0gY29uZi5kZWZpbml0aW9uIHx8IGdldERlZmluaXRpb24oKTtcclxuICAgICAgICBzdXBlcihjb25mKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSBtb2RlIHZhbHVlLlxyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBkYXRhTm9kZSAtIFRoZSB2YWx1ZSBvZiB0aGUgZGF0YS5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlTW9kZShkYXRhTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IG1vZGVEYXRhID0gKHRoaXMuZGF0YS5oYXMoJ21vZGUnKSA/IHRoaXMuZGF0YS5nZXQoJ21vZGUnKSA6IEltbXV0YWJsZS5mcm9tSlMoe30pKVxyXG4gICAgICAgICAgICAuc2V0KGRhdGFOb2RlLm5ld01vZGUsIDEpXHJcbiAgICAgICAgICAgIC5zZXQoZGF0YU5vZGUucHJldmlvdXNNb2RlLCAwKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc2V0KCdtb2RlJywgbW9kZURhdGEpO1xyXG4gICAgICAgIHRoaXMud2lsbEVtaXQoJ21vZGU6Y2hhbmdlJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uU3RvcmU7Il19