'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routeToRegExp = exports.findRouteName = exports.processSiteDescription = exports.getSiteStructure = exports.regenerateRoutes = exports.getSiteDescription = exports.getRoutes = exports.getRoute = undefined;

var _clone = require('lodash/lang/clone');

var _clone2 = _interopRequireDefault(_clone);

var _find = require('lodash/collection/find');

var _find2 = _interopRequireDefault(_find);

var _some = require('lodash/collection/some');

var _some2 = _interopRequireDefault(_some);

var _user = require('../user');

var _user2 = _interopRequireDefault(_user);

var _reader = require('./reader');

var _reader2 = _interopRequireDefault(_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Container for the site description and routes.
var siteDescription = void 0,
    routes = {},
    siteStructure = {};
var EMPTY = '';

//Process the name of
function _processName(pfx, eltDescName) {
    if (pfx === undefined || pfx === null) {
        pfx = EMPTY;
    }
    if (eltDescName === undefined || eltDescName === null) {
        return pfx;
    }
    if (pfx === EMPTY) {
        return eltDescName;
    }
    return pfx + '.' + eltDescName;
}
//Process the deaders element of the site description element.
function _processHeaders(siteDesc, prefix) {

    if (!siteDesc.headers) {
        return;
    }
    //console.log('headers', siteDesc.headers, 'prefix', prefix);
    var headers = siteDesc.headers;
    var isInSiteStructure = false;
    if (_reader2.default.checkParams(siteDesc.requiredParams)) {
        isInSiteStructure = true;
    }
    for (var i in headers) {
        _processElement(headers[i], prefix, { isInSiteStructure: isInSiteStructure });
    }
}

//Process the pages element of the site description.
function _processPages(siteDesc, prefix) {
    if (siteDesc.pages !== undefined && siteDesc.pages !== null) {
        //console.log('pages', siteDesc.pages, 'prefix', prefix);

        for (var i in siteDesc.pages) {
            _processElement(siteDesc.pages[i], prefix);
        }
    }
}

//Process the route part of the site description element.
function _processRoute(siteDesc, prefix, options) {
    options = options || {};
    //if (siteDesc.roles !== undefined && siteDesc.url !== undefined)
    //console.log('route', siteDesc.url, 'prefix', prefix);

    if (_user2.default.hasRole(siteDesc.roles)) {
        var route = {
            roles: siteDesc.roles,
            name: prefix,
            route: siteDesc.url,
            regex: routeToRegExp(siteDesc.url),
            requiredParams: siteDesc.requiredParams
        };
        //Call the Backbone.history.handlers....
        //console.log('*****************');
        //console.log('ROute name: ',route.route);
        //console.log('Route handler name : ',  findRouteName(route.route.substring(1)));
        routes[findRouteName(route.route.substring(1))] = route;
        if (options.isInSiteStructure) {
            siteStructure[prefix] = route;
        }
    }
}

function _processElement(siteDescElt, prefix, options) {
    options = options || {};
    if (!siteDescElt) {
        console.warn('The siteDescription does not exists', siteDescElt);
        return;
    }
    var pfx = _processName(prefix, siteDescElt.name);
    //if(siteDescriptionReader.checkParams(siteDescElt.requiredParams)){
    _processHeaders(siteDescElt, pfx);
    //}
    _processPages(siteDescElt, pfx);
    _processRoute(siteDescElt, pfx, options);
}

//Find a route with its name.
// _routeToTest_ : Route to test.
// *return* : The handler route name.
function findRouteName(routeToTest) {
    if (!window.Backbone) {
        throw new Error('Dependency: Backbone is missing.');
    }
    var handlers = window.Backbone.history.handlers;
    //console.log('handlers', )
    var h = (0, _find2.default)(handlers, function (handler) {
        return handler.route.test(routeToTest);
    });
    if (h !== undefined) {
        return h.route.toString();
    }
    return (0, _some2.default)(handlers, function (handler) {
        if (handler.route.test(routeToTest)) {
            return handler.route.toString();
        }
    });
}

//Convert a route to regexp
var optionalParam = /\((.*?)\)/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*\w+/g;
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
function routeToRegExp(route) {
    route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function (match, optional) {
        return optional ? match : '([^/?]+)';
    }).replace(splatParam, '([^?]*?)');
    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
}

//Get the siteDescription.
function getSiteDescription() {
    return (0, _clone2.default)(siteDescription);
}

//Get all the application routes from the siteDescription.
function getRoute(routeName) {
    return (0, _clone2.default)(routes[routeName]);
}
function getRoutes() {
    return (0, _clone2.default)(routes);
}

function getSiteStructure() {
    return (0, _clone2.default)(siteStructure);
}
//Process the siteDescription if necessary.
function processSiteDescription(options) {
    options = options || {};
    if (!_reader2.default.isProcessed() || options.isForceProcess) {
        siteDescription = _reader2.default.getSite();
        regenerateRoutes();
        return siteDescription;
    }
    return false;
}

//Regenerate the application routes.
function regenerateRoutes() {
    //Clean all previous registered routes.
    routes = {};
    siteStructure = {};
    //Process the new routes.
    _processElement(siteDescription);
}

exports.getRoute = getRoute;
exports.getRoutes = getRoutes;
exports.getSiteDescription = getSiteDescription;
exports.regenerateRoutes = regenerateRoutes;
exports.getSiteStructure = getSiteStructure;
exports.processSiteDescription = processSiteDescription;
exports.findRouteName = findRouteName;
exports.routeToRegExp = routeToRegExp;
exports.default = {
    getRoute: getRoute,
    getRoutes: getRoutes,
    getSiteDescription: getSiteDescription,
    regenerateRoutes: regenerateRoutes,
    getSiteStructure: getSiteStructure,
    processSiteDescription: processSiteDescription,
    findRouteName: findRouteName,
    routeToRegExp: routeToRegExp
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJzaXRlRGVzY3JpcHRpb24iLCJyb3V0ZXMiLCJzaXRlU3RydWN0dXJlIiwiRU1QVFkiLCJfcHJvY2Vzc05hbWUiLCJwZngiLCJlbHREZXNjTmFtZSIsInVuZGVmaW5lZCIsIl9wcm9jZXNzSGVhZGVycyIsInNpdGVEZXNjIiwicHJlZml4IiwiaGVhZGVycyIsImlzSW5TaXRlU3RydWN0dXJlIiwic2l0ZURlc2NyaXB0aW9uUmVhZGVyIiwiY2hlY2tQYXJhbXMiLCJyZXF1aXJlZFBhcmFtcyIsImkiLCJfcHJvY2Vzc0VsZW1lbnQiLCJfcHJvY2Vzc1BhZ2VzIiwicGFnZXMiLCJfcHJvY2Vzc1JvdXRlIiwib3B0aW9ucyIsInVzZXJIZWxwZXIiLCJoYXNSb2xlIiwicm9sZXMiLCJyb3V0ZSIsIm5hbWUiLCJ1cmwiLCJyZWdleCIsInJvdXRlVG9SZWdFeHAiLCJmaW5kUm91dGVOYW1lIiwic3Vic3RyaW5nIiwic2l0ZURlc2NFbHQiLCJjb25zb2xlIiwid2FybiIsInJvdXRlVG9UZXN0Iiwid2luZG93IiwiQmFja2JvbmUiLCJFcnJvciIsImhhbmRsZXJzIiwiaGlzdG9yeSIsImgiLCJoYW5kbGVyIiwidGVzdCIsInRvU3RyaW5nIiwib3B0aW9uYWxQYXJhbSIsIm5hbWVkUGFyYW0iLCJzcGxhdFBhcmFtIiwiZXNjYXBlUmVnRXhwIiwicmVwbGFjZSIsIm1hdGNoIiwib3B0aW9uYWwiLCJSZWdFeHAiLCJnZXRTaXRlRGVzY3JpcHRpb24iLCJnZXRSb3V0ZSIsInJvdXRlTmFtZSIsImdldFJvdXRlcyIsImdldFNpdGVTdHJ1Y3R1cmUiLCJwcm9jZXNzU2l0ZURlc2NyaXB0aW9uIiwiaXNQcm9jZXNzZWQiLCJpc0ZvcmNlUHJvY2VzcyIsImdldFNpdGUiLCJyZWdlbmVyYXRlUm91dGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJ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UlcsQyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2xvbmUgZnJvbSAnbG9kYXNoL2xhbmcvY2xvbmUnO1xyXG5pbXBvcnQgZmluZCBmcm9tICdsb2Rhc2gvY29sbGVjdGlvbi9maW5kJztcclxuaW1wb3J0IHNvbWUgZnJvbSAnbG9kYXNoL2NvbGxlY3Rpb24vc29tZSc7XHJcblxyXG5pbXBvcnQgdXNlckhlbHBlciBmcm9tICcuLi91c2VyJztcclxuaW1wb3J0IHNpdGVEZXNjcmlwdGlvblJlYWRlciBmcm9tICcuL3JlYWRlcic7XHJcblxyXG4vL0NvbnRhaW5lciBmb3IgdGhlIHNpdGUgZGVzY3JpcHRpb24gYW5kIHJvdXRlcy5cclxubGV0IHNpdGVEZXNjcmlwdGlvbiwgcm91dGVzID0ge30sIHNpdGVTdHJ1Y3R1cmUgPSB7fTtcclxuY29uc3QgRU1QVFkgPSAnJztcclxuXHJcbi8vUHJvY2VzcyB0aGUgbmFtZSBvZlxyXG5mdW5jdGlvbiBfcHJvY2Vzc05hbWUocGZ4LCBlbHREZXNjTmFtZSkge1xyXG4gICAgaWYgKHBmeCA9PT0gdW5kZWZpbmVkIHx8IHBmeCA9PT0gbnVsbCkge1xyXG4gICAgICAgIHBmeCA9IEVNUFRZO1xyXG4gICAgfVxyXG4gICAgaWYgKGVsdERlc2NOYW1lID09PSB1bmRlZmluZWQgfHwgZWx0RGVzY05hbWUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gcGZ4O1xyXG4gICAgfVxyXG4gICAgaWYgKHBmeCA9PT0gRU1QVFkpIHtcclxuICAgICAgICByZXR1cm4gZWx0RGVzY05hbWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGZ4ICsgJy4nICsgZWx0RGVzY05hbWU7XHJcbn1cclxuLy9Qcm9jZXNzIHRoZSBkZWFkZXJzIGVsZW1lbnQgb2YgdGhlIHNpdGUgZGVzY3JpcHRpb24gZWxlbWVudC5cclxuZnVuY3Rpb24gX3Byb2Nlc3NIZWFkZXJzKHNpdGVEZXNjLCBwcmVmaXgpIHtcclxuXHJcbiAgICBpZiAoIXNpdGVEZXNjLmhlYWRlcnMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvL2NvbnNvbGUubG9nKCdoZWFkZXJzJywgc2l0ZURlc2MuaGVhZGVycywgJ3ByZWZpeCcsIHByZWZpeCk7XHJcbiAgICBsZXQgaGVhZGVycyA9IHNpdGVEZXNjLmhlYWRlcnM7XHJcbiAgICBsZXQgaXNJblNpdGVTdHJ1Y3R1cmUgPSBmYWxzZTtcclxuICAgIGlmIChzaXRlRGVzY3JpcHRpb25SZWFkZXIuY2hlY2tQYXJhbXMoc2l0ZURlc2MucmVxdWlyZWRQYXJhbXMpKSB7XHJcbiAgICAgICAgaXNJblNpdGVTdHJ1Y3R1cmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSBpbiBoZWFkZXJzKSB7XHJcbiAgICAgICAgX3Byb2Nlc3NFbGVtZW50KGhlYWRlcnNbaV0sIHByZWZpeCwgeyBpc0luU2l0ZVN0cnVjdHVyZTogaXNJblNpdGVTdHJ1Y3R1cmUgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vUHJvY2VzcyB0aGUgcGFnZXMgZWxlbWVudCBvZiB0aGUgc2l0ZSBkZXNjcmlwdGlvbi5cclxuZnVuY3Rpb24gX3Byb2Nlc3NQYWdlcyhzaXRlRGVzYywgcHJlZml4KSB7XHJcbiAgICBpZiAoc2l0ZURlc2MucGFnZXMgIT09IHVuZGVmaW5lZCAmJiBzaXRlRGVzYy5wYWdlcyAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3BhZ2VzJywgc2l0ZURlc2MucGFnZXMsICdwcmVmaXgnLCBwcmVmaXgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIGluIHNpdGVEZXNjLnBhZ2VzKSB7XHJcbiAgICAgICAgICAgIF9wcm9jZXNzRWxlbWVudChzaXRlRGVzYy5wYWdlc1tpXSwgcHJlZml4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vUHJvY2VzcyB0aGUgcm91dGUgcGFydCBvZiB0aGUgc2l0ZSBkZXNjcmlwdGlvbiBlbGVtZW50LlxyXG5mdW5jdGlvbiBfcHJvY2Vzc1JvdXRlKHNpdGVEZXNjLCBwcmVmaXgsIG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgLy9pZiAoc2l0ZURlc2Mucm9sZXMgIT09IHVuZGVmaW5lZCAmJiBzaXRlRGVzYy51cmwgIT09IHVuZGVmaW5lZClcclxuICAgIC8vY29uc29sZS5sb2coJ3JvdXRlJywgc2l0ZURlc2MudXJsLCAncHJlZml4JywgcHJlZml4KTtcclxuXHJcbiAgICBpZiAodXNlckhlbHBlci5oYXNSb2xlKHNpdGVEZXNjLnJvbGVzKSkge1xyXG4gICAgICAgIGxldCByb3V0ZSA9IHtcclxuICAgICAgICAgICAgcm9sZXM6IHNpdGVEZXNjLnJvbGVzLFxyXG4gICAgICAgICAgICBuYW1lOiBwcmVmaXgsXHJcbiAgICAgICAgICAgIHJvdXRlOiBzaXRlRGVzYy51cmwsXHJcbiAgICAgICAgICAgIHJlZ2V4OiByb3V0ZVRvUmVnRXhwKHNpdGVEZXNjLnVybCksXHJcbiAgICAgICAgICAgIHJlcXVpcmVkUGFyYW1zOiBzaXRlRGVzYy5yZXF1aXJlZFBhcmFtc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy9DYWxsIHRoZSBCYWNrYm9uZS5oaXN0b3J5LmhhbmRsZXJzLi4uLlxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqJyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnUk91dGUgbmFtZTogJyxyb3V0ZS5yb3V0ZSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnUm91dGUgaGFuZGxlciBuYW1lIDogJywgIGZpbmRSb3V0ZU5hbWUocm91dGUucm91dGUuc3Vic3RyaW5nKDEpKSk7XHJcbiAgICAgICAgcm91dGVzW2ZpbmRSb3V0ZU5hbWUocm91dGUucm91dGUuc3Vic3RyaW5nKDEpKV0gPSByb3V0ZTtcclxuICAgICAgICBpZiAob3B0aW9ucy5pc0luU2l0ZVN0cnVjdHVyZSkge1xyXG4gICAgICAgICAgICBzaXRlU3RydWN0dXJlW3ByZWZpeF0gPSByb3V0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBfcHJvY2Vzc0VsZW1lbnQoc2l0ZURlc2NFbHQsIHByZWZpeCwgb3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBpZiAoIXNpdGVEZXNjRWx0KSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgc2l0ZURlc2NyaXB0aW9uIGRvZXMgbm90IGV4aXN0cycsIHNpdGVEZXNjRWx0KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgcGZ4ID0gX3Byb2Nlc3NOYW1lKHByZWZpeCwgc2l0ZURlc2NFbHQubmFtZSk7XHJcbiAgICAvL2lmKHNpdGVEZXNjcmlwdGlvblJlYWRlci5jaGVja1BhcmFtcyhzaXRlRGVzY0VsdC5yZXF1aXJlZFBhcmFtcykpe1xyXG4gICAgX3Byb2Nlc3NIZWFkZXJzKHNpdGVEZXNjRWx0LCBwZngpO1xyXG4gICAgLy99XHJcbiAgICBfcHJvY2Vzc1BhZ2VzKHNpdGVEZXNjRWx0LCBwZngpO1xyXG4gICAgX3Byb2Nlc3NSb3V0ZShzaXRlRGVzY0VsdCwgcGZ4LCBvcHRpb25zKTtcclxufVxyXG5cclxuXHJcbi8vRmluZCBhIHJvdXRlIHdpdGggaXRzIG5hbWUuXHJcbi8vIF9yb3V0ZVRvVGVzdF8gOiBSb3V0ZSB0byB0ZXN0LlxyXG4vLyAqcmV0dXJuKiA6IFRoZSBoYW5kbGVyIHJvdXRlIG5hbWUuXHJcbmZ1bmN0aW9uIGZpbmRSb3V0ZU5hbWUocm91dGVUb1Rlc3QpIHtcclxuICAgIGlmICghd2luZG93LkJhY2tib25lKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZXBlbmRlbmN5OiBCYWNrYm9uZSBpcyBtaXNzaW5nLicpO1xyXG4gICAgfVxyXG4gICAgbGV0IGhhbmRsZXJzID0gd2luZG93LkJhY2tib25lLmhpc3RvcnkuaGFuZGxlcnM7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdoYW5kbGVycycsIClcclxuICAgIGxldCBoID0gZmluZChoYW5kbGVycywgZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICByZXR1cm4gaGFuZGxlci5yb3V0ZS50ZXN0KHJvdXRlVG9UZXN0KTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBoLnJvdXRlLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc29tZShoYW5kbGVycywgZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICBpZiAoaGFuZGxlci5yb3V0ZS50ZXN0KHJvdXRlVG9UZXN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlci5yb3V0ZS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLy9Db252ZXJ0IGEgcm91dGUgdG8gcmVnZXhwXHJcbmNvbnN0IG9wdGlvbmFsUGFyYW0gPSAvXFwoKC4qPylcXCkvZztcclxuY29uc3QgbmFtZWRQYXJhbSA9IC8oXFwoXFw/KT86XFx3Ky9nO1xyXG5jb25zdCBzcGxhdFBhcmFtID0gL1xcKlxcdysvZztcclxuY29uc3QgZXNjYXBlUmVnRXhwID0gL1tcXC17fVxcW1xcXSs/LixcXFxcXFxeJHwjXFxzXS9nO1xyXG5mdW5jdGlvbiByb3V0ZVRvUmVnRXhwKHJvdXRlKSB7XHJcbiAgICByb3V0ZSA9IHJvdXRlLnJlcGxhY2UoZXNjYXBlUmVnRXhwLCAnXFxcXCQmJylcclxuICAgICAgICAucmVwbGFjZShvcHRpb25hbFBhcmFtLCAnKD86JDEpPycpXHJcbiAgICAgICAgLnJlcGxhY2UobmFtZWRQYXJhbSwgZnVuY3Rpb24gKG1hdGNoLCBvcHRpb25hbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uYWwgPyBtYXRjaCA6ICcoW14vP10rKSc7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAucmVwbGFjZShzcGxhdFBhcmFtLCAnKFteP10qPyknKTtcclxuICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJvdXRlICsgJyg/OlxcXFw/KFtcXFxcc1xcXFxTXSopKT8kJyk7XHJcbn1cclxuXHJcbi8vR2V0IHRoZSBzaXRlRGVzY3JpcHRpb24uXHJcbmZ1bmN0aW9uIGdldFNpdGVEZXNjcmlwdGlvbigpIHtcclxuICAgIHJldHVybiBjbG9uZShzaXRlRGVzY3JpcHRpb24pO1xyXG59XHJcblxyXG4vL0dldCBhbGwgdGhlIGFwcGxpY2F0aW9uIHJvdXRlcyBmcm9tIHRoZSBzaXRlRGVzY3JpcHRpb24uXHJcbmZ1bmN0aW9uIGdldFJvdXRlKHJvdXRlTmFtZSkge1xyXG4gICAgcmV0dXJuIGNsb25lKHJvdXRlc1tyb3V0ZU5hbWVdKTtcclxufVxyXG5mdW5jdGlvbiBnZXRSb3V0ZXMoKSB7XHJcbiAgICByZXR1cm4gY2xvbmUocm91dGVzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2l0ZVN0cnVjdHVyZSgpIHtcclxuICAgIHJldHVybiBjbG9uZShzaXRlU3RydWN0dXJlKTtcclxufVxyXG4vL1Byb2Nlc3MgdGhlIHNpdGVEZXNjcmlwdGlvbiBpZiBuZWNlc3NhcnkuXHJcbmZ1bmN0aW9uIHByb2Nlc3NTaXRlRGVzY3JpcHRpb24ob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBpZiAoIXNpdGVEZXNjcmlwdGlvblJlYWRlci5pc1Byb2Nlc3NlZCgpIHx8IG9wdGlvbnMuaXNGb3JjZVByb2Nlc3MpIHtcclxuICAgICAgICBzaXRlRGVzY3JpcHRpb24gPSBzaXRlRGVzY3JpcHRpb25SZWFkZXIuZ2V0U2l0ZSgpO1xyXG4gICAgICAgIHJlZ2VuZXJhdGVSb3V0ZXMoKTtcclxuICAgICAgICByZXR1cm4gc2l0ZURlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG4vL1JlZ2VuZXJhdGUgdGhlIGFwcGxpY2F0aW9uIHJvdXRlcy5cclxuZnVuY3Rpb24gcmVnZW5lcmF0ZVJvdXRlcygpIHtcclxuICAgIC8vQ2xlYW4gYWxsIHByZXZpb3VzIHJlZ2lzdGVyZWQgcm91dGVzLlxyXG4gICAgcm91dGVzID0ge307XHJcbiAgICBzaXRlU3RydWN0dXJlID0ge307XHJcbiAgICAvL1Byb2Nlc3MgdGhlIG5ldyByb3V0ZXMuXHJcbiAgICBfcHJvY2Vzc0VsZW1lbnQoc2l0ZURlc2NyaXB0aW9uKTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIGdldFJvdXRlLFxyXG4gICAgZ2V0Um91dGVzLFxyXG4gICAgZ2V0U2l0ZURlc2NyaXB0aW9uLFxyXG4gICAgcmVnZW5lcmF0ZVJvdXRlcyxcclxuICAgIGdldFNpdGVTdHJ1Y3R1cmUsXHJcbiAgICBwcm9jZXNzU2l0ZURlc2NyaXB0aW9uLFxyXG4gICAgZmluZFJvdXRlTmFtZSxcclxuICAgIHJvdXRlVG9SZWdFeHBcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGdldFJvdXRlLFxyXG4gICAgZ2V0Um91dGVzLFxyXG4gICAgZ2V0U2l0ZURlc2NyaXB0aW9uLFxyXG4gICAgcmVnZW5lcmF0ZVJvdXRlcyxcclxuICAgIGdldFNpdGVTdHJ1Y3R1cmUsXHJcbiAgICBwcm9jZXNzU2l0ZURlc2NyaXB0aW9uLFxyXG4gICAgZmluZFJvdXRlTmFtZSxcclxuICAgIHJvdXRlVG9SZWdFeHBcclxufTtcclxuIl19