'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = searchActionBuilder;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _builder2 = require('./builder');

var _builder3 = _interopRequireDefault(_builder2);

var _parser2 = require('./parser');

var _parser3 = _interopRequireDefault(_parser2);

var _dispatcher = require('../../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _errorParsing = require('../../network/error-parsing');

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } //Dependencies.


var ALL = 'ALL';
var STAR = '*';

/**
* Search action generated from the config.
* @param  {object} config - Action configuration.
* @return {function} - The generated action from the congig.
*/
function searchActionBuilder(config) {
    /**
    * Dispatch the results on the search store
    * @param  {object} data - The data to dispatch.
    */
    var _dispatchResult = function _dispatchResult(data) {
        _dispatcher2.default.handleServerAction({
            data: data,
            type: 'update',
            identifier: config.identifier
        });
    };
    var parser = config.parser && (0, _isObject2.default)(config.parser) ? Object.assign({}, _parser3.default, config.parser) : _parser3.default;
    /**
    * Method call when there is an error.
    * @param  {object} config -  The action builder configuration.
    * @param  {object} err    - The error from the API call.
    * @return {object}     - The data from the manageResponseErrors function.
    */
    function _errorOnCall(err) {
        (0, _errorParsing.manageResponseErrors)(err, config);
        //_dispatchGlobalError shoud be separated.
    }

    /**
    * Build search action.
    *
    * Expected server data format :
    * -----------------------------
    * {
    * 	"criteria": "*",
    *  	"facets": {FCT_MOVIE_TYPE: "Télefilm", FCT_MOVIE_TITLE: "g-m"}
    * }
    *
    * @param  {Boolean} isScroll - Is the action result from a scrolling.
    */
    return function searchAction(isScroll) {
        //Read search options from the accessor define in the config.
        var _config$getSearchOpti = config.getSearchOptions(),
            scope = _config$getSearchOpti.scope,
            query = _config$getSearchOpti.query,
            selectedFacets = _config$getSearchOpti.selectedFacets,
            groupingKey = _config$getSearchOpti.groupingKey,
            sortBy = _config$getSearchOpti.sortBy,
            sortAsc = _config$getSearchOpti.sortAsc,
            results = _config$getSearchOpti.results,
            totalCount = _config$getSearchOpti.totalCount,
            otherProps = _objectWithoutProperties(_config$getSearchOpti, ['scope', 'query', 'selectedFacets', 'groupingKey', 'sortBy', 'sortAsc', 'results', 'totalCount']);

        //Number of element to search on each search.


        var nbSearchElement = config.nbSearchElement;
        //Process the query if empty.
        if (!query || '' === query) {
            query = STAR;
        }
        //Build URL data.
        var urlData = (0, _objectAssign2.default)(_builder3.default.pagination({ results: results, totalCount: totalCount, isScroll: isScroll, nbSearchElement: nbSearchElement }), _builder3.default.orderAndSort({ sortBy: sortBy, sortAsc: sortAsc }));
        //Build body data.
        var postData = Object.assign({}, otherProps, {
            criteria: { query: query, scope: scope },
            facets: selectedFacets ? _builder3.default.facets(selectedFacets) : {},
            group: groupingKey || ''
        });
        //Different call depending on the scope.
        if ((0, _isString2.default)(scope) && scope.toUpperCase() === ALL) {
            //Call the search action.
            config.service.unscoped({ urlData: urlData, data: postData }).then(parser.unscopedResponse).then(_dispatchResult).catch(_errorOnCall);
        } else {
            //The component which call the serice should be know if it has all the data.
            config.service.scoped({ urlData: urlData, data: postData }).then(function (response) {
                return parser.scopedResponse(response, { isScroll: isScroll, scope: scope, results: results });
            }).then(_dispatchResult).catch(_errorOnCall);
        }
    };
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJzZWFyY2hBY3Rpb25CdWlsZGVyIiwiQUxMIiwiU1RBUiIsImNvbmZpZyIsIl9kaXNwYXRjaFJlc3VsdCIsImRhdGEiLCJkaXNwYXRjaGVyIiwiaGFuZGxlU2VydmVyQWN0aW9uIiwidHlwZSIsImlkZW50aWZpZXIiLCJwYXJzZXIiLCJfcGFyc2VyIiwiX2Vycm9yT25DYWxsIiwiZXJyIiwic2VhcmNoQWN0aW9uIiwiaXNTY3JvbGwiLCJnZXRTZWFyY2hPcHRpb25zIiwic2NvcGUiLCJxdWVyeSIsInNlbGVjdGVkRmFjZXRzIiwiZ3JvdXBpbmdLZXkiLCJzb3J0QnkiLCJzb3J0QXNjIiwicmVzdWx0cyIsInRvdGFsQ291bnQiLCJvdGhlclByb3BzIiwibmJTZWFyY2hFbGVtZW50IiwidXJsRGF0YSIsIl9idWlsZGVyIiwicGFnaW5hdGlvbiIsIm9yZGVyQW5kU29ydCIsInBvc3REYXRhIiwiY3JpdGVyaWEiLCJmYWNldHMiLCJncm91cCIsInRvVXBwZXJDYXNlIiwic2VydmljZSIsInVuc2NvcGVkIiwidGhlbiIsInVuc2NvcGVkUmVzcG9uc2UiLCJjYXRjaCIsInNjb3BlZCIsInJlc3BvbnNlIiwic2NvcGVkUmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQWlCd0JBLG1COztBQWhCeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Nk5BUEE7OztBQVNBLElBQU1DLE1BQU0sS0FBWjtBQUNBLElBQU1DLE9BQU8sR0FBYjs7QUFFQTs7Ozs7QUFLZSxTQUFTRixtQkFBVCxDQUE2QkcsTUFBN0IsRUFBcUM7QUFDaEQ7Ozs7QUFJQSxRQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNDLElBQUQsRUFBVTtBQUM5QkMsNkJBQVdDLGtCQUFYLENBQThCO0FBQzFCRixzQkFEMEI7QUFFMUJHLGtCQUFNLFFBRm9CO0FBRzFCQyx3QkFBWU4sT0FBT007QUFITyxTQUE5QjtBQUtILEtBTkQ7QUFPQSxRQUFNQyxTQUFTUCxPQUFPTyxNQUFQLElBQWlCLHdCQUFTUCxPQUFPTyxNQUFoQixDQUFqQixxQkFBZ0RDLGdCQUFoRCxFQUE0RFIsT0FBT08sTUFBbkUsSUFBOEVDLGdCQUE3RjtBQUNBOzs7Ozs7QUFNQSxhQUFTQyxZQUFULENBQXNCQyxHQUF0QixFQUEyQjtBQUN2QixnREFBcUJBLEdBQXJCLEVBQTBCVixNQUExQjtBQUNBO0FBQ0g7O0FBR0Q7Ozs7Ozs7Ozs7OztBQVlBLFdBQU8sU0FBU1csWUFBVCxDQUFzQkMsUUFBdEIsRUFBZ0M7QUFDbkM7QUFEbUMsb0NBTy9CWixPQUFPYSxnQkFBUCxFQVArQjtBQUFBLFlBRy9CQyxLQUgrQix5QkFHL0JBLEtBSCtCO0FBQUEsWUFHeEJDLEtBSHdCLHlCQUd4QkEsS0FId0I7QUFBQSxZQUdqQkMsY0FIaUIseUJBR2pCQSxjQUhpQjtBQUFBLFlBSS9CQyxXQUorQix5QkFJL0JBLFdBSitCO0FBQUEsWUFJbEJDLE1BSmtCLHlCQUlsQkEsTUFKa0I7QUFBQSxZQUlWQyxPQUpVLHlCQUlWQSxPQUpVO0FBQUEsWUFLL0JDLE9BTCtCLHlCQUsvQkEsT0FMK0I7QUFBQSxZQUt0QkMsVUFMc0IseUJBS3RCQSxVQUxzQjtBQUFBLFlBTTVCQyxVQU40Qjs7QUFTbkM7OztBQUNBLFlBQU1DLGtCQUFrQnZCLE9BQU91QixlQUEvQjtBQUNBO0FBQ0EsWUFBSSxDQUFDUixLQUFELElBQVUsT0FBT0EsS0FBckIsRUFBNEI7QUFDeEJBLG9CQUFRaEIsSUFBUjtBQUNIO0FBQ0Q7QUFDQSxZQUFNeUIsVUFBVSw0QkFDWkMsa0JBQVNDLFVBQVQsQ0FBb0IsRUFBRU4sZ0JBQUYsRUFBV0Msc0JBQVgsRUFBdUJULGtCQUF2QixFQUFpQ1csZ0NBQWpDLEVBQXBCLENBRFksRUFFWkUsa0JBQVNFLFlBQVQsQ0FBc0IsRUFBRVQsY0FBRixFQUFVQyxnQkFBVixFQUF0QixDQUZZLENBQWhCO0FBSUE7QUFDQSxZQUFNUyw2QkFDQ04sVUFERDtBQUVGTyxzQkFBVSxFQUFFZCxZQUFGLEVBQVNELFlBQVQsRUFGUjtBQUdGZ0Isb0JBQVFkLGlCQUFpQlMsa0JBQVNLLE1BQVQsQ0FBZ0JkLGNBQWhCLENBQWpCLEdBQW1ELEVBSHpEO0FBSUZlLG1CQUFPZCxlQUFlO0FBSnBCLFVBQU47QUFNQTtBQUNBLFlBQUksd0JBQVNILEtBQVQsS0FBbUJBLE1BQU1rQixXQUFOLE9BQXdCbEMsR0FBL0MsRUFBb0Q7QUFDaEQ7QUFDQUUsbUJBQU9pQyxPQUFQLENBQWVDLFFBQWYsQ0FBd0IsRUFBRVYsU0FBU0EsT0FBWCxFQUFvQnRCLE1BQU0wQixRQUExQixFQUF4QixFQUNLTyxJQURMLENBQ1U1QixPQUFPNkIsZ0JBRGpCLEVBRUtELElBRkwsQ0FFVWxDLGVBRlYsRUFHS29DLEtBSEwsQ0FHVzVCLFlBSFg7QUFJSCxTQU5ELE1BTU87QUFDSDtBQUNBVCxtQkFBT2lDLE9BQVAsQ0FBZUssTUFBZixDQUFzQixFQUFFZCxTQUFTQSxPQUFYLEVBQW9CdEIsTUFBTTBCLFFBQTFCLEVBQXRCLEVBQ0tPLElBREwsQ0FDVSxVQUFDSSxRQUFELEVBQWM7QUFDaEIsdUJBQU9oQyxPQUFPaUMsY0FBUCxDQUNIRCxRQURHLEVBRUgsRUFBRTNCLGtCQUFGLEVBQVlFLFlBQVosRUFBbUJNLGdCQUFuQixFQUZHLENBQVA7QUFJSCxhQU5MLEVBT0tlLElBUEwsQ0FPVWxDLGVBUFYsRUFRS29DLEtBUkwsQ0FRVzVCLFlBUlg7QUFTSDtBQUNKLEtBOUNEO0FBK0NIIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2xhbmcvaXNPYmplY3QnO1xyXG5pbXBvcnQgX2J1aWxkZXIgZnJvbSAnLi9idWlsZGVyJztcclxuaW1wb3J0IF9wYXJzZXIgZnJvbSAnLi9wYXJzZXInO1xyXG5pbXBvcnQgZGlzcGF0Y2hlciBmcm9tICcuLi8uLi9kaXNwYXRjaGVyJztcclxuaW1wb3J0IHsgbWFuYWdlUmVzcG9uc2VFcnJvcnMgfSBmcm9tICcuLi8uLi9uZXR3b3JrL2Vycm9yLXBhcnNpbmcnO1xyXG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnbG9kYXNoL2xhbmcvaXNTdHJpbmcnO1xyXG5cclxuY29uc3QgQUxMID0gJ0FMTCc7XHJcbmNvbnN0IFNUQVIgPSAnKic7XHJcblxyXG4vKipcclxuKiBTZWFyY2ggYWN0aW9uIGdlbmVyYXRlZCBmcm9tIHRoZSBjb25maWcuXHJcbiogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSBBY3Rpb24gY29uZmlndXJhdGlvbi5cclxuKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSBUaGUgZ2VuZXJhdGVkIGFjdGlvbiBmcm9tIHRoZSBjb25naWcuXHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlYXJjaEFjdGlvbkJ1aWxkZXIoY29uZmlnKSB7XHJcbiAgICAvKipcclxuICAgICogRGlzcGF0Y2ggdGhlIHJlc3VsdHMgb24gdGhlIHNlYXJjaCBzdG9yZVxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGRhdGEgLSBUaGUgZGF0YSB0byBkaXNwYXRjaC5cclxuICAgICovXHJcbiAgICBjb25zdCBfZGlzcGF0Y2hSZXN1bHQgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcclxuICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgdHlwZTogJ3VwZGF0ZScsXHJcbiAgICAgICAgICAgIGlkZW50aWZpZXI6IGNvbmZpZy5pZGVudGlmaWVyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGFyc2VyID0gY29uZmlnLnBhcnNlciAmJiBpc09iamVjdChjb25maWcucGFyc2VyKSA/IHsgLi4uX3BhcnNlciwgLi4uY29uZmlnLnBhcnNlciB9IDogX3BhcnNlcjtcclxuICAgIC8qKlxyXG4gICAgKiBNZXRob2QgY2FsbCB3aGVuIHRoZXJlIGlzIGFuIGVycm9yLlxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyAtICBUaGUgYWN0aW9uIGJ1aWxkZXIgY29uZmlndXJhdGlvbi5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSBlcnIgICAgLSBUaGUgZXJyb3IgZnJvbSB0aGUgQVBJIGNhbGwuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gICAgIC0gVGhlIGRhdGEgZnJvbSB0aGUgbWFuYWdlUmVzcG9uc2VFcnJvcnMgZnVuY3Rpb24uXHJcbiAgICAqL1xyXG4gICAgZnVuY3Rpb24gX2Vycm9yT25DYWxsKGVycikge1xyXG4gICAgICAgIG1hbmFnZVJlc3BvbnNlRXJyb3JzKGVyciwgY29uZmlnKTtcclxuICAgICAgICAvL19kaXNwYXRjaEdsb2JhbEVycm9yIHNob3VkIGJlIHNlcGFyYXRlZC5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEJ1aWxkIHNlYXJjaCBhY3Rpb24uXHJcbiAgICAqXHJcbiAgICAqIEV4cGVjdGVkIHNlcnZlciBkYXRhIGZvcm1hdCA6XHJcbiAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAqIHtcclxuICAgICogXHRcImNyaXRlcmlhXCI6IFwiKlwiLFxyXG4gICAgKiAgXHRcImZhY2V0c1wiOiB7RkNUX01PVklFX1RZUEU6IFwiVMOpbGVmaWxtXCIsIEZDVF9NT1ZJRV9USVRMRTogXCJnLW1cIn1cclxuICAgICogfVxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0gIHtCb29sZWFufSBpc1Njcm9sbCAtIElzIHRoZSBhY3Rpb24gcmVzdWx0IGZyb20gYSBzY3JvbGxpbmcuXHJcbiAgICAqL1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHNlYXJjaEFjdGlvbihpc1Njcm9sbCkge1xyXG4gICAgICAgIC8vUmVhZCBzZWFyY2ggb3B0aW9ucyBmcm9tIHRoZSBhY2Nlc3NvciBkZWZpbmUgaW4gdGhlIGNvbmZpZy5cclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBzY29wZSwgcXVlcnksIHNlbGVjdGVkRmFjZXRzLFxyXG4gICAgICAgICAgICBncm91cGluZ0tleSwgc29ydEJ5LCBzb3J0QXNjLFxyXG4gICAgICAgICAgICByZXN1bHRzLCB0b3RhbENvdW50LFxyXG4gICAgICAgICAgICAuLi5vdGhlclByb3BzXHJcbiAgICAgICAgfSA9IGNvbmZpZy5nZXRTZWFyY2hPcHRpb25zKCk7XHJcblxyXG4gICAgICAgIC8vTnVtYmVyIG9mIGVsZW1lbnQgdG8gc2VhcmNoIG9uIGVhY2ggc2VhcmNoLlxyXG4gICAgICAgIGNvbnN0IG5iU2VhcmNoRWxlbWVudCA9IGNvbmZpZy5uYlNlYXJjaEVsZW1lbnQ7XHJcbiAgICAgICAgLy9Qcm9jZXNzIHRoZSBxdWVyeSBpZiBlbXB0eS5cclxuICAgICAgICBpZiAoIXF1ZXJ5IHx8ICcnID09PSBxdWVyeSkge1xyXG4gICAgICAgICAgICBxdWVyeSA9IFNUQVI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQnVpbGQgVVJMIGRhdGEuXHJcbiAgICAgICAgY29uc3QgdXJsRGF0YSA9IGFzc2lnbihcclxuICAgICAgICAgICAgX2J1aWxkZXIucGFnaW5hdGlvbih7IHJlc3VsdHMsIHRvdGFsQ291bnQsIGlzU2Nyb2xsLCBuYlNlYXJjaEVsZW1lbnQgfSksXHJcbiAgICAgICAgICAgIF9idWlsZGVyLm9yZGVyQW5kU29ydCh7IHNvcnRCeSwgc29ydEFzYyB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy9CdWlsZCBib2R5IGRhdGEuXHJcbiAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7XHJcbiAgICAgICAgICAgIC4uLm90aGVyUHJvcHMsXHJcbiAgICAgICAgICAgIGNyaXRlcmlhOiB7IHF1ZXJ5LCBzY29wZSB9LFxyXG4gICAgICAgICAgICBmYWNldHM6IHNlbGVjdGVkRmFjZXRzID8gX2J1aWxkZXIuZmFjZXRzKHNlbGVjdGVkRmFjZXRzKSA6IHt9LFxyXG4gICAgICAgICAgICBncm91cDogZ3JvdXBpbmdLZXkgfHwgJydcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vRGlmZmVyZW50IGNhbGwgZGVwZW5kaW5nIG9uIHRoZSBzY29wZS5cclxuICAgICAgICBpZiAoaXNTdHJpbmcoc2NvcGUpICYmIHNjb3BlLnRvVXBwZXJDYXNlKCkgPT09IEFMTCkge1xyXG4gICAgICAgICAgICAvL0NhbGwgdGhlIHNlYXJjaCBhY3Rpb24uXHJcbiAgICAgICAgICAgIGNvbmZpZy5zZXJ2aWNlLnVuc2NvcGVkKHsgdXJsRGF0YTogdXJsRGF0YSwgZGF0YTogcG9zdERhdGEgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHBhcnNlci51bnNjb3BlZFJlc3BvbnNlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oX2Rpc3BhdGNoUmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKF9lcnJvck9uQ2FsbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9UaGUgY29tcG9uZW50IHdoaWNoIGNhbGwgdGhlIHNlcmljZSBzaG91bGQgYmUga25vdyBpZiBpdCBoYXMgYWxsIHRoZSBkYXRhLlxyXG4gICAgICAgICAgICBjb25maWcuc2VydmljZS5zY29wZWQoeyB1cmxEYXRhOiB1cmxEYXRhLCBkYXRhOiBwb3N0RGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlci5zY29wZWRSZXNwb25zZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaXNTY3JvbGwsIHNjb3BlLCByZXN1bHRzIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKF9kaXNwYXRjaFJlc3VsdClcclxuICAgICAgICAgICAgICAgIC5jYXRjaChfZXJyb3JPbkNhbGwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuIl19