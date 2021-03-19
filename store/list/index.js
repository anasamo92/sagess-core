'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CoreStore2 = require('../CoreStore');

var _CoreStore3 = _interopRequireDefault(_CoreStore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Store definition.
 * @type {Object}
 */
var DEFINITION = {
    criteria: 'criteria',
    groupingKey: 'groupingKey',
    sortBy: 'sortBy',
    sortAsc: 'sortAsc',
    dataList: 'dataList',
    totalCount: 'totalCount'
};

/**
 * Class standing for all list information.
 * The list has almost the same data as the search store but instead of the facets, it can have a .
 */

var ListStore = function (_CoreStore) {
    _inherits(ListStore, _CoreStore);

    function ListStore(conf) {
        _classCallCheck(this, ListStore);

        conf = conf || {};
        if (!conf.identifier) {
            throw new Error('\n            The identifier is necessary, maybe it should be the name of the entity which is in the List.\n            Your code should look like let myListStore = new ListStore({identifier: \'myEntityList\'}) or something like that.\n           ');
        }
        conf.definition = DEFINITION;
        return _possibleConstructorReturn(this, (ListStore.__proto__ || Object.getPrototypeOf(ListStore)).call(this, conf));
    }

    return ListStore;
}(_CoreStore3.default);

exports.default = ListStore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJERUZJTklUSU9OIiwiY3JpdGVyaWEiLCJncm91cGluZ0tleSIsInNvcnRCeSIsInNvcnRBc2MiLCJkYXRhTGlzdCIsInRvdGFsQ291bnQiLCJMaXN0U3RvcmUiLCJjb25mIiwiaWRlbnRpZmllciIsIkVycm9yIiwiZGVmaW5pdGlvbiIsIkNvcmVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBSUEsSUFBTUEsYUFBYTtBQUNmQyxjQUFVLFVBREs7QUFFZkMsaUJBQWEsYUFGRTtBQUdmQyxZQUFRLFFBSE87QUFJZkMsYUFBUyxTQUpNO0FBS2ZDLGNBQVUsVUFMSztBQU1mQyxnQkFBWTtBQU5HLENBQW5COztBQVNBOzs7OztJQUlNQyxTOzs7QUFDRix1QkFBWUMsSUFBWixFQUFrQjtBQUFBOztBQUNkQSxlQUFPQSxRQUFRLEVBQWY7QUFDQSxZQUFJLENBQUNBLEtBQUtDLFVBQVYsRUFBc0I7QUFDbEIsa0JBQU0sSUFBSUMsS0FBSiwyUEFBTjtBQU1IO0FBQ0RGLGFBQUtHLFVBQUwsR0FBa0JYLFVBQWxCO0FBVmMscUhBV1JRLElBWFE7QUFZakI7OztFQWJtQkksbUI7O2tCQWVUTCxTIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb3JlU3RvcmUgZnJvbSAnLi4vQ29yZVN0b3JlJztcclxuLyoqXHJcbiAqIFN0b3JlIGRlZmluaXRpb24uXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5jb25zdCBERUZJTklUSU9OID0ge1xyXG4gICAgY3JpdGVyaWE6ICdjcml0ZXJpYScsXHJcbiAgICBncm91cGluZ0tleTogJ2dyb3VwaW5nS2V5JyxcclxuICAgIHNvcnRCeTogJ3NvcnRCeScsXHJcbiAgICBzb3J0QXNjOiAnc29ydEFzYycsXHJcbiAgICBkYXRhTGlzdDogJ2RhdGFMaXN0JyxcclxuICAgIHRvdGFsQ291bnQ6ICd0b3RhbENvdW50J1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHN0YW5kaW5nIGZvciBhbGwgbGlzdCBpbmZvcm1hdGlvbi5cclxuICogVGhlIGxpc3QgaGFzIGFsbW9zdCB0aGUgc2FtZSBkYXRhIGFzIHRoZSBzZWFyY2ggc3RvcmUgYnV0IGluc3RlYWQgb2YgdGhlIGZhY2V0cywgaXQgY2FuIGhhdmUgYSAuXHJcbiAqL1xyXG5jbGFzcyBMaXN0U3RvcmUgZXh0ZW5kcyBDb3JlU3RvcmUge1xyXG4gICAgY29uc3RydWN0b3IoY29uZikge1xyXG4gICAgICAgIGNvbmYgPSBjb25mIHx8IHt9O1xyXG4gICAgICAgIGlmICghY29uZi5pZGVudGlmaWVyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgVGhlIGlkZW50aWZpZXIgaXMgbmVjZXNzYXJ5LCBtYXliZSBpdCBzaG91bGQgYmUgdGhlIG5hbWUgb2YgdGhlIGVudGl0eSB3aGljaCBpcyBpbiB0aGUgTGlzdC5cclxuICAgICAgICAgICAgWW91ciBjb2RlIHNob3VsZCBsb29rIGxpa2UgbGV0IG15TGlzdFN0b3JlID0gbmV3IExpc3RTdG9yZSh7aWRlbnRpZmllcjogJ215RW50aXR5TGlzdCd9KSBvciBzb21ldGhpbmcgbGlrZSB0aGF0LlxyXG4gICAgICAgICAgIGBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uZi5kZWZpbml0aW9uID0gREVGSU5JVElPTjtcclxuICAgICAgICBzdXBlcihjb25mKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBMaXN0U3RvcmU7XHJcbiJdfQ==