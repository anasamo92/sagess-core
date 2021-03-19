'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = exports.set = exports.setAll = exports.getAll = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireDefault(_isString);

var _check = require('../../util/string/check');

var _check2 = _interopRequireDefault(_check);

var _check3 = require('../../util/object/check');

var _check4 = _interopRequireDefault(_check3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidException = Error; //Dependencies.


/**
* Container for the application domains.
* @type {object}
*/
var domainsMap = _immutable2.default.Map({});

/**
 * Get all domains in a js object.
 * @return {object} - All domains.
 */
function getDomains() {
    return domainsMap.toJS();
}

/**
* Set new domains.
* @param {object} newDomains - New domains to set.
* à
*/
function setDomains(newDomains) {
    if (!(0, _isObject2.default)(newDomains)) {
        throw new InvalidException('newDomains should be an object', newDomains);
    }
    domainsMap = domainsMap.merge(newDomains);
}

/**
* Set a domain.
* @param {object} domain - Object structure of the domain.
*/
function setDomain(domain) {
    (0, _check4.default)('domain', domain);
    (0, _check2.default)('doamin.name', domain.name);
    //test domain, domain.name
    domainsMap = domainsMap.set(domain.name, domain);
}

/**
* Get a domain given a name.
* @param {string} domainName - name of the domain.
* @return {object} - The domain object.
*/
function getDomain(domainName) {
    if (!(0, _isString2.default)(domainName)) {
        throw new InvalidException('domaiName should extists and be a string', domainName);
    }
    if (!domainsMap.has(domainName)) {
        console.warn('You are trying to access a non existing domain: ' + domainName);
        return _immutable2.default.Map({});
    }
    return domainsMap.get(domainName);
}

exports.default = {
    getAll: getDomains,
    setAll: setDomains,
    set: setDomain,
    get: getDomain
};
exports.getAll = getDomains;
exports.setAll = setDomains;
exports.set = setDomain;
exports.get = getDomain;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJJbnZhbGlkRXhjZXB0aW9uIiwiRXJyb3IiLCJkb21haW5zTWFwIiwiSW1tdXRhYmxlIiwiTWFwIiwiZ2V0RG9tYWlucyIsInRvSlMiLCJzZXREb21haW5zIiwibmV3RG9tYWlucyIsIm1lcmdlIiwic2V0RG9tYWluIiwiZG9tYWluIiwibmFtZSIsInNldCIsImdldERvbWFpbiIsImRvbWFpbk5hbWUiLCJoYXMiLCJjb25zb2xlIiwid2FybiIsImdldCIsImdldEFsbCIsInNldEFsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUZBLElBQU1BLG1CQUFtQkMsS0FBekIsQyxDQUpBOzs7QUFRQTs7OztBQUlBLElBQUlDLGFBQWFDLG9CQUFVQyxHQUFWLENBQWMsRUFBZCxDQUFqQjs7QUFFQTs7OztBQUlBLFNBQVNDLFVBQVQsR0FBc0I7QUFDbEIsV0FBT0gsV0FBV0ksSUFBWCxFQUFQO0FBQ0g7O0FBRUQ7Ozs7O0FBS0EsU0FBU0MsVUFBVCxDQUFvQkMsVUFBcEIsRUFBZ0M7QUFDNUIsUUFBSSxDQUFDLHdCQUFTQSxVQUFULENBQUwsRUFBMkI7QUFDdkIsY0FBTSxJQUFJUixnQkFBSixDQUFxQixnQ0FBckIsRUFBdURRLFVBQXZELENBQU47QUFDSDtBQUNETixpQkFBYUEsV0FBV08sS0FBWCxDQUFpQkQsVUFBakIsQ0FBYjtBQUNIOztBQUdEOzs7O0FBSUEsU0FBU0UsU0FBVCxDQUFtQkMsTUFBbkIsRUFBMkI7QUFDdkIseUJBQWMsUUFBZCxFQUF3QkEsTUFBeEI7QUFDQSx5QkFBYyxhQUFkLEVBQTZCQSxPQUFPQyxJQUFwQztBQUNBO0FBQ0FWLGlCQUFhQSxXQUFXVyxHQUFYLENBQWVGLE9BQU9DLElBQXRCLEVBQTRCRCxNQUE1QixDQUFiO0FBQ0g7O0FBRUQ7Ozs7O0FBS0EsU0FBU0csU0FBVCxDQUFtQkMsVUFBbkIsRUFBK0I7QUFDM0IsUUFBSSxDQUFDLHdCQUFTQSxVQUFULENBQUwsRUFBMkI7QUFDdkIsY0FBTSxJQUFJZixnQkFBSixDQUFxQiwwQ0FBckIsRUFBaUVlLFVBQWpFLENBQU47QUFDSDtBQUNELFFBQUksQ0FBQ2IsV0FBV2MsR0FBWCxDQUFlRCxVQUFmLENBQUwsRUFBaUM7QUFDN0JFLGdCQUFRQyxJQUFSLHNEQUFnRUgsVUFBaEU7QUFDQSxlQUFPWixvQkFBVUMsR0FBVixDQUFjLEVBQWQsQ0FBUDtBQUNIO0FBQ0QsV0FBT0YsV0FBV2lCLEdBQVgsQ0FBZUosVUFBZixDQUFQO0FBQ0g7O2tCQUVjO0FBQ1hLLFlBQVFmLFVBREc7QUFFWGdCLFlBQVFkLFVBRkc7QUFHWE0sU0FBS0gsU0FITTtBQUlYUyxTQUFLTDtBQUpNLEM7UUFRR00sTSxHQUFkZixVO1FBQ2NnQixNLEdBQWRkLFU7UUFDYU0sRyxHQUFiSCxTO1FBQ2FTLEcsR0FBYkwsUyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RlcGVuZGVuY2llcy5cclxuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xyXG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2xhbmcvaXNPYmplY3QnO1xyXG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnbG9kYXNoL2xhbmcvaXNTdHJpbmcnO1xyXG5jb25zdCBJbnZhbGlkRXhjZXB0aW9uID0gRXJyb3I7XHJcbmltcG9ydCBjaGVja0lzU3RyaW5nIGZyb20gJy4uLy4uL3V0aWwvc3RyaW5nL2NoZWNrJztcclxuaW1wb3J0IGNoZWNrSXNPYmplY3QgZnJvbSAnLi4vLi4vdXRpbC9vYmplY3QvY2hlY2snO1xyXG5cclxuLyoqXHJcbiogQ29udGFpbmVyIGZvciB0aGUgYXBwbGljYXRpb24gZG9tYWlucy5cclxuKiBAdHlwZSB7b2JqZWN0fVxyXG4qL1xyXG5sZXQgZG9tYWluc01hcCA9IEltbXV0YWJsZS5NYXAoe30pO1xyXG5cclxuLyoqXHJcbiAqIEdldCBhbGwgZG9tYWlucyBpbiBhIGpzIG9iamVjdC5cclxuICogQHJldHVybiB7b2JqZWN0fSAtIEFsbCBkb21haW5zLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RG9tYWlucygpIHtcclxuICAgIHJldHVybiBkb21haW5zTWFwLnRvSlMoKTtcclxufVxyXG5cclxuLyoqXHJcbiogU2V0IG5ldyBkb21haW5zLlxyXG4qIEBwYXJhbSB7b2JqZWN0fSBuZXdEb21haW5zIC0gTmV3IGRvbWFpbnMgdG8gc2V0LlxyXG4qIMOgXHJcbiovXHJcbmZ1bmN0aW9uIHNldERvbWFpbnMobmV3RG9tYWlucykge1xyXG4gICAgaWYgKCFpc09iamVjdChuZXdEb21haW5zKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkRXhjZXB0aW9uKCduZXdEb21haW5zIHNob3VsZCBiZSBhbiBvYmplY3QnLCBuZXdEb21haW5zKTtcclxuICAgIH1cclxuICAgIGRvbWFpbnNNYXAgPSBkb21haW5zTWFwLm1lcmdlKG5ld0RvbWFpbnMpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiogU2V0IGEgZG9tYWluLlxyXG4qIEBwYXJhbSB7b2JqZWN0fSBkb21haW4gLSBPYmplY3Qgc3RydWN0dXJlIG9mIHRoZSBkb21haW4uXHJcbiovXHJcbmZ1bmN0aW9uIHNldERvbWFpbihkb21haW4pIHtcclxuICAgIGNoZWNrSXNPYmplY3QoJ2RvbWFpbicsIGRvbWFpbik7XHJcbiAgICBjaGVja0lzU3RyaW5nKCdkb2FtaW4ubmFtZScsIGRvbWFpbi5uYW1lKTtcclxuICAgIC8vdGVzdCBkb21haW4sIGRvbWFpbi5uYW1lXHJcbiAgICBkb21haW5zTWFwID0gZG9tYWluc01hcC5zZXQoZG9tYWluLm5hbWUsIGRvbWFpbik7XHJcbn1cclxuXHJcbi8qKlxyXG4qIEdldCBhIGRvbWFpbiBnaXZlbiBhIG5hbWUuXHJcbiogQHBhcmFtIHtzdHJpbmd9IGRvbWFpbk5hbWUgLSBuYW1lIG9mIHRoZSBkb21haW4uXHJcbiogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBkb21haW4gb2JqZWN0LlxyXG4qL1xyXG5mdW5jdGlvbiBnZXREb21haW4oZG9tYWluTmFtZSkge1xyXG4gICAgaWYgKCFpc1N0cmluZyhkb21haW5OYW1lKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkRXhjZXB0aW9uKCdkb21haU5hbWUgc2hvdWxkIGV4dGlzdHMgYW5kIGJlIGEgc3RyaW5nJywgZG9tYWluTmFtZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWRvbWFpbnNNYXAuaGFzKGRvbWFpbk5hbWUpKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBZb3UgYXJlIHRyeWluZyB0byBhY2Nlc3MgYSBub24gZXhpc3RpbmcgZG9tYWluOiAke2RvbWFpbk5hbWV9YCk7XHJcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZS5NYXAoe30pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRvbWFpbnNNYXAuZ2V0KGRvbWFpbk5hbWUpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBnZXRBbGw6IGdldERvbWFpbnMsXHJcbiAgICBzZXRBbGw6IHNldERvbWFpbnMsXHJcbiAgICBzZXQ6IHNldERvbWFpbixcclxuICAgIGdldDogZ2V0RG9tYWluXHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gICAgZ2V0RG9tYWlucyBhcyBnZXRBbGwsXHJcbiAgICBzZXREb21haW5zIGFzIHNldEFsbCxcclxuICAgIHNldERvbWFpbiBhcyBzZXQsXHJcbiAgICBnZXREb21haW4gYXMgZ2V0XHJcbn07Il19