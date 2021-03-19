'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadActionFn;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _builder2 = require('./builder');

var _builder3 = _interopRequireDefault(_builder2);

var _parser2 = require('./parser');

var _parser3 = _interopRequireDefault(_parser2);

var _dispatcher = require('../../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _errorParsing = require('../../network/error-parsing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Search action generated from the config.
* @param  {object} config - Action configuration.
* @return {function} - The generated action from the congig.
*/
function loadActionFn(config) {
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
    * @param  {Boolean} isScroll - Is the action result from a scrolling.
    */
    return function listLoader(isScroll) {
        //Read search options from the accessor define in the config.
        // TODO: see if results should be named results.
        var _config$getListOption = config.getListOptions(),
            criteria = _config$getListOption.criteria,
            groupingKey = _config$getListOption.groupingKey,
            sortBy = _config$getListOption.sortBy,
            sortAsc = _config$getListOption.sortAsc,
            dataList = _config$getListOption.dataList,
            totalCount = _config$getListOption.totalCount;

        //Number of element to search on each search.


        var nbElement = config.nbElement;
        //Process the query if empty.

        //Build URL data.
        var urlData = (0, _objectAssign2.default)(_builder3.default.pagination({ dataList: dataList, totalCount: totalCount, isScroll: isScroll, nbElement: nbElement }), _builder3.default.orderAndSort({ sortBy: sortBy, sortAsc: sortAsc }));
        //Build body data.
        var postData = {
            criteria: criteria,
            group: groupingKey || ''
        };
        config.service({ urlData: urlData, data: postData }).then(function (response) {
            return (0, _parser3.default)(response, { isScroll: isScroll, dataList: dataList });
        }).then(_dispatchResult).catch(_errorOnCall);
    };
} //Dependencies.
;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJsb2FkQWN0aW9uRm4iLCJjb25maWciLCJfZGlzcGF0Y2hSZXN1bHQiLCJkYXRhIiwiZGlzcGF0Y2hlciIsImhhbmRsZVNlcnZlckFjdGlvbiIsInR5cGUiLCJpZGVudGlmaWVyIiwiX2Vycm9yT25DYWxsIiwiZXJyIiwibGlzdExvYWRlciIsImlzU2Nyb2xsIiwiZ2V0TGlzdE9wdGlvbnMiLCJjcml0ZXJpYSIsImdyb3VwaW5nS2V5Iiwic29ydEJ5Iiwic29ydEFzYyIsImRhdGFMaXN0IiwidG90YWxDb3VudCIsIm5iRWxlbWVudCIsInVybERhdGEiLCJfYnVpbGRlciIsInBhZ2luYXRpb24iLCJvcmRlckFuZFNvcnQiLCJwb3N0RGF0YSIsImdyb3VwIiwic2VydmljZSIsInRoZW4iLCJyZXNwb25zZSIsImNhdGNoIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFhd0JBLFk7O0FBWnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7Ozs7QUFLZSxTQUFTQSxZQUFULENBQXNCQyxNQUF0QixFQUE4QjtBQUN6Qzs7OztBQUlBLFFBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsSUFBRCxFQUFVO0FBQzlCQyw2QkFBV0Msa0JBQVgsQ0FBOEI7QUFDMUJGLHNCQUQwQjtBQUUxQkcsa0JBQU0sUUFGb0I7QUFHMUJDLHdCQUFZTixPQUFPTTtBQUhPLFNBQTlCO0FBS0gsS0FORDtBQU9BOzs7Ozs7QUFNQSxhQUFTQyxZQUFULENBQXNCQyxHQUF0QixFQUEyQjtBQUN2QixnREFBcUJBLEdBQXJCLEVBQTBCUixNQUExQjtBQUNBO0FBQ0g7O0FBRUQ7Ozs7QUFJQSxXQUFPLFNBQVNTLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCO0FBQ2pDO0FBQ0E7QUFGaUMsb0NBTzdCVixPQUFPVyxjQUFQLEVBUDZCO0FBQUEsWUFJN0JDLFFBSjZCLHlCQUk3QkEsUUFKNkI7QUFBQSxZQUs3QkMsV0FMNkIseUJBSzdCQSxXQUw2QjtBQUFBLFlBS2hCQyxNQUxnQix5QkFLaEJBLE1BTGdCO0FBQUEsWUFLUkMsT0FMUSx5QkFLUkEsT0FMUTtBQUFBLFlBTTdCQyxRQU42Qix5QkFNN0JBLFFBTjZCO0FBQUEsWUFNbkJDLFVBTm1CLHlCQU1uQkEsVUFObUI7O0FBU2pDOzs7QUFDQSxZQUFNQyxZQUFZbEIsT0FBT2tCLFNBQXpCO0FBQ0E7O0FBRUE7QUFDQSxZQUFNQyxVQUFVLDRCQUNaQyxrQkFBU0MsVUFBVCxDQUFvQixFQUFFTCxrQkFBRixFQUFZQyxzQkFBWixFQUF3QlAsa0JBQXhCLEVBQWtDUSxvQkFBbEMsRUFBcEIsQ0FEWSxFQUVaRSxrQkFBU0UsWUFBVCxDQUFzQixFQUFFUixjQUFGLEVBQVVDLGdCQUFWLEVBQXRCLENBRlksQ0FBaEI7QUFJQTtBQUNBLFlBQU1RLFdBQVc7QUFDYlgsc0JBQVVBLFFBREc7QUFFYlksbUJBQU9YLGVBQWU7QUFGVCxTQUFqQjtBQUlBYixlQUFPeUIsT0FBUCxDQUFlLEVBQUVOLFNBQVNBLE9BQVgsRUFBb0JqQixNQUFNcUIsUUFBMUIsRUFBZixFQUNLRyxJQURMLENBQ1UsVUFBQ0MsUUFBRCxFQUFjO0FBQ2hCLG1CQUFPLHNCQUNIQSxRQURHLEVBRUgsRUFBRWpCLGtCQUFGLEVBQVlNLGtCQUFaLEVBRkcsQ0FBUDtBQUlILFNBTkwsRUFPS1UsSUFQTCxDQU9VekIsZUFQVixFQVFLMkIsS0FSTCxDQVFXckIsWUFSWDtBQVNILEtBaENEO0FBaUNILEMsQ0F6RUQ7QUF5RUMiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9EZXBlbmRlbmNpZXMuXHJcbmltcG9ydCBhc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XHJcbmltcG9ydCBfYnVpbGRlciBmcm9tICcuL2J1aWxkZXInO1xyXG5pbXBvcnQgX3BhcnNlciBmcm9tICcuL3BhcnNlcic7XHJcbmltcG9ydCBkaXNwYXRjaGVyIGZyb20gJy4uLy4uL2Rpc3BhdGNoZXInO1xyXG5pbXBvcnQgeyBtYW5hZ2VSZXNwb25zZUVycm9ycyB9IGZyb20gJy4uLy4uL25ldHdvcmsvZXJyb3ItcGFyc2luZyc7XHJcblxyXG5cclxuLyoqXHJcbiogU2VhcmNoIGFjdGlvbiBnZW5lcmF0ZWQgZnJvbSB0aGUgY29uZmlnLlxyXG4qIEBwYXJhbSAge29iamVjdH0gY29uZmlnIC0gQWN0aW9uIGNvbmZpZ3VyYXRpb24uXHJcbiogQHJldHVybiB7ZnVuY3Rpb259IC0gVGhlIGdlbmVyYXRlZCBhY3Rpb24gZnJvbSB0aGUgY29uZ2lnLlxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkQWN0aW9uRm4oY29uZmlnKSB7XHJcbiAgICAvKipcclxuICAgICogRGlzcGF0Y2ggdGhlIHJlc3VsdHMgb24gdGhlIHNlYXJjaCBzdG9yZVxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGRhdGEgLSBUaGUgZGF0YSB0byBkaXNwYXRjaC5cclxuICAgICovXHJcbiAgICBjb25zdCBfZGlzcGF0Y2hSZXN1bHQgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlU2VydmVyQWN0aW9uKHtcclxuICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgdHlwZTogJ3VwZGF0ZScsXHJcbiAgICAgICAgICAgIGlkZW50aWZpZXI6IGNvbmZpZy5pZGVudGlmaWVyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2QgY2FsbCB3aGVuIHRoZXJlIGlzIGFuIGVycm9yLlxyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSAgVGhlIGFjdGlvbiBidWlsZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGVyciAgICAtIFRoZSBlcnJvciBmcm9tIHRoZSBBUEkgY2FsbC5cclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gICAgIC0gVGhlIGRhdGEgZnJvbSB0aGUgbWFuYWdlUmVzcG9uc2VFcnJvcnMgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIF9lcnJvck9uQ2FsbChlcnIpIHtcclxuICAgICAgICBtYW5hZ2VSZXNwb25zZUVycm9ycyhlcnIsIGNvbmZpZyk7XHJcbiAgICAgICAgLy9fZGlzcGF0Y2hHbG9iYWxFcnJvciBzaG91ZCBiZSBzZXBhcmF0ZWQuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEJ1aWxkIHNlYXJjaCBhY3Rpb24uXHJcbiAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGlzU2Nyb2xsIC0gSXMgdGhlIGFjdGlvbiByZXN1bHQgZnJvbSBhIHNjcm9sbGluZy5cclxuICAgICovXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gbGlzdExvYWRlcihpc1Njcm9sbCkge1xyXG4gICAgICAgIC8vUmVhZCBzZWFyY2ggb3B0aW9ucyBmcm9tIHRoZSBhY2Nlc3NvciBkZWZpbmUgaW4gdGhlIGNvbmZpZy5cclxuICAgICAgICAvLyBUT0RPOiBzZWUgaWYgcmVzdWx0cyBzaG91bGQgYmUgbmFtZWQgcmVzdWx0cy5cclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGNyaXRlcmlhLFxyXG4gICAgICAgICAgICBncm91cGluZ0tleSwgc29ydEJ5LCBzb3J0QXNjLFxyXG4gICAgICAgICAgICBkYXRhTGlzdCwgdG90YWxDb3VudFxyXG4gICAgICAgIH0gPSBjb25maWcuZ2V0TGlzdE9wdGlvbnMoKTtcclxuXHJcbiAgICAgICAgLy9OdW1iZXIgb2YgZWxlbWVudCB0byBzZWFyY2ggb24gZWFjaCBzZWFyY2guXHJcbiAgICAgICAgY29uc3QgbmJFbGVtZW50ID0gY29uZmlnLm5iRWxlbWVudDtcclxuICAgICAgICAvL1Byb2Nlc3MgdGhlIHF1ZXJ5IGlmIGVtcHR5LlxyXG5cclxuICAgICAgICAvL0J1aWxkIFVSTCBkYXRhLlxyXG4gICAgICAgIGNvbnN0IHVybERhdGEgPSBhc3NpZ24oXHJcbiAgICAgICAgICAgIF9idWlsZGVyLnBhZ2luYXRpb24oeyBkYXRhTGlzdCwgdG90YWxDb3VudCwgaXNTY3JvbGwsIG5iRWxlbWVudCB9KSxcclxuICAgICAgICAgICAgX2J1aWxkZXIub3JkZXJBbmRTb3J0KHsgc29ydEJ5LCBzb3J0QXNjIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvL0J1aWxkIGJvZHkgZGF0YS5cclxuICAgICAgICBjb25zdCBwb3N0RGF0YSA9IHtcclxuICAgICAgICAgICAgY3JpdGVyaWE6IGNyaXRlcmlhLFxyXG4gICAgICAgICAgICBncm91cDogZ3JvdXBpbmdLZXkgfHwgJydcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbmZpZy5zZXJ2aWNlKHsgdXJsRGF0YTogdXJsRGF0YSwgZGF0YTogcG9zdERhdGEgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3BhcnNlcihcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSxcclxuICAgICAgICAgICAgICAgICAgICB7IGlzU2Nyb2xsLCBkYXRhTGlzdCB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihfZGlzcGF0Y2hSZXN1bHQpXHJcbiAgICAgICAgICAgIC5jYXRjaChfZXJyb3JPbkNhbGwpO1xyXG4gICAgfTtcclxufTtcclxuIl19