'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scopedResponse = exports.unscopedResponse = undefined;

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
* Parse server search result to build facet results.
* @param  {array[object]} facets server side facets results
* @return {object} object with facets as properties
*
* expected facet format :
* ------------------------
* "facets": [
*     {
*        "FCT_MOVIE_TYPE": [
*        	  {"Long-métrage": 10493},
*            {"Télefilm": 1368},
*            {"Court-métrage": 779},
*            {"Moyen-métrage": 98},
*            {"Sérials": 2},
*            {"Film à sketches": 1}
*        ]
*     },
*     {
*       "FCT_MOVIE_TITLE": [
*            {"#": 132},
*            {"a-f": 3205},
*            {"g-m": 5147},
*            {"n-s": 2133},
*            {"t-z": 2124}
*       ]
*     }
* ]
*
*
* Returned format :
* -----------------
* {
* 	  FCT_MOVIE_TYPE: [
* 	  	{
* 	  		label: 'Long-métrage',
*      		count: 52
* 	     }, {
*        	label: 'court-métrage',
* 	  	    count: 12
* 	     }
*    ],
*    FCT_MOVIE_YEAR: [
*    	 {
*    	 	label: '1990-2000',
*    	 	count: 8
*    	 }
*    ]
* }
*
*/
var _parseFacets = function _parseFacets(serverFacets) {
    return (0, _keys2.default)(serverFacets).reduce(function (formattedFacets, serverFacetKey) {
        //read facet keys
        var serverFacet = serverFacets[serverFacetKey];
        var serverFacetPopertyNames = (0, _keys2.default)(serverFacet);
        var facetName = serverFacetPopertyNames[0];
        var serverFacetData = serverFacet[facetName];
        formattedFacets[facetName] = (0, _keys2.default)(serverFacetData).reduce(function (facetData, serverFacetItemKey) {
            //read facet values
            var serverFacetItem = serverFacetData[serverFacetItemKey];
            var serverFacetItemPopertyNames = (0, _keys2.default)(serverFacetItem);
            var facetItemName = serverFacetItemPopertyNames[0];
            var facetItemValue = serverFacetItem[facetItemName];
            // The facet content is now an array instead of an object to preserve sorting.
            facetData.push({
                label: facetItemName,
                count: facetItemValue
            });
            return facetData;
        }, []);
        return formattedFacets;
    }, {});
};

var _parseUnscopedResponse = function _parseUnscopedResponse(data) {
    return {
        results: data.groups,
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    };
};

var _parseScopedResponse = function _parseScopedResponse(data, context) {
    //Scroll can only happen when there is an ungroupSearch
    if (context.isScroll) {
        var resultsKeys = (0, _keys2.default)(context.results);
        var key = resultsKeys[0];
        //Concat previous data with incoming data.
        data.list = [].concat(_toConsumableArray(context.results[key]), _toConsumableArray(data.list));
    }
    return {
        results: data.groups || _defineProperty({}, context.scope, data.list),
        facets: _parseFacets(data.facets),
        totalCount: data.totalCount
    };
};

exports.default = {
    unscopedResponse: _parseUnscopedResponse,
    scopedResponse: _parseScopedResponse
};
exports.unscopedResponse = _parseUnscopedResponse;
exports.scopedResponse = _parseScopedResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJfcGFyc2VGYWNldHMiLCJzZXJ2ZXJGYWNldHMiLCJyZWR1Y2UiLCJmb3JtYXR0ZWRGYWNldHMiLCJzZXJ2ZXJGYWNldEtleSIsInNlcnZlckZhY2V0Iiwic2VydmVyRmFjZXRQb3BlcnR5TmFtZXMiLCJmYWNldE5hbWUiLCJzZXJ2ZXJGYWNldERhdGEiLCJmYWNldERhdGEiLCJzZXJ2ZXJGYWNldEl0ZW1LZXkiLCJzZXJ2ZXJGYWNldEl0ZW0iLCJzZXJ2ZXJGYWNldEl0ZW1Qb3BlcnR5TmFtZXMiLCJmYWNldEl0ZW1OYW1lIiwiZmFjZXRJdGVtVmFsdWUiLCJwdXNoIiwibGFiZWwiLCJjb3VudCIsIl9wYXJzZVVuc2NvcGVkUmVzcG9uc2UiLCJkYXRhIiwicmVzdWx0cyIsImdyb3VwcyIsImZhY2V0cyIsInRvdGFsQ291bnQiLCJfcGFyc2VTY29wZWRSZXNwb25zZSIsImNvbnRleHQiLCJpc1Njcm9sbCIsInJlc3VsdHNLZXlzIiwia2V5IiwibGlzdCIsInNjb3BlIiwidW5zY29wZWRSZXNwb25zZSIsInNjb3BlZFJlc3BvbnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbURBLElBQU1BLGVBQWUsU0FBZkEsWUFBZSxDQUFDQyxZQUFELEVBQWtCO0FBQ25DLFdBQU8sb0JBQUtBLFlBQUwsRUFBbUJDLE1BQW5CLENBQTBCLFVBQUNDLGVBQUQsRUFBa0JDLGNBQWxCLEVBQXFDO0FBQ2xFO0FBQ0EsWUFBTUMsY0FBY0osYUFBYUcsY0FBYixDQUFwQjtBQUNBLFlBQU1FLDBCQUEwQixvQkFBS0QsV0FBTCxDQUFoQztBQUNBLFlBQU1FLFlBQVlELHdCQUF3QixDQUF4QixDQUFsQjtBQUNBLFlBQU1FLGtCQUFrQkgsWUFBWUUsU0FBWixDQUF4QjtBQUNBSix3QkFBZ0JJLFNBQWhCLElBQTZCLG9CQUFLQyxlQUFMLEVBQXNCTixNQUF0QixDQUE2QixVQUFDTyxTQUFELEVBQVlDLGtCQUFaLEVBQW1DO0FBQ3pGO0FBQ0EsZ0JBQU1DLGtCQUFrQkgsZ0JBQWdCRSxrQkFBaEIsQ0FBeEI7QUFDQSxnQkFBTUUsOEJBQThCLG9CQUFLRCxlQUFMLENBQXBDO0FBQ0EsZ0JBQU1FLGdCQUFnQkQsNEJBQTRCLENBQTVCLENBQXRCO0FBQ0EsZ0JBQU1FLGlCQUFpQkgsZ0JBQWdCRSxhQUFoQixDQUF2QjtBQUNBO0FBQ0FKLHNCQUFVTSxJQUFWLENBQWU7QUFDWEMsdUJBQU9ILGFBREk7QUFFWEksdUJBQU9IO0FBRkksYUFBZjtBQUlBLG1CQUFPTCxTQUFQO0FBQ0gsU0FaNEIsRUFZMUIsRUFaMEIsQ0FBN0I7QUFhQSxlQUFPTixlQUFQO0FBQ0gsS0FwQk0sRUFvQkosRUFwQkksQ0FBUDtBQXFCSCxDQXRCRDs7QUF5QkEsSUFBTWUseUJBQXlCLFNBQXpCQSxzQkFBeUIsQ0FBQ0MsSUFBRCxFQUFVO0FBQ3JDLFdBQVE7QUFDSkMsaUJBQVNELEtBQUtFLE1BRFY7QUFFSkMsZ0JBQVF0QixhQUFhbUIsS0FBS0csTUFBbEIsQ0FGSjtBQUdKQyxvQkFBWUosS0FBS0k7QUFIYixLQUFSO0FBS0gsQ0FORDs7QUFTQSxJQUFNQyx1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFDTCxJQUFELEVBQU9NLE9BQVAsRUFBbUI7QUFDNUM7QUFDQSxRQUFJQSxRQUFRQyxRQUFaLEVBQXNCO0FBQ2xCLFlBQUlDLGNBQWMsb0JBQUtGLFFBQVFMLE9BQWIsQ0FBbEI7QUFDQSxZQUFJUSxNQUFNRCxZQUFZLENBQVosQ0FBVjtBQUNBO0FBQ0FSLGFBQUtVLElBQUwsZ0NBQWdCSixRQUFRTCxPQUFSLENBQWdCUSxHQUFoQixDQUFoQixzQkFBeUNULEtBQUtVLElBQTlDO0FBQ0g7QUFDRCxXQUFRO0FBQ0pULGlCQUFTRCxLQUFLRSxNQUFMLHdCQUFrQkksUUFBUUssS0FBMUIsRUFBa0NYLEtBQUtVLElBQXZDLENBREw7QUFFSlAsZ0JBQVF0QixhQUFhbUIsS0FBS0csTUFBbEIsQ0FGSjtBQUdKQyxvQkFBWUosS0FBS0k7QUFIYixLQUFSO0FBS0gsQ0FiRDs7a0JBZWU7QUFDWFEsc0JBQWtCYixzQkFEUDtBQUVYYyxvQkFBZ0JSO0FBRkwsQztRQU1lTyxnQixHQUExQmIsc0I7UUFDd0JjLGMsR0FBeEJSLG9CIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrZXlzIGZyb20gJ2xvZGFzaC9vYmplY3Qva2V5cyc7XHJcblxyXG4vKipcclxuKiBQYXJzZSBzZXJ2ZXIgc2VhcmNoIHJlc3VsdCB0byBidWlsZCBmYWNldCByZXN1bHRzLlxyXG4qIEBwYXJhbSAge2FycmF5W29iamVjdF19IGZhY2V0cyBzZXJ2ZXIgc2lkZSBmYWNldHMgcmVzdWx0c1xyXG4qIEByZXR1cm4ge29iamVjdH0gb2JqZWN0IHdpdGggZmFjZXRzIGFzIHByb3BlcnRpZXNcclxuKlxyXG4qIGV4cGVjdGVkIGZhY2V0IGZvcm1hdCA6XHJcbiogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiogXCJmYWNldHNcIjogW1xyXG4qICAgICB7XHJcbiogICAgICAgIFwiRkNUX01PVklFX1RZUEVcIjogW1xyXG4qICAgICAgICBcdCAge1wiTG9uZy1tw6l0cmFnZVwiOiAxMDQ5M30sXHJcbiogICAgICAgICAgICB7XCJUw6lsZWZpbG1cIjogMTM2OH0sXHJcbiogICAgICAgICAgICB7XCJDb3VydC1tw6l0cmFnZVwiOiA3Nzl9LFxyXG4qICAgICAgICAgICAge1wiTW95ZW4tbcOpdHJhZ2VcIjogOTh9LFxyXG4qICAgICAgICAgICAge1wiU8OpcmlhbHNcIjogMn0sXHJcbiogICAgICAgICAgICB7XCJGaWxtIMOgIHNrZXRjaGVzXCI6IDF9XHJcbiogICAgICAgIF1cclxuKiAgICAgfSxcclxuKiAgICAge1xyXG4qICAgICAgIFwiRkNUX01PVklFX1RJVExFXCI6IFtcclxuKiAgICAgICAgICAgIHtcIiNcIjogMTMyfSxcclxuKiAgICAgICAgICAgIHtcImEtZlwiOiAzMjA1fSxcclxuKiAgICAgICAgICAgIHtcImctbVwiOiA1MTQ3fSxcclxuKiAgICAgICAgICAgIHtcIm4tc1wiOiAyMTMzfSxcclxuKiAgICAgICAgICAgIHtcInQtelwiOiAyMTI0fVxyXG4qICAgICAgIF1cclxuKiAgICAgfVxyXG4qIF1cclxuKlxyXG4qXHJcbiogUmV0dXJuZWQgZm9ybWF0IDpcclxuKiAtLS0tLS0tLS0tLS0tLS0tLVxyXG4qIHtcclxuKiBcdCAgRkNUX01PVklFX1RZUEU6IFtcclxuKiBcdCAgXHR7XHJcbiogXHQgIFx0XHRsYWJlbDogJ0xvbmctbcOpdHJhZ2UnLFxyXG4qICAgICAgXHRcdGNvdW50OiA1MlxyXG4qIFx0ICAgICB9LCB7XHJcbiogICAgICAgIFx0bGFiZWw6ICdjb3VydC1tw6l0cmFnZScsXHJcbiogXHQgIFx0ICAgIGNvdW50OiAxMlxyXG4qIFx0ICAgICB9XHJcbiogICAgXSxcclxuKiAgICBGQ1RfTU9WSUVfWUVBUjogW1xyXG4qICAgIFx0IHtcclxuKiAgICBcdCBcdGxhYmVsOiAnMTk5MC0yMDAwJyxcclxuKiAgICBcdCBcdGNvdW50OiA4XHJcbiogICAgXHQgfVxyXG4qICAgIF1cclxuKiB9XHJcbipcclxuKi9cclxuY29uc3QgX3BhcnNlRmFjZXRzID0gKHNlcnZlckZhY2V0cykgPT4ge1xyXG4gICAgcmV0dXJuIGtleXMoc2VydmVyRmFjZXRzKS5yZWR1Y2UoKGZvcm1hdHRlZEZhY2V0cywgc2VydmVyRmFjZXRLZXkpID0+IHtcclxuICAgICAgICAvL3JlYWQgZmFjZXQga2V5c1xyXG4gICAgICAgIGNvbnN0IHNlcnZlckZhY2V0ID0gc2VydmVyRmFjZXRzW3NlcnZlckZhY2V0S2V5XTtcclxuICAgICAgICBjb25zdCBzZXJ2ZXJGYWNldFBvcGVydHlOYW1lcyA9IGtleXMoc2VydmVyRmFjZXQpO1xyXG4gICAgICAgIGNvbnN0IGZhY2V0TmFtZSA9IHNlcnZlckZhY2V0UG9wZXJ0eU5hbWVzWzBdO1xyXG4gICAgICAgIGNvbnN0IHNlcnZlckZhY2V0RGF0YSA9IHNlcnZlckZhY2V0W2ZhY2V0TmFtZV07XHJcbiAgICAgICAgZm9ybWF0dGVkRmFjZXRzW2ZhY2V0TmFtZV0gPSBrZXlzKHNlcnZlckZhY2V0RGF0YSkucmVkdWNlKChmYWNldERhdGEsIHNlcnZlckZhY2V0SXRlbUtleSkgPT4ge1xyXG4gICAgICAgICAgICAvL3JlYWQgZmFjZXQgdmFsdWVzXHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlckZhY2V0SXRlbSA9IHNlcnZlckZhY2V0RGF0YVtzZXJ2ZXJGYWNldEl0ZW1LZXldO1xyXG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXJGYWNldEl0ZW1Qb3BlcnR5TmFtZXMgPSBrZXlzKHNlcnZlckZhY2V0SXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY2V0SXRlbU5hbWUgPSBzZXJ2ZXJGYWNldEl0ZW1Qb3BlcnR5TmFtZXNbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY2V0SXRlbVZhbHVlID0gc2VydmVyRmFjZXRJdGVtW2ZhY2V0SXRlbU5hbWVdO1xyXG4gICAgICAgICAgICAvLyBUaGUgZmFjZXQgY29udGVudCBpcyBub3cgYW4gYXJyYXkgaW5zdGVhZCBvZiBhbiBvYmplY3QgdG8gcHJlc2VydmUgc29ydGluZy5cclxuICAgICAgICAgICAgZmFjZXREYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6IGZhY2V0SXRlbU5hbWUsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogZmFjZXRJdGVtVmFsdWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWNldERhdGE7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRGYWNldHM7XHJcbiAgICB9LCB7fSk7XHJcbn07XHJcblxyXG5cclxuY29uc3QgX3BhcnNlVW5zY29wZWRSZXNwb25zZSA9IChkYXRhKSA9PiB7XHJcbiAgICByZXR1cm4gKHtcclxuICAgICAgICByZXN1bHRzOiBkYXRhLmdyb3VwcyxcclxuICAgICAgICBmYWNldHM6IF9wYXJzZUZhY2V0cyhkYXRhLmZhY2V0cyksXHJcbiAgICAgICAgdG90YWxDb3VudDogZGF0YS50b3RhbENvdW50XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5jb25zdCBfcGFyc2VTY29wZWRSZXNwb25zZSA9IChkYXRhLCBjb250ZXh0KSA9PiB7XHJcbiAgICAvL1Njcm9sbCBjYW4gb25seSBoYXBwZW4gd2hlbiB0aGVyZSBpcyBhbiB1bmdyb3VwU2VhcmNoXHJcbiAgICBpZiAoY29udGV4dC5pc1Njcm9sbCkge1xyXG4gICAgICAgIGxldCByZXN1bHRzS2V5cyA9IGtleXMoY29udGV4dC5yZXN1bHRzKTtcclxuICAgICAgICBsZXQga2V5ID0gcmVzdWx0c0tleXNbMF07XHJcbiAgICAgICAgLy9Db25jYXQgcHJldmlvdXMgZGF0YSB3aXRoIGluY29taW5nIGRhdGEuXHJcbiAgICAgICAgZGF0YS5saXN0ID0gWy4uLmNvbnRleHQucmVzdWx0c1trZXldLCAuLi5kYXRhLmxpc3RdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICh7XHJcbiAgICAgICAgcmVzdWx0czogZGF0YS5ncm91cHMgfHwgeyBbY29udGV4dC5zY29wZV06IGRhdGEubGlzdCB9LFxyXG4gICAgICAgIGZhY2V0czogX3BhcnNlRmFjZXRzKGRhdGEuZmFjZXRzKSxcclxuICAgICAgICB0b3RhbENvdW50OiBkYXRhLnRvdGFsQ291bnRcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgdW5zY29wZWRSZXNwb25zZTogX3BhcnNlVW5zY29wZWRSZXNwb25zZSxcclxuICAgIHNjb3BlZFJlc3BvbnNlOiBfcGFyc2VTY29wZWRSZXNwb25zZVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICAgIF9wYXJzZVVuc2NvcGVkUmVzcG9uc2UgYXMgdW5zY29wZWRSZXNwb25zZSxcclxuICAgIF9wYXJzZVNjb3BlZFJlc3BvbnNlIGFzIHNjb3BlZFJlc3BvbnNlXHJcbn07Il19