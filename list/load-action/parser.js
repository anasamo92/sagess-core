'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//Requirements

exports.default = function (data, context) {
    var dataList = data.dataList,
        totalCount = data.totalCount,
        otherProps = _objectWithoutProperties(data, ['dataList', 'totalCount']);

    if (context.isScroll) {
        dataList = [].concat(_toConsumableArray(context.dataList), _toConsumableArray(data.dataList));
    }
    if (dataList.length === 0 && totalCount > 0) {
        throw new Error('totalCount must be equal to zero when no data are returned!!');
    }
    return Object.assign({
        dataList: dataList,
        totalCount: totalCount
    }, otherProps);
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJkYXRhIiwiY29udGV4dCIsImRhdGFMaXN0IiwidG90YWxDb3VudCIsIm90aGVyUHJvcHMiLCJpc1Njcm9sbCIsImxlbmd0aCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O2tCQUVlLFVBQUNBLElBQUQsRUFBT0MsT0FBUCxFQUFtQjtBQUFBLFFBQ3hCQyxRQUR3QixHQUNnQkYsSUFEaEIsQ0FDeEJFLFFBRHdCO0FBQUEsUUFDZEMsVUFEYyxHQUNnQkgsSUFEaEIsQ0FDZEcsVUFEYztBQUFBLFFBQ0NDLFVBREQsNEJBQ2dCSixJQURoQjs7QUFFOUIsUUFBSUMsUUFBUUksUUFBWixFQUFzQjtBQUNsQkgsZ0RBQWVELFFBQVFDLFFBQXZCLHNCQUFvQ0YsS0FBS0UsUUFBekM7QUFDSDtBQUNELFFBQUtBLFNBQVNJLE1BQVQsS0FBb0IsQ0FBckIsSUFBNEJILGFBQWEsQ0FBN0MsRUFBaUQ7QUFDN0MsY0FBTSxJQUFJSSxLQUFKLENBQVUsOERBQVYsQ0FBTjtBQUNIO0FBQ0Q7QUFDSUwsa0JBQVVBLFFBRGQ7QUFFSUMsb0JBQVlBO0FBRmhCLE9BR09DLFVBSFA7QUFLSCxDIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vUmVxdWlyZW1lbnRzXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoZGF0YSwgY29udGV4dCkgPT4ge1xyXG4gICAgbGV0IHsgZGF0YUxpc3QsIHRvdGFsQ291bnQsIC4uLm90aGVyUHJvcHMgfSA9IGRhdGE7XHJcbiAgICBpZiAoY29udGV4dC5pc1Njcm9sbCkge1xyXG4gICAgICAgIGRhdGFMaXN0ID0gWy4uLmNvbnRleHQuZGF0YUxpc3QsIC4uLmRhdGEuZGF0YUxpc3RdO1xyXG4gICAgfVxyXG4gICAgaWYgKChkYXRhTGlzdC5sZW5ndGggPT09IDApICYmICh0b3RhbENvdW50ID4gMCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvdGFsQ291bnQgbXVzdCBiZSBlcXVhbCB0byB6ZXJvIHdoZW4gbm8gZGF0YSBhcmUgcmV0dXJuZWQhIScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICh7XHJcbiAgICAgICAgZGF0YUxpc3Q6IGRhdGFMaXN0LFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IHRvdGFsQ291bnQsXHJcbiAgICAgICAgLi4ub3RoZXJQcm9wc1xyXG4gICAgfSk7XHJcbn07XHJcbiJdfQ==