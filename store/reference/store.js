'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CoreStore2 = require('../CoreStore');

var _CoreStore3 = _interopRequireDefault(_CoreStore2);

var _definition = require('./definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Dependencies.


/**
 * Class standing for the reference store.
 */
var ReferenceStore = function (_CoreStore) {
    _inherits(ReferenceStore, _CoreStore);

    function ReferenceStore(conf) {
        _classCallCheck(this, ReferenceStore);

        conf = conf || {};
        conf.definition = conf.definition || (0, _definition2.default)();
        return _possibleConstructorReturn(this, (ReferenceStore.__proto__ || Object.getPrototypeOf(ReferenceStore)).call(this, conf));
    }

    _createClass(ReferenceStore, [{
        key: 'getReference',
        value: function getReference(names) {
            var _this2 = this;

            var refs = names.reduce(function (acc, name) {
                if (_this2.data.has(name)) {
                    acc[name] = _this2.data.get(name);
                }
                return acc;
            }, {});
            return { references: refs };
        }
    }, {
        key: 'getAllReference',
        value: function getAllReference() {
            return { references: this.data.toJS() };
        }
    }, {
        key: 'getReferenceList',
        value: function getReferenceList(name) {
            return this.data.get(name, []);
        }
    }, {
        key: 'setReference',
        value: function setReference() {}
    }]);

    return ReferenceStore;
}(_CoreStore3.default);

exports.default = ReferenceStore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJSZWZlcmVuY2VTdG9yZSIsImNvbmYiLCJkZWZpbml0aW9uIiwibmFtZXMiLCJyZWZzIiwicmVkdWNlIiwiYWNjIiwibmFtZSIsImRhdGEiLCJoYXMiLCJnZXQiLCJyZWZlcmVuY2VzIiwidG9KUyIsIkNvcmVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUZBOzs7QUFHQTs7O0lBR01BLGM7OztBQUVGLDRCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2RBLGVBQU9BLFFBQVEsRUFBZjtBQUNBQSxhQUFLQyxVQUFMLEdBQWtCRCxLQUFLQyxVQUFMLElBQW1CLDJCQUFyQztBQUZjLCtIQUdSRCxJQUhRO0FBSWpCOzs7O3FDQUVZRSxLLEVBQU87QUFBQTs7QUFDaEIsZ0JBQU1DLE9BQU9ELE1BQU1FLE1BQU4sQ0FBYSxVQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUNyQyxvQkFBSSxPQUFLQyxJQUFMLENBQVVDLEdBQVYsQ0FBY0YsSUFBZCxDQUFKLEVBQXlCO0FBQ3JCRCx3QkFBSUMsSUFBSixJQUFZLE9BQUtDLElBQUwsQ0FBVUUsR0FBVixDQUFjSCxJQUFkLENBQVo7QUFDSDtBQUNELHVCQUFPRCxHQUFQO0FBQ0gsYUFMWSxFQUtWLEVBTFUsQ0FBYjtBQU1BLG1CQUFPLEVBQUVLLFlBQVlQLElBQWQsRUFBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBRU8sWUFBWSxLQUFLSCxJQUFMLENBQVVJLElBQVYsRUFBZCxFQUFQO0FBQ0g7Ozt5Q0FFZ0JMLEksRUFBTTtBQUNuQixtQkFBTyxLQUFLQyxJQUFMLENBQVVFLEdBQVYsQ0FBY0gsSUFBZCxFQUFvQixFQUFwQixDQUFQO0FBQ0g7Ozt1Q0FFYyxDQUFHOzs7O0VBMUJPTSxtQjs7a0JBOEJkYixjIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG5pbXBvcnQgQ29yZVN0b3JlIGZyb20gJy4uL0NvcmVTdG9yZSc7XHJcbmltcG9ydCBidWlsZERlZmluaXRpb24gZnJvbSAnLi9kZWZpbml0aW9uJztcclxuLyoqXHJcbiAqIENsYXNzIHN0YW5kaW5nIGZvciB0aGUgcmVmZXJlbmNlIHN0b3JlLlxyXG4gKi9cclxuY2xhc3MgUmVmZXJlbmNlU3RvcmUgZXh0ZW5kcyBDb3JlU3RvcmUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmYpIHtcclxuICAgICAgICBjb25mID0gY29uZiB8fCB7fTtcclxuICAgICAgICBjb25mLmRlZmluaXRpb24gPSBjb25mLmRlZmluaXRpb24gfHwgYnVpbGREZWZpbml0aW9uKCk7XHJcbiAgICAgICAgc3VwZXIoY29uZik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVmZXJlbmNlKG5hbWVzKSB7XHJcbiAgICAgICAgY29uc3QgcmVmcyA9IG5hbWVzLnJlZHVjZSgoYWNjLCBuYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaGFzKG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBhY2NbbmFtZV0gPSB0aGlzLmRhdGEuZ2V0KG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgICAgIHJldHVybiB7IHJlZmVyZW5jZXM6IHJlZnMgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxSZWZlcmVuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgcmVmZXJlbmNlczogdGhpcy5kYXRhLnRvSlMoKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlZmVyZW5jZUxpc3QobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KG5hbWUsIFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSZWZlcmVuY2UoKSB7IH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlZmVyZW5jZVN0b3JlO1xyXG4iXX0=