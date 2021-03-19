'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _builder = require('./builder');

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Focus reference action.
 * @param {array} referenceNames - An array which contains the name of all the references to load.
 * @returns {Promise} - The promise of loading all the references.
 */
function builtInReferenceAction(referenceNames) {
    var skipCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return function () {
        if (!referenceNames) {
            return undefined;
        }
        return Promise.all((0, _builder.loadMany)(referenceNames, skipCache)).then(function successReferenceLoading(data) {
            //Rebuilt a constructed information from the map.
            var reconstructedData = data.reduce(function (acc, item) {
                acc[item.name] = item.dataList;return acc;
            }, {});
            _dispatcher2.default.handleViewAction({ data: reconstructedData, type: 'update', subject: 'reference' });
        }, function errorReferenceLoading(err) {
            _dispatcher2.default.handleViewAction({ data: err, type: 'error' });
        });
    };
}

exports.default = builtInReferenceAction;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJidWlsdEluUmVmZXJlbmNlQWN0aW9uIiwicmVmZXJlbmNlTmFtZXMiLCJza2lwQ2FjaGUiLCJ1bmRlZmluZWQiLCJQcm9taXNlIiwiYWxsIiwidGhlbiIsInN1Y2Nlc3NSZWZlcmVuY2VMb2FkaW5nIiwiZGF0YSIsInJlY29uc3RydWN0ZWREYXRhIiwicmVkdWNlIiwiYWNjIiwiaXRlbSIsIm5hbWUiLCJkYXRhTGlzdCIsImRpc3BhdGNoZXIiLCJoYW5kbGVWaWV3QWN0aW9uIiwidHlwZSIsInN1YmplY3QiLCJlcnJvclJlZmVyZW5jZUxvYWRpbmciLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQTs7Ozs7QUFLQSxTQUFTQSxzQkFBVCxDQUFnQ0MsY0FBaEMsRUFBbUU7QUFBQSxRQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFDL0QsV0FBTyxZQUFNO0FBQ1QsWUFBSSxDQUFDRCxjQUFMLEVBQXFCO0FBQ2pCLG1CQUFPRSxTQUFQO0FBQ0g7QUFDRCxlQUFPQyxRQUFRQyxHQUFSLENBQVksdUJBQXNCSixjQUF0QixFQUFzQ0MsU0FBdEMsQ0FBWixFQUNGSSxJQURFLENBQ0csU0FBU0MsdUJBQVQsQ0FBaUNDLElBQWpDLEVBQXVDO0FBQ3pDO0FBQ0EsZ0JBQU1DLG9CQUFvQkQsS0FBS0UsTUFBTCxDQUFZLFVBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQUVELG9CQUFJQyxLQUFLQyxJQUFULElBQWlCRCxLQUFLRSxRQUF0QixDQUFnQyxPQUFPSCxHQUFQO0FBQWEsYUFBMUUsRUFBNEUsRUFBNUUsQ0FBMUI7QUFDQUksaUNBQVdDLGdCQUFYLENBQTRCLEVBQUVSLE1BQU1DLGlCQUFSLEVBQTJCUSxNQUFNLFFBQWpDLEVBQTJDQyxTQUFTLFdBQXBELEVBQTVCO0FBQ0gsU0FMRSxFQUtBLFNBQVNDLHFCQUFULENBQStCQyxHQUEvQixFQUFvQztBQUNuQ0wsaUNBQVdDLGdCQUFYLENBQTRCLEVBQUVSLE1BQU1ZLEdBQVIsRUFBYUgsTUFBTSxPQUFuQixFQUE1QjtBQUNILFNBUEUsQ0FBUDtBQVFILEtBWkQ7QUFhSDs7a0JBRWNqQixzQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2FkTWFueSBhcyBsb2FkTWFueVJlZmVyZW5jZUxpc3QgfSBmcm9tICcuL2J1aWxkZXInO1xyXG5pbXBvcnQgZGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyJztcclxuXHJcbi8qKlxyXG4gKiBGb2N1cyByZWZlcmVuY2UgYWN0aW9uLlxyXG4gKiBAcGFyYW0ge2FycmF5fSByZWZlcmVuY2VOYW1lcyAtIEFuIGFycmF5IHdoaWNoIGNvbnRhaW5zIHRoZSBuYW1lIG9mIGFsbCB0aGUgcmVmZXJlbmNlcyB0byBsb2FkLlxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBUaGUgcHJvbWlzZSBvZiBsb2FkaW5nIGFsbCB0aGUgcmVmZXJlbmNlcy5cclxuICovXHJcbmZ1bmN0aW9uIGJ1aWx0SW5SZWZlcmVuY2VBY3Rpb24ocmVmZXJlbmNlTmFtZXMsIHNraXBDYWNoZSA9IGZhbHNlKSB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGlmICghcmVmZXJlbmNlTmFtZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGxvYWRNYW55UmVmZXJlbmNlTGlzdChyZWZlcmVuY2VOYW1lcywgc2tpcENhY2hlKSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2Vzc1JlZmVyZW5jZUxvYWRpbmcoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy9SZWJ1aWx0IGEgY29uc3RydWN0ZWQgaW5mb3JtYXRpb24gZnJvbSB0aGUgbWFwLlxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVjb25zdHJ1Y3RlZERhdGEgPSBkYXRhLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiB7IGFjY1tpdGVtLm5hbWVdID0gaXRlbS5kYXRhTGlzdDsgcmV0dXJuIGFjYzsgfSwge30pXHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oeyBkYXRhOiByZWNvbnN0cnVjdGVkRGF0YSwgdHlwZTogJ3VwZGF0ZScsIHN1YmplY3Q6ICdyZWZlcmVuY2UnIH0pO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiBlcnJvclJlZmVyZW5jZUxvYWRpbmcoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oeyBkYXRhOiBlcnIsIHR5cGU6ICdlcnJvcicgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbHRJblJlZmVyZW5jZUFjdGlvbjtcclxuIl19