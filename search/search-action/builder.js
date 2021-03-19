'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.facets = exports.orderAndSort = exports.pagination = undefined;

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _mapValues = require('lodash/object/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build facets for server expected format.
 *
 * Expected format :
 * -----------------
 * {
 * 	  "criteria": "*",
 *   "facets": {FCT_MOVIE_TYPE: "Télefilm", FCT_MOVIE_TITLE: "g-m"}
 * }
 *
 *
 * @param  {[type]} facets [description]
 * @return {[type]}        [description]
 */
var _buildFacets = function _buildFacets(facets) {
    return (0, _mapValues2.default)(facets, function (facetData) {
        return facetData.key;
    });
};

/**
 * Build sort infotmation.
 * @param  {object} sortConf - The sort configuration.
 * @return {object} - The builded sort configuration.
 */
var _buildOrderAndSort = function _buildOrderAndSort(sortConf) {
    return {
        sortFieldName: sortConf.sortBy,
        sortDesc: sortConf.sortAsc === undefined ? false : !sortConf.sortAsc
    };
};

var _buildPagination = function _buildPagination(opts) {
    var resultsKeys = (0, _keys2.default)(opts.results);
    if (opts.isScroll && resultsKeys.length === 1) {
        var key = resultsKeys[0];
        var previousRes = opts.results[key];
        if (previousRes.length < opts.totalCount) {
            return {
                top: opts.nbSearchElement,
                skip: previousRes.length
            };
        } else {
            //Else should not be called.
            console.warn('This should not happen.');
        }
    } else {
        return {
            skip: 0,
            top: opts.nbSearchElement || 0
        };
    }
};

exports.pagination = _buildPagination;
exports.orderAndSort = _buildOrderAndSort;
exports.facets = _buildFacets;
exports.default = {
    pagination: _buildPagination,
    orderAndSort: _buildOrderAndSort,
    facets: _buildFacets
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJfYnVpbGRGYWNldHMiLCJmYWNldHMiLCJmYWNldERhdGEiLCJrZXkiLCJfYnVpbGRPcmRlckFuZFNvcnQiLCJzb3J0RmllbGROYW1lIiwic29ydENvbmYiLCJzb3J0QnkiLCJzb3J0RGVzYyIsInNvcnRBc2MiLCJ1bmRlZmluZWQiLCJfYnVpbGRQYWdpbmF0aW9uIiwicmVzdWx0c0tleXMiLCJvcHRzIiwicmVzdWx0cyIsImlzU2Nyb2xsIiwibGVuZ3RoIiwicHJldmlvdXNSZXMiLCJ0b3RhbENvdW50IiwidG9wIiwibmJTZWFyY2hFbGVtZW50Iiwic2tpcCIsImNvbnNvbGUiLCJ3YXJuIiwicGFnaW5hdGlvbiIsIm9yZGVyQW5kU29ydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQWNBLElBQU1BLGVBQWUsU0FBZkEsWUFBZSxTQUFVO0FBQzNCLFdBQU8seUJBQVVDLE1BQVYsRUFBa0IscUJBQWE7QUFDbEMsZUFBT0MsVUFBVUMsR0FBakI7QUFDSCxLQUZNLENBQVA7QUFHSCxDQUpEOztBQU1BOzs7OztBQUtBLElBQU1DLHFCQUFxQixTQUFyQkEsa0JBQXFCLFdBQVk7QUFDbkMsV0FBTztBQUNIQyx1QkFBZUMsU0FBU0MsTUFEckI7QUFFSEMsa0JBQVVGLFNBQVNHLE9BQVQsS0FBcUJDLFNBQXJCLEdBQWlDLEtBQWpDLEdBQXlDLENBQUNKLFNBQVNHO0FBRjFELEtBQVA7QUFJSCxDQUxEOztBQVFBLElBQU1FLG1CQUFtQixTQUFuQkEsZ0JBQW1CLE9BQVE7QUFDN0IsUUFBTUMsY0FBYyxvQkFBS0MsS0FBS0MsT0FBVixDQUFwQjtBQUNBLFFBQUlELEtBQUtFLFFBQUwsSUFBaUJILFlBQVlJLE1BQVosS0FBdUIsQ0FBNUMsRUFBK0M7QUFDM0MsWUFBTWIsTUFBTVMsWUFBWSxDQUFaLENBQVo7QUFDQSxZQUFNSyxjQUFjSixLQUFLQyxPQUFMLENBQWFYLEdBQWIsQ0FBcEI7QUFDQSxZQUFJYyxZQUFZRCxNQUFaLEdBQXFCSCxLQUFLSyxVQUE5QixFQUEwQztBQUN0QyxtQkFBTztBQUNIQyxxQkFBS04sS0FBS08sZUFEUDtBQUVIQyxzQkFBTUosWUFBWUQ7QUFGZixhQUFQO0FBSUgsU0FMRCxNQUtPO0FBQ0g7QUFDQU0sb0JBQVFDLElBQVIsQ0FBYSx5QkFBYjtBQUNIO0FBQ0osS0FaRCxNQVlPO0FBQ0gsZUFBTztBQUNIRixrQkFBTSxDQURIO0FBRUhGLGlCQUFLTixLQUFLTyxlQUFMLElBQXdCO0FBRjFCLFNBQVA7QUFJSDtBQUNKLENBcEJEOztRQXVCd0JJLFUsR0FBcEJiLGdCO1FBQ3NCYyxZLEdBQXRCckIsa0I7UUFDZ0JILE0sR0FBaEJELFk7a0JBR1c7QUFDWHdCLGdCQUFZYixnQkFERDtBQUVYYyxrQkFBY3JCLGtCQUZIO0FBR1hILFlBQVFEO0FBSEcsQyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga2V5cyBmcm9tICdsb2Rhc2gvb2JqZWN0L2tleXMnO1xyXG5pbXBvcnQgbWFwVmFsdWVzIGZyb20gJ2xvZGFzaC9vYmplY3QvbWFwVmFsdWVzJztcclxuXHJcbi8qKlxyXG4gKiBCdWlsZCBmYWNldHMgZm9yIHNlcnZlciBleHBlY3RlZCBmb3JtYXQuXHJcbiAqXHJcbiAqIEV4cGVjdGVkIGZvcm1hdCA6XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIHtcclxuICogXHQgIFwiY3JpdGVyaWFcIjogXCIqXCIsXHJcbiAqICAgXCJmYWNldHNcIjoge0ZDVF9NT1ZJRV9UWVBFOiBcIlTDqWxlZmlsbVwiLCBGQ1RfTU9WSUVfVElUTEU6IFwiZy1tXCJ9XHJcbiAqIH1cclxuICpcclxuICpcclxuICogQHBhcmFtICB7W3R5cGVdfSBmYWNldHMgW2Rlc2NyaXB0aW9uXVxyXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAqL1xyXG5jb25zdCBfYnVpbGRGYWNldHMgPSBmYWNldHMgPT4ge1xyXG4gICAgcmV0dXJuIG1hcFZhbHVlcyhmYWNldHMsIGZhY2V0RGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZhY2V0RGF0YS5rZXk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBCdWlsZCBzb3J0IGluZm90bWF0aW9uLlxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IHNvcnRDb25mIC0gVGhlIHNvcnQgY29uZmlndXJhdGlvbi5cclxuICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBidWlsZGVkIHNvcnQgY29uZmlndXJhdGlvbi5cclxuICovXHJcbmNvbnN0IF9idWlsZE9yZGVyQW5kU29ydCA9IHNvcnRDb25mID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc29ydEZpZWxkTmFtZTogc29ydENvbmYuc29ydEJ5LFxyXG4gICAgICAgIHNvcnREZXNjOiBzb3J0Q29uZi5zb3J0QXNjID09PSB1bmRlZmluZWQgPyBmYWxzZSA6ICFzb3J0Q29uZi5zb3J0QXNjXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuY29uc3QgX2J1aWxkUGFnaW5hdGlvbiA9IG9wdHMgPT4ge1xyXG4gICAgY29uc3QgcmVzdWx0c0tleXMgPSBrZXlzKG9wdHMucmVzdWx0cyk7XHJcbiAgICBpZiAob3B0cy5pc1Njcm9sbCAmJiByZXN1bHRzS2V5cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSByZXN1bHRzS2V5c1swXTtcclxuICAgICAgICBjb25zdCBwcmV2aW91c1JlcyA9IG9wdHMucmVzdWx0c1trZXldO1xyXG4gICAgICAgIGlmIChwcmV2aW91c1Jlcy5sZW5ndGggPCBvcHRzLnRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvcDogb3B0cy5uYlNlYXJjaEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICBza2lwOiBwcmV2aW91c1Jlcy5sZW5ndGhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL0Vsc2Ugc2hvdWxkIG5vdCBiZSBjYWxsZWQuXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVGhpcyBzaG91bGQgbm90IGhhcHBlbi4nKVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2tpcDogMCxcclxuICAgICAgICAgICAgdG9wOiBvcHRzLm5iU2VhcmNoRWxlbWVudCB8fCAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICAgIF9idWlsZFBhZ2luYXRpb24gYXMgcGFnaW5hdGlvbixcclxuICAgIF9idWlsZE9yZGVyQW5kU29ydCBhcyBvcmRlckFuZFNvcnQsXHJcbiAgICBfYnVpbGRGYWNldHMgYXMgZmFjZXRzXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwYWdpbmF0aW9uOiBfYnVpbGRQYWdpbmF0aW9uLFxyXG4gICAgb3JkZXJBbmRTb3J0OiBfYnVpbGRPcmRlckFuZFNvcnQsXHJcbiAgICBmYWNldHM6IF9idWlsZEZhY2V0c1xyXG59OyJdfQ==