'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _render = require('../application/render');

var _render2 = _interopRequireDefault(_render);

var _argumentNullException = require('../exception/argument-null-exception');

var _argumentNullException2 = _interopRequireDefault(_argumentNullException);

var _message = require('../message');

var _message2 = _interopRequireDefault(_message);

var _user = require('../user');

var _user2 = _interopRequireDefault(_user);

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _application = require('../application');

var _application2 = _interopRequireDefault(_application);

var _isFunction = require('lodash/lang/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Function call before each route.
*/
function _beforeRouting(newRoute) {
    //application.changeRoute(newRoute);
    _application2.default.clearHeader();
}

// Creates a router from the router argument given to this function
// Example
// create a file in your project `default-[yourProjectName]-router.js`
//import createRouter from 'sagess-core/router';
//export default createRouter(window.Backbone.Router);
// in each router file
// import DefaultProjectRouter from './default-project-router'
// export default DefaultProjectRouter.extend(...)
var createRouter = function createRouter(Backbone) {
    return Backbone.Router.extend({
        noRoleRoute: 'home',
        route: function route(urlRoute, name, callback) {
            var router = this;
            if (!callback) {
                callback = this[name];
            }
            if (!callback) {
                console.warn('\n                The callback is not defined for your route, you should check these two points in the routes property of your router:\n                - You directly have a callback associated to your route: \'routeName\': function handleRoute(){ //do what you want}\n                - You have a string property, your router should have a function in its declaration with the same name as your property\n                For more informations please see http://backbonejs.org/#Router-route\n                ');
                throw new _argumentNullException2.default('The route callback seems to be undefined, please check your router file for your route: ' + name);
            }
            function customWrapperAroundCallback() {
                var currentRoute = urlRoute;
                //Rebuild the callback arguments.
                var routeArguments = [urlRoute].concat(Array.prototype.slice.call(arguments));

                if (router.log) {
                    console.log('Route change: ' + urlRoute);
                }

                //The default route is the noRoleRoute by default
                if (currentRoute === '') {
                    currentRoute = router.noRoleRoute;
                }
                var routeName = ''; //siteDescriptionBuilder.findRouteName(currentRoute);
                var routeDescciption = { roles: ['DEFAULT_ROLE'] }; //siteDescriptionBuilder.getRoute(routeName);
                //Test the user's role on the route.
                if (routeDescciption === undefined && currentRoute !== '' || !_user2.default.hasRole(routeDescciption.roles)) {
                    console.warn('You don\'t have the needed role to see this page');
                    _message2.default.addErrorMessage('application.noRights');
                    return Backbone.history.navigate('', true);
                } else {
                    //Rendre all the errors notifications in the stack.
                    //backboneNotification.renderNotifications();
                    _beforeRouting.apply(router, routeArguments);
                    //Call the instanciated router's method before performing the routing.
                    if ((0, _isFunction2.default)(router.beforeRoute)) {
                        router.beforeRoute.apply(router, routeArguments);
                    }
                }
                //console.log('routeObject', siteDescriptionBuilder.getRoute(n));
                callback.apply(router, [].concat(Array.prototype.slice.call(arguments)));
            };
            return Backbone.Router.prototype.route.call(this, urlRoute, name, customWrapperAroundCallback);
        },
        /**
        * Render the compoennt into the page content.
        */
        _pageContent: function _pageContent(component, options) {
            return (0, _render2.default)(component, '[data-focus="page-content"]', options);
        }
    });
};

exports.default = createRouter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJfYmVmb3JlUm91dGluZyIsIm5ld1JvdXRlIiwiYXBwbGljYXRpb24iLCJjbGVhckhlYWRlciIsImNyZWF0ZVJvdXRlciIsIkJhY2tib25lIiwiUm91dGVyIiwiZXh0ZW5kIiwibm9Sb2xlUm91dGUiLCJyb3V0ZSIsInVybFJvdXRlIiwibmFtZSIsImNhbGxiYWNrIiwicm91dGVyIiwiY29uc29sZSIsIndhcm4iLCJBcmd1bWVudE51bGxFeGNlcHRpb24iLCJjdXN0b21XcmFwcGVyQXJvdW5kQ2FsbGJhY2siLCJjdXJyZW50Um91dGUiLCJyb3V0ZUFyZ3VtZW50cyIsImFyZ3VtZW50cyIsImxvZyIsInJvdXRlTmFtZSIsInJvdXRlRGVzY2NpcHRpb24iLCJyb2xlcyIsInVuZGVmaW5lZCIsInVzZXJIZWxwZXIiLCJoYXNSb2xlIiwibWVzc2FnZSIsImFkZEVycm9yTWVzc2FnZSIsImhpc3RvcnkiLCJuYXZpZ2F0ZSIsImFwcGx5IiwiYmVmb3JlUm91dGUiLCJwcm90b3R5cGUiLCJjYWxsIiwiX3BhZ2VDb250ZW50IiwiY29tcG9uZW50Iiwib3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7QUFHQSxTQUFTQSxjQUFULENBQXdCQyxRQUF4QixFQUFpQztBQUM3QjtBQUNBQywwQkFBWUMsV0FBWjtBQUNIOztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQyxlQUFlLFNBQWZBLFlBQWU7QUFBQSxXQUFZQyxTQUFTQyxNQUFULENBQWdCQyxNQUFoQixDQUF1QjtBQUNwREMscUJBQWEsTUFEdUM7QUFFcERDLGVBQVEsZUFBVUMsUUFBVixFQUFvQkMsSUFBcEIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQ3hDLGdCQUFJQyxTQUFTLElBQWI7QUFDQSxnQkFBSSxDQUFDRCxRQUFMLEVBQWM7QUFDVkEsMkJBQVcsS0FBS0QsSUFBTCxDQUFYO0FBQ0g7QUFDRCxnQkFBRyxDQUFDQyxRQUFKLEVBQWE7QUFDVEUsd0JBQVFDLElBQVI7QUFNSSxzQkFBTSxJQUFJQywrQkFBSiw4RkFBcUhMLElBQXJILENBQU47QUFDSDtBQUNELHFCQUFTTSwyQkFBVCxHQUFzQztBQUNsQyxvQkFBSUMsZUFBZVIsUUFBbkI7QUFDQTtBQUNBLG9CQUFJUyxrQkFBa0JULFFBQWxCLG9DQUFnQ1UsU0FBaEMsRUFBSjs7QUFFQSxvQkFBR1AsT0FBT1EsR0FBVixFQUFjO0FBQ1ZQLDRCQUFRTyxHQUFSLG9CQUE2QlgsUUFBN0I7QUFDSDs7QUFFRDtBQUNBLG9CQUFHUSxpQkFBaUIsRUFBcEIsRUFBdUI7QUFDbkJBLG1DQUFlTCxPQUFPTCxXQUF0QjtBQUNIO0FBQ0Qsb0JBQUljLFlBQVksRUFBaEIsQ0Fia0MsQ0FhZjtBQUNuQixvQkFBSUMsbUJBQW1CLEVBQUNDLE9BQU8sQ0FBQyxjQUFELENBQVIsRUFBdkIsQ0Fka0MsQ0FjZTtBQUNqRDtBQUNBLG9CQUFJRCxxQkFBcUJFLFNBQXJCLElBQWtDUCxpQkFBaUIsRUFBcEQsSUFBMkQsQ0FBQ1EsZUFBV0MsT0FBWCxDQUFtQkosaUJBQWlCQyxLQUFwQyxDQUEvRCxFQUEwRztBQUN0R1YsNEJBQVFDLElBQVI7QUFDQWEsc0NBQVFDLGVBQVIsQ0FBd0Isc0JBQXhCO0FBQ0EsMkJBQU94QixTQUFTeUIsT0FBVCxDQUFpQkMsUUFBakIsQ0FBMEIsRUFBMUIsRUFBOEIsSUFBOUIsQ0FBUDtBQUNILGlCQUpELE1BSU07QUFDRjtBQUNBO0FBQ0EvQixtQ0FBZWdDLEtBQWYsQ0FBcUJuQixNQUFyQixFQUE2Qk0sY0FBN0I7QUFDQTtBQUNBLHdCQUFHLDBCQUFXTixPQUFPb0IsV0FBbEIsQ0FBSCxFQUFrQztBQUM5QnBCLCtCQUFPb0IsV0FBUCxDQUFtQkQsS0FBbkIsQ0FBeUJuQixNQUF6QixFQUFpQ00sY0FBakM7QUFDSDtBQUNKO0FBQ0Q7QUFDQVAseUJBQVNvQixLQUFULENBQWVuQixNQUFmLHVDQUEyQk8sU0FBM0I7QUFFSDtBQUNELG1CQUFPZixTQUFTQyxNQUFULENBQWdCNEIsU0FBaEIsQ0FBMEJ6QixLQUExQixDQUFnQzBCLElBQWhDLENBQXFDLElBQXJDLEVBQTJDekIsUUFBM0MsRUFBcURDLElBQXJELEVBQTJETSwyQkFBM0QsQ0FBUDtBQUNILFNBbEQrQztBQW1EaEQ7OztBQUdBbUIsb0JBdERnRCx3QkFzRG5DQyxTQXREbUMsRUFzRHhCQyxPQXREd0IsRUFzRGhCO0FBQzVCLG1CQUFPLHNCQUFPRCxTQUFQLEVBQWtCLDZCQUFsQixFQUFpREMsT0FBakQsQ0FBUDtBQUNIO0FBeEQrQyxLQUF2QixDQUFaO0FBQUEsQ0FBckI7O2tCQTREZWxDLFkiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlbmRlciBmcm9tICcuLi9hcHBsaWNhdGlvbi9yZW5kZXInO1xuaW1wb3J0IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24vYXJndW1lbnQtbnVsbC1leGNlcHRpb24nO1xuaW1wb3J0IG1lc3NhZ2UgZnJvbSAnLi4vbWVzc2FnZSc7XG5pbXBvcnQgdXNlckhlbHBlciBmcm9tICcuLi91c2VyJztcbmltcG9ydCBkaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXInO1xuaW1wb3J0IGFwcGxpY2F0aW9uIGZyb20gJy4uL2FwcGxpY2F0aW9uJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24nO1xuXG4vKipcbiogRnVuY3Rpb24gY2FsbCBiZWZvcmUgZWFjaCByb3V0ZS5cbiovXG5mdW5jdGlvbiBfYmVmb3JlUm91dGluZyhuZXdSb3V0ZSl7XG4gICAgLy9hcHBsaWNhdGlvbi5jaGFuZ2VSb3V0ZShuZXdSb3V0ZSk7XG4gICAgYXBwbGljYXRpb24uY2xlYXJIZWFkZXIoKTtcbn1cblxuXG4vLyBDcmVhdGVzIGEgcm91dGVyIGZyb20gdGhlIHJvdXRlciBhcmd1bWVudCBnaXZlbiB0byB0aGlzIGZ1bmN0aW9uXG4vLyBFeGFtcGxlXG4vLyBjcmVhdGUgYSBmaWxlIGluIHlvdXIgcHJvamVjdCBgZGVmYXVsdC1beW91clByb2plY3ROYW1lXS1yb3V0ZXIuanNgXG4vL2ltcG9ydCBjcmVhdGVSb3V0ZXIgZnJvbSAnc2FnZXNzLWNvcmUvcm91dGVyJztcbi8vZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVyKHdpbmRvdy5CYWNrYm9uZS5Sb3V0ZXIpO1xuLy8gaW4gZWFjaCByb3V0ZXIgZmlsZVxuLy8gaW1wb3J0IERlZmF1bHRQcm9qZWN0Um91dGVyIGZyb20gJy4vZGVmYXVsdC1wcm9qZWN0LXJvdXRlcidcbi8vIGV4cG9ydCBkZWZhdWx0IERlZmF1bHRQcm9qZWN0Um91dGVyLmV4dGVuZCguLi4pXG5jb25zdCBjcmVhdGVSb3V0ZXIgPSBCYWNrYm9uZSA9PiBCYWNrYm9uZS5Sb3V0ZXIuZXh0ZW5kKHtcbiAgICBub1JvbGVSb3V0ZTogJ2hvbWUnLFxuICAgIHJvdXRlIDogZnVuY3Rpb24gKHVybFJvdXRlLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcm91dGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFjYWxsYmFjayl7XG4gICAgICAgICAgICBjYWxsYmFjayA9IHRoaXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWNhbGxiYWNrKXtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgXG4gICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkIGZvciB5b3VyIHJvdXRlLCB5b3Ugc2hvdWxkIGNoZWNrIHRoZXNlIHR3byBwb2ludHMgaW4gdGhlIHJvdXRlcyBwcm9wZXJ0eSBvZiB5b3VyIHJvdXRlcjpcbiAgICAgICAgICAgICAgICAtIFlvdSBkaXJlY3RseSBoYXZlIGEgY2FsbGJhY2sgYXNzb2NpYXRlZCB0byB5b3VyIHJvdXRlOiAncm91dGVOYW1lJzogZnVuY3Rpb24gaGFuZGxlUm91dGUoKXsgLy9kbyB3aGF0IHlvdSB3YW50fVxuICAgICAgICAgICAgICAgIC0gWW91IGhhdmUgYSBzdHJpbmcgcHJvcGVydHksIHlvdXIgcm91dGVyIHNob3VsZCBoYXZlIGEgZnVuY3Rpb24gaW4gaXRzIGRlY2xhcmF0aW9uIHdpdGggdGhlIHNhbWUgbmFtZSBhcyB5b3VyIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgRm9yIG1vcmUgaW5mb3JtYXRpb25zIHBsZWFzZSBzZWUgaHR0cDovL2JhY2tib25lanMub3JnLyNSb3V0ZXItcm91dGVcbiAgICAgICAgICAgICAgICBgKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKGBUaGUgcm91dGUgY2FsbGJhY2sgc2VlbXMgdG8gYmUgdW5kZWZpbmVkLCBwbGVhc2UgY2hlY2sgeW91ciByb3V0ZXIgZmlsZSBmb3IgeW91ciByb3V0ZTogJHtuYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gY3VzdG9tV3JhcHBlckFyb3VuZENhbGxiYWNrKCl7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRSb3V0ZSA9IHVybFJvdXRlO1xuICAgICAgICAgICAgICAgIC8vUmVidWlsZCB0aGUgY2FsbGJhY2sgYXJndW1lbnRzLlxuICAgICAgICAgICAgICAgIHZhciByb3V0ZUFyZ3VtZW50cyA9IFt1cmxSb3V0ZSAsIC4uLmFyZ3VtZW50c107XG5cbiAgICAgICAgICAgICAgICBpZihyb3V0ZXIubG9nKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJvdXRlIGNoYW5nZTogJHt1cmxSb3V0ZX1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1RoZSBkZWZhdWx0IHJvdXRlIGlzIHRoZSBub1JvbGVSb3V0ZSBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgaWYoY3VycmVudFJvdXRlID09PSAnJyl7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3V0ZSA9IHJvdXRlci5ub1JvbGVSb3V0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHJvdXRlTmFtZSA9ICcnOy8vc2l0ZURlc2NyaXB0aW9uQnVpbGRlci5maW5kUm91dGVOYW1lKGN1cnJlbnRSb3V0ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHJvdXRlRGVzY2NpcHRpb24gPSB7cm9sZXM6IFsnREVGQVVMVF9ST0xFJ119Oy8vc2l0ZURlc2NyaXB0aW9uQnVpbGRlci5nZXRSb3V0ZShyb3V0ZU5hbWUpO1xuICAgICAgICAgICAgICAgIC8vVGVzdCB0aGUgdXNlcidzIHJvbGUgb24gdGhlIHJvdXRlLlxuICAgICAgICAgICAgICAgIGlmKChyb3V0ZURlc2NjaXB0aW9uID09PSB1bmRlZmluZWQgJiYgY3VycmVudFJvdXRlICE9PSAnJykgfHwgIXVzZXJIZWxwZXIuaGFzUm9sZShyb3V0ZURlc2NjaXB0aW9uLnJvbGVzKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgWW91IGRvbid0IGhhdmUgdGhlIG5lZWRlZCByb2xlIHRvIHNlZSB0aGlzIHBhZ2VgKTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRFcnJvck1lc3NhZ2UoJ2FwcGxpY2F0aW9uLm5vUmlnaHRzJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBCYWNrYm9uZS5oaXN0b3J5Lm5hdmlnYXRlKCcnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vUmVuZHJlIGFsbCB0aGUgZXJyb3JzIG5vdGlmaWNhdGlvbnMgaW4gdGhlIHN0YWNrLlxuICAgICAgICAgICAgICAgICAgICAvL2JhY2tib25lTm90aWZpY2F0aW9uLnJlbmRlck5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgX2JlZm9yZVJvdXRpbmcuYXBwbHkocm91dGVyLCByb3V0ZUFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIC8vQ2FsbCB0aGUgaW5zdGFuY2lhdGVkIHJvdXRlcidzIG1ldGhvZCBiZWZvcmUgcGVyZm9ybWluZyB0aGUgcm91dGluZy5cbiAgICAgICAgICAgICAgICAgICAgaWYoaXNGdW5jdGlvbihyb3V0ZXIuYmVmb3JlUm91dGUpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlci5iZWZvcmVSb3V0ZS5hcHBseShyb3V0ZXIsIHJvdXRlQXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdyb3V0ZU9iamVjdCcsIHNpdGVEZXNjcmlwdGlvbkJ1aWxkZXIuZ2V0Um91dGUobikpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHJvdXRlciwgWy4uLmFyZ3VtZW50c10pO1xuXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIEJhY2tib25lLlJvdXRlci5wcm90b3R5cGUucm91dGUuY2FsbCh0aGlzLCB1cmxSb3V0ZSwgbmFtZSwgY3VzdG9tV3JhcHBlckFyb3VuZENhbGxiYWNrKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICogUmVuZGVyIHRoZSBjb21wb2VubnQgaW50byB0aGUgcGFnZSBjb250ZW50LlxuICAgICAgICAqL1xuICAgICAgICBfcGFnZUNvbnRlbnQoY29tcG9uZW50LCBvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiByZW5kZXIoY29tcG9uZW50LCAnW2RhdGEtZm9jdXM9XCJwYWdlLWNvbnRlbnRcIl0nLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcbiJdfQ==