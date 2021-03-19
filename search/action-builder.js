'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (config) {
    config = config || {};
    if (!config.identifier) {
        console.warn('Your action should have an identifier');
    }
    if (!config.service) {
        console.warn('Your action should have a service');
    }
    if (!config.getSearchOptions) {
        console.warn('Your action should have a search options getter.');
    }
    if (!config.nbSearchElement) {
        config.nbSearchElement = NB_SEARCH_ELEMENT;
    }
    return {
        /**
         * Build the search for the identifier scope.
         * @return {function} The search function for the given identifier.
         */
        search: (0, _searchAction2.default)(config),
        /**
        * Update the query for the identifier scope.
        * @param  {string} value - The query value
        * @return {function} The update query function for the given identifier.
        */
        updateProperties: function updateProperties(value) {
            return _dispatcher2.default.handleViewAction({
                data: value,
                type: 'update',
                identifier: config.identifier
            });
        }
    };
};

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _searchAction = require('./search-action');

var _searchAction2 = _interopRequireDefault(_searchAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NB_SEARCH_ELEMENT = 50;

/**
  * Builded search action.
  * @param  {object} options - The options used to build the service, it should have the following structure:
  * ```javascript
  * {
  *   identifier: string: should be 'ADVANCED_SEARCH' or 'QUICK_SEARCH'
  * 	service:{
  * 		scoped: "function which launch the scope search"
  * 		unScoped: "function whoch launch the unscoped search"
  * 	}
  * 	getSearchOptions a function which get the associated search store value
  * 	nbSearchElement: number of elements to request on each search.
  * }
  * ```
  * @return {function} - The builded search action.
  */
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJpZGVudGlmaWVyIiwiY29uc29sZSIsIndhcm4iLCJzZXJ2aWNlIiwiZ2V0U2VhcmNoT3B0aW9ucyIsIm5iU2VhcmNoRWxlbWVudCIsIk5CX1NFQVJDSF9FTEVNRU5UIiwic2VhcmNoIiwidXBkYXRlUHJvcGVydGllcyIsInZhbHVlIiwiZGlzcGF0Y2hlciIsImhhbmRsZVZpZXdBY3Rpb24iLCJkYXRhIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQW9CZSxVQUFVQSxNQUFWLEVBQWtCO0FBQzdCQSxhQUFTQSxVQUFVLEVBQW5CO0FBQ0EsUUFBSSxDQUFDQSxPQUFPQyxVQUFaLEVBQXdCO0FBQ3BCQyxnQkFBUUMsSUFBUixDQUFhLHVDQUFiO0FBQ0g7QUFDRCxRQUFJLENBQUNILE9BQU9JLE9BQVosRUFBcUI7QUFDakJGLGdCQUFRQyxJQUFSLENBQWEsbUNBQWI7QUFDSDtBQUNELFFBQUksQ0FBQ0gsT0FBT0ssZ0JBQVosRUFBOEI7QUFDMUJILGdCQUFRQyxJQUFSLENBQWEsa0RBQWI7QUFDSDtBQUNELFFBQUksQ0FBQ0gsT0FBT00sZUFBWixFQUE2QjtBQUN6Qk4sZUFBT00sZUFBUCxHQUF5QkMsaUJBQXpCO0FBQ0g7QUFDRCxXQUFPO0FBQ0g7Ozs7QUFJQUMsZ0JBQVEsNEJBQWFSLE1BQWIsQ0FMTDtBQU1IOzs7OztBQUtBUyx3QkFYRyw0QkFXY0MsS0FYZCxFQVdxQjtBQUNwQixtQkFBT0MscUJBQVdDLGdCQUFYLENBQTRCO0FBQy9CQyxzQkFBTUgsS0FEeUI7QUFFL0JJLHNCQUFNLFFBRnlCO0FBRy9CYiw0QkFBWUQsT0FBT0M7QUFIWSxhQUE1QixDQUFQO0FBS0g7QUFqQkUsS0FBUDtBQW1CSCxDOztBQXJERDs7OztBQUNBOzs7Ozs7QUFDQSxJQUFNTSxvQkFBb0IsRUFBMUI7O0FBRUEiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlcic7XHJcbmltcG9ydCBzZWFyY2hBY3Rpb24gZnJvbSAnLi9zZWFyY2gtYWN0aW9uJztcclxuY29uc3QgTkJfU0VBUkNIX0VMRU1FTlQgPSA1MDtcclxuXHJcbi8qKlxyXG4gICogQnVpbGRlZCBzZWFyY2ggYWN0aW9uLlxyXG4gICogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdXNlZCB0byBidWlsZCB0aGUgc2VydmljZSwgaXQgc2hvdWxkIGhhdmUgdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmU6XHJcbiAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgKiB7XHJcbiAgKiAgIGlkZW50aWZpZXI6IHN0cmluZzogc2hvdWxkIGJlICdBRFZBTkNFRF9TRUFSQ0gnIG9yICdRVUlDS19TRUFSQ0gnXHJcbiAgKiBcdHNlcnZpY2U6e1xyXG4gICogXHRcdHNjb3BlZDogXCJmdW5jdGlvbiB3aGljaCBsYXVuY2ggdGhlIHNjb3BlIHNlYXJjaFwiXHJcbiAgKiBcdFx0dW5TY29wZWQ6IFwiZnVuY3Rpb24gd2hvY2ggbGF1bmNoIHRoZSB1bnNjb3BlZCBzZWFyY2hcIlxyXG4gICogXHR9XHJcbiAgKiBcdGdldFNlYXJjaE9wdGlvbnMgYSBmdW5jdGlvbiB3aGljaCBnZXQgdGhlIGFzc29jaWF0ZWQgc2VhcmNoIHN0b3JlIHZhbHVlXHJcbiAgKiBcdG5iU2VhcmNoRWxlbWVudDogbnVtYmVyIG9mIGVsZW1lbnRzIHRvIHJlcXVlc3Qgb24gZWFjaCBzZWFyY2guXHJcbiAgKiB9XHJcbiAgKiBgYGBcclxuICAqIEByZXR1cm4ge2Z1bmN0aW9ufSAtIFRoZSBidWlsZGVkIHNlYXJjaCBhY3Rpb24uXHJcbiAgKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgaWYgKCFjb25maWcuaWRlbnRpZmllcikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignWW91ciBhY3Rpb24gc2hvdWxkIGhhdmUgYW4gaWRlbnRpZmllcicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjb25maWcuc2VydmljZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignWW91ciBhY3Rpb24gc2hvdWxkIGhhdmUgYSBzZXJ2aWNlJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWNvbmZpZy5nZXRTZWFyY2hPcHRpb25zKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdZb3VyIGFjdGlvbiBzaG91bGQgaGF2ZSBhIHNlYXJjaCBvcHRpb25zIGdldHRlci4nKTtcclxuICAgIH1cclxuICAgIGlmICghY29uZmlnLm5iU2VhcmNoRWxlbWVudCkge1xyXG4gICAgICAgIGNvbmZpZy5uYlNlYXJjaEVsZW1lbnQgPSBOQl9TRUFSQ0hfRUxFTUVOVDtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnVpbGQgdGhlIHNlYXJjaCBmb3IgdGhlIGlkZW50aWZpZXIgc2NvcGUuXHJcbiAgICAgICAgICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBzZWFyY2ggZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBpZGVudGlmaWVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNlYXJjaDogc2VhcmNoQWN0aW9uKGNvbmZpZyksXHJcbiAgICAgICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGhlIHF1ZXJ5IGZvciB0aGUgaWRlbnRpZmllciBzY29wZS5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgLSBUaGUgcXVlcnkgdmFsdWVcclxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgdXBkYXRlIHF1ZXJ5IGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gaWRlbnRpZmllci5cclxuICAgICAqL1xyXG4gICAgICAgIHVwZGF0ZVByb3BlcnRpZXModmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd1cGRhdGUnLFxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogY29uZmlnLmlkZW50aWZpZXJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG4iXX0=