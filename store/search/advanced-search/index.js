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

var LISTENED_NODES = ['query', 'scope', 'selectedFacets', 'groupingKey', 'sortBy', 'sortAsc'];

/**
* Class standing for all advanced search information.
* The state should be the complete state of the page.
*/

var AdvancedSearchStore = function (_SearchStore) {
    _inherits(AdvancedSearchStore, _SearchStore);

    function AdvancedSearchStore(conf) {
        _classCallCheck(this, AdvancedSearchStore);

        conf = conf || {};
        conf.definition = {
            query: 'query',
            scope: 'scope',
            facets: 'facets',
            selectedFacets: 'selectedFacets',
            groupingKey: 'groupingKey',
            sortBy: 'sortBy',
            sortAsc: 'sortAsc',
            results: 'results',
            totalCount: 'totalCount'
        };
        conf.identifier = conf.identifier || 'ADVANCED_SEARCH';
        return _possibleConstructorReturn(this, (AdvancedSearchStore.__proto__ || Object.getPrototypeOf(AdvancedSearchStore)).call(this, conf));
    }

    _createClass(AdvancedSearchStore, [{
        key: 'emitPendingEvents',
        value: function emitPendingEvents() {
            var _this2 = this;

            if (this.pendingEvents.find(function (ev) {
                return LISTENED_NODES.includes(ev.name.split(':change')[0]);
            })) {
                this.emit('advanced-search-criterias:change', { status: 'update' });
            }
            this.pendingEvents.map(function (evtToEmit) {
                var name = evtToEmit.name,
                    data = evtToEmit.data;

                _this2.emit(name, data);
            });
        }
    }]);

    return AdvancedSearchStore;
}(_searchStore2.default);

exports.default = AdvancedSearchStore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJMSVNURU5FRF9OT0RFUyIsIkFkdmFuY2VkU2VhcmNoU3RvcmUiLCJjb25mIiwiZGVmaW5pdGlvbiIsInF1ZXJ5Iiwic2NvcGUiLCJmYWNldHMiLCJzZWxlY3RlZEZhY2V0cyIsImdyb3VwaW5nS2V5Iiwic29ydEJ5Iiwic29ydEFzYyIsInJlc3VsdHMiLCJ0b3RhbENvdW50IiwiaWRlbnRpZmllciIsInBlbmRpbmdFdmVudHMiLCJmaW5kIiwiaW5jbHVkZXMiLCJldiIsIm5hbWUiLCJzcGxpdCIsImVtaXQiLCJzdGF0dXMiLCJtYXAiLCJldnRUb0VtaXQiLCJkYXRhIiwiU2VhcmNoU3RvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLGdCQUFuQixFQUFxQyxhQUFyQyxFQUFvRCxRQUFwRCxFQUE4RCxTQUE5RCxDQUF2Qjs7QUFFQTs7Ozs7SUFJTUMsbUI7OztBQUNGLGlDQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2RBLGVBQU9BLFFBQVEsRUFBZjtBQUNBQSxhQUFLQyxVQUFMLEdBQWtCO0FBQ2RDLG1CQUFPLE9BRE87QUFFZEMsbUJBQU8sT0FGTztBQUdkQyxvQkFBUSxRQUhNO0FBSWRDLDRCQUFnQixnQkFKRjtBQUtkQyx5QkFBYSxhQUxDO0FBTWRDLG9CQUFRLFFBTk07QUFPZEMscUJBQVMsU0FQSztBQVFkQyxxQkFBUyxTQVJLO0FBU2RDLHdCQUFZO0FBVEUsU0FBbEI7QUFXQVYsYUFBS1csVUFBTCxHQUFrQlgsS0FBS1csVUFBTCxJQUFtQixpQkFBckM7QUFiYyx5SUFjUlgsSUFkUTtBQWVqQjs7Ozs0Q0FFbUI7QUFBQTs7QUFDaEIsZ0JBQUksS0FBS1ksYUFBTCxDQUFtQkMsSUFBbkIsQ0FBd0I7QUFBQSx1QkFBTWYsZUFBZWdCLFFBQWYsQ0FBd0JDLEdBQUdDLElBQUgsQ0FBUUMsS0FBUixDQUFjLFNBQWQsRUFBeUIsQ0FBekIsQ0FBeEIsQ0FBTjtBQUFBLGFBQXhCLENBQUosRUFBeUY7QUFDckYscUJBQUtDLElBQUwsQ0FBVSxrQ0FBVixFQUE4QyxFQUFFQyxRQUFRLFFBQVYsRUFBOUM7QUFDSDtBQUNELGlCQUFLUCxhQUFMLENBQW1CUSxHQUFuQixDQUF1QixVQUFDQyxTQUFELEVBQWU7QUFBQSxvQkFDNUJMLElBRDRCLEdBQ2JLLFNBRGEsQ0FDNUJMLElBRDRCO0FBQUEsb0JBQ3RCTSxJQURzQixHQUNiRCxTQURhLENBQ3RCQyxJQURzQjs7QUFFbEMsdUJBQUtKLElBQUwsQ0FBVUYsSUFBVixFQUFnQk0sSUFBaEI7QUFDSCxhQUhEO0FBSUg7Ozs7RUExQjZCQyxxQjs7a0JBOEJuQnhCLG1CIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWFyY2hTdG9yZSBmcm9tICcuLi9zZWFyY2gtc3RvcmUnO1xyXG5cclxuY29uc3QgTElTVEVORURfTk9ERVMgPSBbJ3F1ZXJ5JywgJ3Njb3BlJywgJ3NlbGVjdGVkRmFjZXRzJywgJ2dyb3VwaW5nS2V5JywgJ3NvcnRCeScsICdzb3J0QXNjJ107XHJcblxyXG4vKipcclxuKiBDbGFzcyBzdGFuZGluZyBmb3IgYWxsIGFkdmFuY2VkIHNlYXJjaCBpbmZvcm1hdGlvbi5cclxuKiBUaGUgc3RhdGUgc2hvdWxkIGJlIHRoZSBjb21wbGV0ZSBzdGF0ZSBvZiB0aGUgcGFnZS5cclxuKi9cclxuY2xhc3MgQWR2YW5jZWRTZWFyY2hTdG9yZSBleHRlbmRzIFNlYXJjaFN0b3JlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbmYpIHtcclxuICAgICAgICBjb25mID0gY29uZiB8fCB7fTtcclxuICAgICAgICBjb25mLmRlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiAncXVlcnknLFxyXG4gICAgICAgICAgICBzY29wZTogJ3Njb3BlJyxcclxuICAgICAgICAgICAgZmFjZXRzOiAnZmFjZXRzJyxcclxuICAgICAgICAgICAgc2VsZWN0ZWRGYWNldHM6ICdzZWxlY3RlZEZhY2V0cycsXHJcbiAgICAgICAgICAgIGdyb3VwaW5nS2V5OiAnZ3JvdXBpbmdLZXknLFxyXG4gICAgICAgICAgICBzb3J0Qnk6ICdzb3J0QnknLFxyXG4gICAgICAgICAgICBzb3J0QXNjOiAnc29ydEFzYycsXHJcbiAgICAgICAgICAgIHJlc3VsdHM6ICdyZXN1bHRzJyxcclxuICAgICAgICAgICAgdG90YWxDb3VudDogJ3RvdGFsQ291bnQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25mLmlkZW50aWZpZXIgPSBjb25mLmlkZW50aWZpZXIgfHwgJ0FEVkFOQ0VEX1NFQVJDSCc7XHJcbiAgICAgICAgc3VwZXIoY29uZik7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdFBlbmRpbmdFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGVuZGluZ0V2ZW50cy5maW5kKGV2ID0+IExJU1RFTkVEX05PREVTLmluY2x1ZGVzKGV2Lm5hbWUuc3BsaXQoJzpjaGFuZ2UnKVswXSkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnYWR2YW5jZWQtc2VhcmNoLWNyaXRlcmlhczpjaGFuZ2UnLCB7IHN0YXR1czogJ3VwZGF0ZScgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50cy5tYXAoKGV2dFRvRW1pdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeyBuYW1lLCBkYXRhIH0gPSBldnRUb0VtaXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChuYW1lLCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkdmFuY2VkU2VhcmNoU3RvcmU7XHJcbiJdfQ==