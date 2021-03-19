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
    if (!config.getListOptions) {
        console.warn('Your action should have a search options getter.');
    }
    if (!config.nbElement) {
        config.nbElement = NB_LIST_ELEMENT;
    }
    return {
        /**
         * Build the search for the identifier scope.
         * @return {function} The search function for the given identifier.
         */
        load: (0, _loadAction2.default)(config),
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

var _loadAction = require('./load-action');

var _loadAction2 = _interopRequireDefault(_loadAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NB_LIST_ELEMENT = 50;

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
 * 	nbElement: number of elements to request on each search.
 * }
 * ```
 * @return {function} - The builded search action.
 */
;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJpZGVudGlmaWVyIiwiY29uc29sZSIsIndhcm4iLCJzZXJ2aWNlIiwiZ2V0TGlzdE9wdGlvbnMiLCJuYkVsZW1lbnQiLCJOQl9MSVNUX0VMRU1FTlQiLCJsb2FkIiwidXBkYXRlUHJvcGVydGllcyIsInZhbHVlIiwiZGlzcGF0Y2hlciIsImhhbmRsZVZpZXdBY3Rpb24iLCJkYXRhIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQW9CZSxVQUFVQSxNQUFWLEVBQWtCO0FBQzdCQSxhQUFTQSxVQUFVLEVBQW5CO0FBQ0EsUUFBSSxDQUFDQSxPQUFPQyxVQUFaLEVBQXdCO0FBQ3BCQyxnQkFBUUMsSUFBUixDQUFhLHVDQUFiO0FBQ0g7QUFDRCxRQUFJLENBQUNILE9BQU9JLE9BQVosRUFBcUI7QUFDakJGLGdCQUFRQyxJQUFSLENBQWEsbUNBQWI7QUFDSDtBQUNELFFBQUksQ0FBQ0gsT0FBT0ssY0FBWixFQUE0QjtBQUN4QkgsZ0JBQVFDLElBQVIsQ0FBYSxrREFBYjtBQUNIO0FBQ0QsUUFBSSxDQUFDSCxPQUFPTSxTQUFaLEVBQXVCO0FBQ25CTixlQUFPTSxTQUFQLEdBQW1CQyxlQUFuQjtBQUNIO0FBQ0QsV0FBTztBQUNIOzs7O0FBSUFDLGNBQU0sMEJBQVdSLE1BQVgsQ0FMSDtBQU1IOzs7OztBQUtBUyx3QkFYRyw0QkFXY0MsS0FYZCxFQVdxQjtBQUNwQixtQkFBT0MscUJBQVdDLGdCQUFYLENBQTRCO0FBQy9CQyxzQkFBTUgsS0FEeUI7QUFFL0JJLHNCQUFNLFFBRnlCO0FBRy9CYiw0QkFBWUQsT0FBT0M7QUFIWSxhQUE1QixDQUFQO0FBS0g7QUFqQkUsS0FBUDtBQW1CSCxDOztBQXJERDs7OztBQUNBOzs7Ozs7QUFDQSxJQUFNTSxrQkFBa0IsRUFBeEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpREMiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRpc3BhdGNoZXIgZnJvbSAnLi4vZGlzcGF0Y2hlcic7XHJcbmltcG9ydCBsb2FkQWN0aW9uIGZyb20gJy4vbG9hZC1hY3Rpb24nO1xyXG5jb25zdCBOQl9MSVNUX0VMRU1FTlQgPSA1MDtcclxuXHJcbi8qKlxyXG4gKiBCdWlsZGVkIHNlYXJjaCBhY3Rpb24uXHJcbiAqIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHVzZWQgdG8gYnVpbGQgdGhlIHNlcnZpY2UsIGl0IHNob3VsZCBoYXZlIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlOlxyXG4gKiBgYGBqYXZhc2NyaXB0XHJcbiAqIHtcclxuICogICBpZGVudGlmaWVyOiBzdHJpbmc6IHNob3VsZCBiZSAnQURWQU5DRURfU0VBUkNIJyBvciAnUVVJQ0tfU0VBUkNIJ1xyXG4gKiBcdHNlcnZpY2U6e1xyXG4gKiBcdFx0c2NvcGVkOiBcImZ1bmN0aW9uIHdoaWNoIGxhdW5jaCB0aGUgc2NvcGUgc2VhcmNoXCJcclxuICogXHRcdHVuU2NvcGVkOiBcImZ1bmN0aW9uIHdob2NoIGxhdW5jaCB0aGUgdW5zY29wZWQgc2VhcmNoXCJcclxuICogXHR9XHJcbiAqIFx0Z2V0U2VhcmNoT3B0aW9ucyBhIGZ1bmN0aW9uIHdoaWNoIGdldCB0aGUgYXNzb2NpYXRlZCBzZWFyY2ggc3RvcmUgdmFsdWVcclxuICogXHRuYkVsZW1lbnQ6IG51bWJlciBvZiBlbGVtZW50cyB0byByZXF1ZXN0IG9uIGVhY2ggc2VhcmNoLlxyXG4gKiB9XHJcbiAqIGBgYFxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSBUaGUgYnVpbGRlZCBzZWFyY2ggYWN0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgaWYgKCFjb25maWcuaWRlbnRpZmllcikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignWW91ciBhY3Rpb24gc2hvdWxkIGhhdmUgYW4gaWRlbnRpZmllcicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjb25maWcuc2VydmljZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignWW91ciBhY3Rpb24gc2hvdWxkIGhhdmUgYSBzZXJ2aWNlJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWNvbmZpZy5nZXRMaXN0T3B0aW9ucykge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignWW91ciBhY3Rpb24gc2hvdWxkIGhhdmUgYSBzZWFyY2ggb3B0aW9ucyBnZXR0ZXIuJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWNvbmZpZy5uYkVsZW1lbnQpIHtcclxuICAgICAgICBjb25maWcubmJFbGVtZW50ID0gTkJfTElTVF9FTEVNRU5UO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCdWlsZCB0aGUgc2VhcmNoIGZvciB0aGUgaWRlbnRpZmllciBzY29wZS5cclxuICAgICAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIHNlYXJjaCBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGlkZW50aWZpZXIuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbG9hZDogbG9hZEFjdGlvbihjb25maWcpLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwZGF0ZSB0aGUgcXVlcnkgZm9yIHRoZSBpZGVudGlmaWVyIHNjb3BlLlxyXG4gICAgICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgLSBUaGUgcXVlcnkgdmFsdWVcclxuICAgICAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIHVwZGF0ZSBxdWVyeSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGlkZW50aWZpZXIuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdXBkYXRlUHJvcGVydGllcyh2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3VwZGF0ZScsXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBjb25maWcuaWRlbnRpZmllclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iXX0=