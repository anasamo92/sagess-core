'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.orderAndSort = exports.pagination = undefined;

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build sort infotmation.
 * @param  {object} sortConf - The sort configuration.
 * @return {object} - The builded sort configuration.
 */
function orderAndSort(sortConf) {
    return {
        sortFieldName: sortConf.sortBy,
        sortDesc: sortConf.sortAsc === undefined ? false : !sortConf.sortAsc
    };
}

/**
 * Build the pagination configuration given the options.
 * @param  {object} opts - The pagination options should be :
 *   isScroll (:bool) - Are we in a scroll context.
 *   totalCount (:number) - The total number of element. (intresting only in the scroll case)
 *   nbSearchElement (:number) - The number of elements you want to get back from the search.
 * @return {object} - An object with {top, skip}.
 */
function pagination(opts) {
    var isScroll = opts.isScroll,
        dataList = opts.dataList,
        totalCount = opts.totalCount,
        nbElement = opts.nbElement;

    if (isScroll) {
        if (!(0, _isArray2.default)(dataList)) {
            throw new Error('The data list options sould exist and be an array');
        }
        if (dataList.length < totalCount) {
            return { top: nbElement, skip: dataList.length };
        }
    }
    return {
        top: nbElement,
        skip: 0
    };
}

exports.pagination = pagination;
exports.orderAndSort = orderAndSort;
exports.default = {
    pagination: pagination,
    orderAndSort: orderAndSort
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJvcmRlckFuZFNvcnQiLCJzb3J0Q29uZiIsInNvcnRGaWVsZE5hbWUiLCJzb3J0QnkiLCJzb3J0RGVzYyIsInNvcnRBc2MiLCJ1bmRlZmluZWQiLCJwYWdpbmF0aW9uIiwib3B0cyIsImlzU2Nyb2xsIiwiZGF0YUxpc3QiLCJ0b3RhbENvdW50IiwibmJFbGVtZW50IiwiRXJyb3IiLCJsZW5ndGgiLCJ0b3AiLCJza2lwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUNBOzs7OztBQUtBLFNBQVNBLFlBQVQsQ0FBc0JDLFFBQXRCLEVBQWdDO0FBQzVCLFdBQU87QUFDSEMsdUJBQWVELFNBQVNFLE1BRHJCO0FBRUhDLGtCQUFVSCxTQUFTSSxPQUFULEtBQXFCQyxTQUFyQixHQUFpQyxLQUFqQyxHQUF5QyxDQUFDTCxTQUFTSTtBQUYxRCxLQUFQO0FBSUg7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU0UsVUFBVCxDQUFvQkMsSUFBcEIsRUFBMEI7QUFBQSxRQUNoQkMsUUFEZ0IsR0FDOEJELElBRDlCLENBQ2hCQyxRQURnQjtBQUFBLFFBQ05DLFFBRE0sR0FDOEJGLElBRDlCLENBQ05FLFFBRE07QUFBQSxRQUNJQyxVQURKLEdBQzhCSCxJQUQ5QixDQUNJRyxVQURKO0FBQUEsUUFDZ0JDLFNBRGhCLEdBQzhCSixJQUQ5QixDQUNnQkksU0FEaEI7O0FBRXRCLFFBQUlILFFBQUosRUFBYztBQUNWLFlBQUksQ0FBQyx1QkFBUUMsUUFBUixDQUFMLEVBQXdCO0FBQ3BCLGtCQUFNLElBQUlHLEtBQUosQ0FBVSxtREFBVixDQUFOO0FBQ0g7QUFDRCxZQUFJSCxTQUFTSSxNQUFULEdBQWtCSCxVQUF0QixFQUFrQztBQUM5QixtQkFBTyxFQUFFSSxLQUFLSCxTQUFQLEVBQWtCSSxNQUFNTixTQUFTSSxNQUFqQyxFQUFQO0FBQ0g7QUFDSjtBQUNELFdBQU87QUFDSEMsYUFBS0gsU0FERjtBQUVISSxjQUFNO0FBRkgsS0FBUDtBQUlIOztRQUdHVCxVLEdBQUFBLFU7UUFDQVAsWSxHQUFBQSxZO2tCQUVXO0FBQ1hPLDBCQURXO0FBRVhQO0FBRlcsQyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNBcnJheSBmcm9tICdsb2Rhc2gvbGFuZy9pc0FycmF5JztcclxuLyoqXHJcbiAqIEJ1aWxkIHNvcnQgaW5mb3RtYXRpb24uXHJcbiAqIEBwYXJhbSAge29iamVjdH0gc29ydENvbmYgLSBUaGUgc29ydCBjb25maWd1cmF0aW9uLlxyXG4gKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIGJ1aWxkZWQgc29ydCBjb25maWd1cmF0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gb3JkZXJBbmRTb3J0KHNvcnRDb25mKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNvcnRGaWVsZE5hbWU6IHNvcnRDb25mLnNvcnRCeSxcclxuICAgICAgICBzb3J0RGVzYzogc29ydENvbmYuc29ydEFzYyA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiAhc29ydENvbmYuc29ydEFzY1xyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEJ1aWxkIHRoZSBwYWdpbmF0aW9uIGNvbmZpZ3VyYXRpb24gZ2l2ZW4gdGhlIG9wdGlvbnMuXHJcbiAqIEBwYXJhbSAge29iamVjdH0gb3B0cyAtIFRoZSBwYWdpbmF0aW9uIG9wdGlvbnMgc2hvdWxkIGJlIDpcclxuICogICBpc1Njcm9sbCAoOmJvb2wpIC0gQXJlIHdlIGluIGEgc2Nyb2xsIGNvbnRleHQuXHJcbiAqICAgdG90YWxDb3VudCAoOm51bWJlcikgLSBUaGUgdG90YWwgbnVtYmVyIG9mIGVsZW1lbnQuIChpbnRyZXN0aW5nIG9ubHkgaW4gdGhlIHNjcm9sbCBjYXNlKVxyXG4gKiAgIG5iU2VhcmNoRWxlbWVudCAoOm51bWJlcikgLSBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHlvdSB3YW50IHRvIGdldCBiYWNrIGZyb20gdGhlIHNlYXJjaC5cclxuICogQHJldHVybiB7b2JqZWN0fSAtIEFuIG9iamVjdCB3aXRoIHt0b3AsIHNraXB9LlxyXG4gKi9cclxuZnVuY3Rpb24gcGFnaW5hdGlvbihvcHRzKSB7XHJcbiAgICBsZXQgeyBpc1Njcm9sbCwgZGF0YUxpc3QsIHRvdGFsQ291bnQsIG5iRWxlbWVudCB9ID0gb3B0cztcclxuICAgIGlmIChpc1Njcm9sbCkge1xyXG4gICAgICAgIGlmICghaXNBcnJheShkYXRhTGlzdCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBsaXN0IG9wdGlvbnMgc291bGQgZXhpc3QgYW5kIGJlIGFuIGFycmF5JylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGFMaXN0Lmxlbmd0aCA8IHRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdG9wOiBuYkVsZW1lbnQsIHNraXA6IGRhdGFMaXN0Lmxlbmd0aCB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9wOiBuYkVsZW1lbnQsXHJcbiAgICAgICAgc2tpcDogMFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgcGFnaW5hdGlvbixcclxuICAgIG9yZGVyQW5kU29ydFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwYWdpbmF0aW9uLFxyXG4gICAgb3JkZXJBbmRTb3J0XHJcbn07Il19