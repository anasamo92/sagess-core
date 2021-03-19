'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.quickSearchStore = exports.advancedSearchStore = undefined;

var _advancedSearch = require('../store/search/advanced-search');

var _advancedSearch2 = _interopRequireDefault(_advancedSearch);

var _quickSearch = require('../store/search/quick-search');

var _quickSearch2 = _interopRequireDefault(_quickSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var quickSearchStore = new _quickSearch2.default();
var advancedSearchStore = new _advancedSearch2.default();

exports.advancedSearchStore = advancedSearchStore;
exports.quickSearchStore = quickSearchStore;
exports.default = {
    advancedSearchStore: advancedSearchStore,
    quickSearchStore: quickSearchStore
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJxdWlja1NlYXJjaFN0b3JlIiwiUXVpY2tTZWFyY2hTdG9yZSIsImFkdmFuY2VkU2VhcmNoU3RvcmUiLCJBZHZhbmNlZFNlYXJjaFN0b3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsbUJBQW1CLElBQUlDLHFCQUFKLEVBQXpCO0FBQ0EsSUFBTUMsc0JBQXNCLElBQUlDLHdCQUFKLEVBQTVCOztRQUdJRCxtQixHQUFBQSxtQjtRQUNBRixnQixHQUFBQSxnQjtrQkFHVztBQUNYRSw0Q0FEVztBQUVYRjtBQUZXLEMiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkdmFuY2VkU2VhcmNoU3RvcmUgZnJvbSAnLi4vc3RvcmUvc2VhcmNoL2FkdmFuY2VkLXNlYXJjaCc7XHJcbmltcG9ydCBRdWlja1NlYXJjaFN0b3JlIGZyb20gJy4uL3N0b3JlL3NlYXJjaC9xdWljay1zZWFyY2gnO1xyXG5cclxuY29uc3QgcXVpY2tTZWFyY2hTdG9yZSA9IG5ldyBRdWlja1NlYXJjaFN0b3JlKCk7XHJcbmNvbnN0IGFkdmFuY2VkU2VhcmNoU3RvcmUgPSBuZXcgQWR2YW5jZWRTZWFyY2hTdG9yZSgpO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGFkdmFuY2VkU2VhcmNoU3RvcmUsXHJcbiAgICBxdWlja1NlYXJjaFN0b3JlXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBhZHZhbmNlZFNlYXJjaFN0b3JlLFxyXG4gICAgcXVpY2tTZWFyY2hTdG9yZVxyXG59OyJdfQ==