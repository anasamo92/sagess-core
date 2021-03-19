'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CoreStore2 = require('../CoreStore');

var _CoreStore3 = _interopRequireDefault(_CoreStore2);

var _definition = require('./definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Dependencies.


/**
 * Class standing for the user store.
 */
var UserStore = function (_CoreStore) {
    _inherits(UserStore, _CoreStore);

    function UserStore(conf) {
        _classCallCheck(this, UserStore);

        conf = conf || {};
        conf.definition = conf.definition || (0, _definition2.default)();
        return _possibleConstructorReturn(this, (UserStore.__proto__ || Object.getPrototypeOf(UserStore)).call(this, conf));
    }

    return UserStore;
}(_CoreStore3.default);

exports.default = UserStore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJVc2VyU3RvcmUiLCJjb25mIiwiZGVmaW5pdGlvbiIsIkNvcmVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFGQTs7O0FBR0E7OztJQUdNQSxTOzs7QUFDRix1QkFBWUMsSUFBWixFQUFrQjtBQUFBOztBQUNkQSxlQUFPQSxRQUFRLEVBQWY7QUFDQUEsYUFBS0MsVUFBTCxHQUFrQkQsS0FBS0MsVUFBTCxJQUFtQiwyQkFBckM7QUFGYyxxSEFHUkQsSUFIUTtBQUlqQjs7O0VBTG1CRSxtQjs7a0JBU1RILFMiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9EZXBlbmRlbmNpZXMuXHJcbmltcG9ydCBDb3JlU3RvcmUgZnJvbSAnLi4vQ29yZVN0b3JlJztcclxuaW1wb3J0IGJ1aWxkRGVmaW5pdGlvbiBmcm9tICcuL2RlZmluaXRpb24nO1xyXG4vKipcclxuICogQ2xhc3Mgc3RhbmRpbmcgZm9yIHRoZSB1c2VyIHN0b3JlLlxyXG4gKi9cclxuY2xhc3MgVXNlclN0b3JlIGV4dGVuZHMgQ29yZVN0b3JlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbmYpIHtcclxuICAgICAgICBjb25mID0gY29uZiB8fCB7fTtcclxuICAgICAgICBjb25mLmRlZmluaXRpb24gPSBjb25mLmRlZmluaXRpb24gfHwgYnVpbGREZWZpbml0aW9uKCk7XHJcbiAgICAgICAgc3VwZXIoY29uZik7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVc2VyU3RvcmU7XHJcbiJdfQ==