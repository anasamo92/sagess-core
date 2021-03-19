'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = confirm;

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function aims to have the same behaviour as JS confirm.
 * @param  {string | numver | component} ContentComponent - The component to display in the conform message.
 * @return {Promise}Confirm is a promise in order to be able to provide success and error callbacks.
 */
function confirm(ContentComponent, props) {
    return new Promise(function (resolve, reject) {
        _dispatcher2.default.handleViewAction({
            data: {
                confirmConfig: Object.assign({
                    isVisible: true,
                    Content: ContentComponent,
                    handleCancel: function handleCancel(err) {
                        _dispatcher2.default.handleViewAction({ data: { confirmConfig: { isVsible: false, Content: null } }, type: 'update' });
                        //Maybe there is a little async problem.
                        // We could listen to the store once on the change it is time to call resolve.
                        reject(err);
                    },
                    handleConfirm: function handleConfirm(data) {
                        _dispatcher2.default.handleViewAction({ data: { confirmConfig: { isVsible: false, Content: null } }, type: 'update' });
                        resolve(data);
                    }
                }, props)
            },
            type: 'update'
        });
    });
}

//Example call
///**
/// confirm('Is it good for you ?').then(() => action.save()).catch(() => displaySave())
/// confirm(MyAwesomeComponentWhichWillBeRenderAsCOntent).then(() => action.save()).catch(() => displaySave())
////

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJjb25maXJtIiwiQ29udGVudENvbXBvbmVudCIsInByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJkaXNwYXRjaGVyIiwiaGFuZGxlVmlld0FjdGlvbiIsImRhdGEiLCJjb25maXJtQ29uZmlnIiwiaXNWaXNpYmxlIiwiQ29udGVudCIsImhhbmRsZUNhbmNlbCIsImVyciIsImlzVnNpYmxlIiwidHlwZSIsImhhbmRsZUNvbmZpcm0iXSwibWFwcGluZ3MiOiI7Ozs7O2tCQU93QkEsTzs7QUFQeEI7Ozs7OztBQUVBOzs7OztBQUtlLFNBQVNBLE9BQVQsQ0FBaUJDLGdCQUFqQixFQUFtQ0MsS0FBbkMsRUFBMEM7QUFDckQsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDQyw2QkFBV0MsZ0JBQVgsQ0FBNEI7QUFDeEJDLGtCQUFNO0FBQ0ZDO0FBQ0lDLCtCQUFXLElBRGY7QUFFSUMsNkJBQVNWLGdCQUZiO0FBR0lXLGdDQUhKLHdCQUdpQkMsR0FIakIsRUFHc0I7QUFDZFAsNkNBQVdDLGdCQUFYLENBQTRCLEVBQUNDLE1BQU0sRUFBQ0MsZUFBZSxFQUFDSyxVQUFVLEtBQVgsRUFBa0JILFNBQVMsSUFBM0IsRUFBaEIsRUFBUCxFQUEwREksTUFBTSxRQUFoRSxFQUE1QjtBQUNBO0FBQ0E7QUFDQVYsK0JBQU9RLEdBQVA7QUFDSCxxQkFSTDtBQVNJRyxpQ0FUSix5QkFTa0JSLElBVGxCLEVBU3dCO0FBQ2hCRiw2Q0FBV0MsZ0JBQVgsQ0FBNEIsRUFBQ0MsTUFBTSxFQUFDQyxlQUFlLEVBQUNLLFVBQVUsS0FBWCxFQUFrQkgsU0FBUyxJQUEzQixFQUFoQixFQUFQLEVBQTBESSxNQUFNLFFBQWhFLEVBQTVCO0FBQ0FYLGdDQUFRSSxJQUFSO0FBQ0g7QUFaTCxtQkFhT04sS0FiUDtBQURFLGFBRGtCO0FBa0J4QmEsa0JBQU07QUFsQmtCLFNBQTVCO0FBb0JILEtBckJNLENBQVA7QUFzQkg7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIGFpbXMgdG8gaGF2ZSB0aGUgc2FtZSBiZWhhdmlvdXIgYXMgSlMgY29uZmlybS5cclxuICogQHBhcmFtICB7c3RyaW5nIHwgbnVtdmVyIHwgY29tcG9uZW50fSBDb250ZW50Q29tcG9uZW50IC0gVGhlIGNvbXBvbmVudCB0byBkaXNwbGF5IGluIHRoZSBjb25mb3JtIG1lc3NhZ2UuXHJcbiAqIEByZXR1cm4ge1Byb21pc2V9Q29uZmlybSBpcyBhIHByb21pc2UgaW4gb3JkZXIgdG8gYmUgYWJsZSB0byBwcm92aWRlIHN1Y2Nlc3MgYW5kIGVycm9yIGNhbGxiYWNrcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpcm0oQ29udGVudENvbXBvbmVudCwgcHJvcHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgY29uZmlybUNvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBDb250ZW50OiBDb250ZW50Q29tcG9uZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUNhbmNlbChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtkYXRhOiB7Y29uZmlybUNvbmZpZzoge2lzVnNpYmxlOiBmYWxzZSwgQ29udGVudDogbnVsbH19LCB0eXBlOiAndXBkYXRlJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL01heWJlIHRoZXJlIGlzIGEgbGl0dGxlIGFzeW5jIHByb2JsZW0uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGNvdWxkIGxpc3RlbiB0byB0aGUgc3RvcmUgb25jZSBvbiB0aGUgY2hhbmdlIGl0IGlzIHRpbWUgdG8gY2FsbCByZXNvbHZlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUNvbmZpcm0oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe2RhdGE6IHtjb25maXJtQ29uZmlnOiB7aXNWc2libGU6IGZhbHNlLCBDb250ZW50OiBudWxsfX0sIHR5cGU6ICd1cGRhdGUnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5wcm9wc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiAndXBkYXRlJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vL0V4YW1wbGUgY2FsbFxyXG4vLy8qKlxyXG4vLy8gY29uZmlybSgnSXMgaXQgZ29vZCBmb3IgeW91ID8nKS50aGVuKCgpID0+IGFjdGlvbi5zYXZlKCkpLmNhdGNoKCgpID0+IGRpc3BsYXlTYXZlKCkpXHJcbi8vLyBjb25maXJtKE15QXdlc29tZUNvbXBvbmVudFdoaWNoV2lsbEJlUmVuZGVyQXNDT250ZW50KS50aGVuKCgpID0+IGFjdGlvbi5zYXZlKCkpLmNhdGNoKCgpID0+IGRpc3BsYXlTYXZlKCkpXHJcbi8vLy9cclxuIl19