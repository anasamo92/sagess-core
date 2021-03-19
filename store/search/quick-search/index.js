'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _searchStore = require('../search-store');

var _searchStore2 = _interopRequireDefault(_searchStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LISTENED_NODES = ['query', 'scope'];

/**
* Class standing for all advanced search information.
* The state should be the complete state of the page.
*/

var QuickSearchStore = function (_SearchStore) {
    _inherits(QuickSearchStore, _SearchStore);

    function QuickSearchStore(conf) {
        _classCallCheck(this, QuickSearchStore);

        conf = conf || {};
        conf.definition = {
            query: 'query',
            scope: 'scope',
            results: 'results',
            facets: 'facets',
            totalCount: 'totalCount'
        };
        conf.identifier = conf.identifier || 'QUICK_SEARCH';
        return _possibleConstructorReturn(this, (QuickSearchStore.__proto__ || Object.getPrototypeOf(QuickSearchStore)).call(this, conf));
    }

    _createClass(QuickSearchStore, [{
        key: 'emitPendingEvents',
        value: function emitPendingEvents() {
            var _this2 = this;

            if (this.pendingEvents.find(function (ev) {
                return LISTENED_NODES.includes(ev.name.split(':change')[0]);
            })) {
                this.emit('quick-search-criterias:change', { status: 'update' });
            }
            this.pendingEvents.map(function (evtToEmit) {
                var name = evtToEmit.name,
                    data = evtToEmit.data;

                _this2.emit(name, data);
            });
        }
    }]);

    return QuickSearchStore;
}(_searchStore2.default);

exports.default = QuickSearchStore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJMSVNURU5FRF9OT0RFUyIsIlF1aWNrU2VhcmNoU3RvcmUiLCJjb25mIiwiZGVmaW5pdGlvbiIsInF1ZXJ5Iiwic2NvcGUiLCJyZXN1bHRzIiwiZmFjZXRzIiwidG90YWxDb3VudCIsImlkZW50aWZpZXIiLCJwZW5kaW5nRXZlbnRzIiwiZmluZCIsImluY2x1ZGVzIiwiZXYiLCJuYW1lIiwic3BsaXQiLCJlbWl0Iiwic3RhdHVzIiwibWFwIiwiZXZ0VG9FbWl0IiwiZGF0YSIsIlNlYXJjaFN0b3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsQ0FBQyxPQUFELEVBQVUsT0FBVixDQUF2Qjs7QUFFQTs7Ozs7SUFJTUMsZ0I7OztBQUNGLDhCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2RBLGVBQU9BLFFBQVEsRUFBZjtBQUNBQSxhQUFLQyxVQUFMLEdBQWtCO0FBQ2RDLG1CQUFPLE9BRE87QUFFZEMsbUJBQU8sT0FGTztBQUdkQyxxQkFBUyxTQUhLO0FBSWRDLG9CQUFRLFFBSk07QUFLZEMsd0JBQVk7QUFMRSxTQUFsQjtBQU9BTixhQUFLTyxVQUFMLEdBQWtCUCxLQUFLTyxVQUFMLElBQW1CLGNBQXJDO0FBVGMsbUlBVVJQLElBVlE7QUFXakI7Ozs7NENBRW1CO0FBQUE7O0FBQ2hCLGdCQUFJLEtBQUtRLGFBQUwsQ0FBbUJDLElBQW5CLENBQXdCO0FBQUEsdUJBQU1YLGVBQWVZLFFBQWYsQ0FBd0JDLEdBQUdDLElBQUgsQ0FBUUMsS0FBUixDQUFjLFNBQWQsRUFBeUIsQ0FBekIsQ0FBeEIsQ0FBTjtBQUFBLGFBQXhCLENBQUosRUFBeUY7QUFDckYscUJBQUtDLElBQUwsQ0FBVSwrQkFBVixFQUEyQyxFQUFFQyxRQUFRLFFBQVYsRUFBM0M7QUFDSDtBQUNELGlCQUFLUCxhQUFMLENBQW1CUSxHQUFuQixDQUF1QixVQUFDQyxTQUFELEVBQWU7QUFBQSxvQkFDNUJMLElBRDRCLEdBQ2JLLFNBRGEsQ0FDNUJMLElBRDRCO0FBQUEsb0JBQ3RCTSxJQURzQixHQUNiRCxTQURhLENBQ3RCQyxJQURzQjs7QUFFbEMsdUJBQUtKLElBQUwsQ0FBVUYsSUFBVixFQUFnQk0sSUFBaEI7QUFDSCxhQUhEO0FBSUg7Ozs7RUF0QjBCQyxxQjs7a0JBeUJoQnBCLGdCIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWFyY2hTdG9yZSBmcm9tICcuLi9zZWFyY2gtc3RvcmUnO1xyXG5cclxuY29uc3QgTElTVEVORURfTk9ERVMgPSBbJ3F1ZXJ5JywgJ3Njb3BlJ107XHJcblxyXG4vKipcclxuKiBDbGFzcyBzdGFuZGluZyBmb3IgYWxsIGFkdmFuY2VkIHNlYXJjaCBpbmZvcm1hdGlvbi5cclxuKiBUaGUgc3RhdGUgc2hvdWxkIGJlIHRoZSBjb21wbGV0ZSBzdGF0ZSBvZiB0aGUgcGFnZS5cclxuKi9cclxuY2xhc3MgUXVpY2tTZWFyY2hTdG9yZSBleHRlbmRzIFNlYXJjaFN0b3JlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbmYpIHtcclxuICAgICAgICBjb25mID0gY29uZiB8fCB7fTtcclxuICAgICAgICBjb25mLmRlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiAncXVlcnknLFxyXG4gICAgICAgICAgICBzY29wZTogJ3Njb3BlJyxcclxuICAgICAgICAgICAgcmVzdWx0czogJ3Jlc3VsdHMnLFxyXG4gICAgICAgICAgICBmYWNldHM6ICdmYWNldHMnLFxyXG4gICAgICAgICAgICB0b3RhbENvdW50OiAndG90YWxDb3VudCdcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbmYuaWRlbnRpZmllciA9IGNvbmYuaWRlbnRpZmllciB8fCAnUVVJQ0tfU0VBUkNIJztcclxuICAgICAgICBzdXBlcihjb25mKTtcclxuICAgIH1cclxuXHJcbiAgICBlbWl0UGVuZGluZ0V2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nRXZlbnRzLmZpbmQoZXYgPT4gTElTVEVORURfTk9ERVMuaW5jbHVkZXMoZXYubmFtZS5zcGxpdCgnOmNoYW5nZScpWzBdKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdxdWljay1zZWFyY2gtY3JpdGVyaWFzOmNoYW5nZScsIHsgc3RhdHVzOiAndXBkYXRlJyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nRXZlbnRzLm1hcCgoZXZ0VG9FbWl0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7IG5hbWUsIGRhdGEgfSA9IGV2dFRvRW1pdDtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KG5hbWUsIGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQgZGVmYXVsdCBRdWlja1NlYXJjaFN0b3JlO1xyXG4iXX0=