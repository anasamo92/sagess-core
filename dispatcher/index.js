'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dispatchData = dispatchData;

var _flux = require('flux');

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
* Application dispatcher.
* @type {Object}
*/
var AppDispatcher = Object.assign(new _flux.Dispatcher(), {
    /**
    * @param {object} action The details of the action, including the action's
    * type and additional data coming from the server.
    */
    handleServerAction: function handleServerAction(action) {
        var payload = {
            source: 'SERVER_ACTION',
            action: action
        };
        this.dispatch(payload);
    },

    /**
    * @param {object} action The details of the action, including the action's
    * type and additional data coming from the view.
    */
    handleViewAction: function handleViewAction(action) {
        var payload = {
            source: 'VIEW_ACTION',
            action: action
        };
        this.dispatch(payload);
    }
});

/**
 * Dispatch update data.
 */
function dispatchData() {
    var firstArgIsObject = (0, _isObject2.default)(arguments[0]);

    if (firstArgIsObject) {
        // then form is : dispatchData({ node: data }, identifier);
        var payload = arguments[0];
        var identifier = arguments[1];

        AppDispatcher.handleViewAction({
            data: payload,
            type: 'update',
            identifier: identifier
        });
    } else {
        // then form is : dispatchData(node, data, identifier);
        var nodeName = arguments[0];
        var data = arguments[1];
        var _identifier = arguments[2];

        AppDispatcher.handleViewAction({
            data: _defineProperty({}, nodeName, data),
            type: 'update',
            identifier: _identifier
        });
    }
}

exports.default = AppDispatcher;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJkaXNwYXRjaERhdGEiLCJBcHBEaXNwYXRjaGVyIiwiT2JqZWN0IiwiYXNzaWduIiwiRGlzcGF0Y2hlciIsImhhbmRsZVNlcnZlckFjdGlvbiIsImFjdGlvbiIsInBheWxvYWQiLCJzb3VyY2UiLCJkaXNwYXRjaCIsImhhbmRsZVZpZXdBY3Rpb24iLCJmaXJzdEFyZ0lzT2JqZWN0IiwiYXJndW1lbnRzIiwiaWRlbnRpZmllciIsImRhdGEiLCJ0eXBlIiwibm9kZU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7O1FBbUNnQkEsWSxHQUFBQSxZOztBQW5DaEI7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7QUFJQSxJQUFNQyxnQkFBZ0JDLE9BQU9DLE1BQVAsQ0FBYyxJQUFJQyxnQkFBSixFQUFkLEVBQWdDO0FBQ2xEOzs7O0FBSUFDLHNCQUxrRCw4QkFLL0JDLE1BTCtCLEVBS3ZCO0FBQ3ZCLFlBQU1DLFVBQVU7QUFDWkMsb0JBQVEsZUFESTtBQUVaRixvQkFBUUE7QUFGSSxTQUFoQjtBQUlBLGFBQUtHLFFBQUwsQ0FBY0YsT0FBZDtBQUNILEtBWGlEOztBQVlsRDs7OztBQUlBRyxvQkFoQmtELDRCQWdCakNKLE1BaEJpQyxFQWdCekI7QUFDckIsWUFBTUMsVUFBVTtBQUNaQyxvQkFBUSxhQURJO0FBRVpGLG9CQUFRQTtBQUZJLFNBQWhCO0FBSUEsYUFBS0csUUFBTCxDQUFjRixPQUFkO0FBQ0g7QUF0QmlELENBQWhDLENBQXRCOztBQXlCQTs7O0FBR08sU0FBU1AsWUFBVCxHQUF3QjtBQUMzQixRQUFNVyxtQkFBbUIsd0JBQVNDLFVBQVUsQ0FBVixDQUFULENBQXpCOztBQUVBLFFBQUlELGdCQUFKLEVBQXNCO0FBQUU7QUFDcEIsWUFBTUosVUFBVUssVUFBVSxDQUFWLENBQWhCO0FBQ0EsWUFBTUMsYUFBYUQsVUFBVSxDQUFWLENBQW5COztBQUVBWCxzQkFBY1MsZ0JBQWQsQ0FBK0I7QUFDM0JJLGtCQUFNUCxPQURxQjtBQUUzQlEsa0JBQU0sUUFGcUI7QUFHM0JGO0FBSDJCLFNBQS9CO0FBS0gsS0FURCxNQVNPO0FBQUU7QUFDTCxZQUFNRyxXQUFXSixVQUFVLENBQVYsQ0FBakI7QUFDQSxZQUFNRSxPQUFPRixVQUFVLENBQVYsQ0FBYjtBQUNBLFlBQU1DLGNBQWFELFVBQVUsQ0FBVixDQUFuQjs7QUFFQVgsc0JBQWNTLGdCQUFkLENBQStCO0FBQzNCSSxzQ0FDS0UsUUFETCxFQUNnQkYsSUFEaEIsQ0FEMkI7QUFJM0JDLGtCQUFNLFFBSnFCO0FBSzNCRjtBQUwyQixTQUEvQjtBQU9IO0FBQ0o7O2tCQUVjWixhIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpc3BhdGNoZXIgfSBmcm9tICdmbHV4JztcclxuaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9sYW5nL2lzT2JqZWN0JztcclxuXHJcbi8qKlxyXG4qIEFwcGxpY2F0aW9uIGRpc3BhdGNoZXIuXHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxuY29uc3QgQXBwRGlzcGF0Y2hlciA9IE9iamVjdC5hc3NpZ24obmV3IERpc3BhdGNoZXIoKSwge1xyXG4gICAgLyoqXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gVGhlIGRldGFpbHMgb2YgdGhlIGFjdGlvbiwgaW5jbHVkaW5nIHRoZSBhY3Rpb24nc1xyXG4gICAgKiB0eXBlIGFuZCBhZGRpdGlvbmFsIGRhdGEgY29taW5nIGZyb20gdGhlIHNlcnZlci5cclxuICAgICovXHJcbiAgICBoYW5kbGVTZXJ2ZXJBY3Rpb24oYWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgICAgICAgc291cmNlOiAnU0VSVkVSX0FDVElPTicsXHJcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoKHBheWxvYWQpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uIFRoZSBkZXRhaWxzIG9mIHRoZSBhY3Rpb24sIGluY2x1ZGluZyB0aGUgYWN0aW9uJ3NcclxuICAgICogdHlwZSBhbmQgYWRkaXRpb25hbCBkYXRhIGNvbWluZyBmcm9tIHRoZSB2aWV3LlxyXG4gICAgKi9cclxuICAgIGhhbmRsZVZpZXdBY3Rpb24oYWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgICAgICAgc291cmNlOiAnVklFV19BQ1RJT04nLFxyXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaChwYXlsb2FkKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogRGlzcGF0Y2ggdXBkYXRlIGRhdGEuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hEYXRhKCkge1xyXG4gICAgY29uc3QgZmlyc3RBcmdJc09iamVjdCA9IGlzT2JqZWN0KGFyZ3VtZW50c1swXSk7XHJcblxyXG4gICAgaWYgKGZpcnN0QXJnSXNPYmplY3QpIHsgLy8gdGhlbiBmb3JtIGlzIDogZGlzcGF0Y2hEYXRhKHsgbm9kZTogZGF0YSB9LCBpZGVudGlmaWVyKTtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBhcmd1bWVudHNbMV07XHJcblxyXG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgICAgICAgIGRhdGE6IHBheWxvYWQsXHJcbiAgICAgICAgICAgIHR5cGU6ICd1cGRhdGUnLFxyXG4gICAgICAgICAgICBpZGVudGlmaWVyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2UgeyAvLyB0aGVuIGZvcm0gaXMgOiBkaXNwYXRjaERhdGEobm9kZSwgZGF0YSwgaWRlbnRpZmllcik7XHJcbiAgICAgICAgY29uc3Qgbm9kZU5hbWUgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGFyZ3VtZW50c1sxXTtcclxuICAgICAgICBjb25zdCBpZGVudGlmaWVyID0gYXJndW1lbnRzWzJdO1xyXG5cclxuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBbbm9kZU5hbWVdOiBkYXRhXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6ICd1cGRhdGUnLFxyXG4gICAgICAgICAgICBpZGVudGlmaWVyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcERpc3BhdGNoZXI7XHJcbiJdfQ==