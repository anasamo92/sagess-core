'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLogin = exports.setLogin = exports.getProfile = exports.setProfile = exports.getRoles = exports.setRoles = exports.hasRole = exports.builtInStore = undefined;

var _builtInStore = require('./built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _intersection = require('lodash/array/intersection');

var _intersection2 = _interopRequireDefault(_intersection);

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Set the a node in the store.
 * @param {string} name  node name
 * @param {string} value node value to be set
 */
function _setUserNode(name, value) {
    _dispatcher2.default.handleViewAction({ data: _defineProperty({}, name, value), type: 'update' });
}
/**
* Check if a user has the givent role or roles.
* @param  {string | array}  role - Check if the user has one or many roles.
* @return {Boolean} - True if the user has at least on of the givent roles.
*/
function hasRole(role) {
    role = (0, _isArray2.default)(role) ? role : [role];
    return 0 < (0, _intersection2.default)(role, _builtInStore2.default.getRoles()).length;
}
/**
    * Set the user roles.
    * @param {array} roles - User role list.
    */
function setRoles(roles) {
    _setUserNode('roles', roles);
}
/**
* Get the user roles.
* @return {array} - The user role list.
*/
function getRoles() {
    return _builtInStore2.default.getRoles();
}
/**
* Set the user profile.
* @param {object} profile User profile.
*/
function setProfile(profile) {
    _setUserNode('profile', profile);
}
/**
* Get the user profile.
* @return {object} profile User profile.
*/
function getProfile() {
    return _builtInStore2.default.getProfile();
}
/**
* Set user profile.
* @param {object} login - user login.
*/
function setLogin(login) {
    _setUserNode('login', login);
}
/**
* Get the user login.
* @return {object} - The user login.
*/
function getLogin() {
    return _builtInStore2.default.getLogin();
}
exports.default = {
    builtInStore: _builtInStore2.default,
    hasRole: hasRole,
    setRoles: setRoles,
    getRoles: getRoles,
    setProfile: setProfile,
    getProfile: getProfile,
    setLogin: setLogin,
    getLogin: getLogin
};
exports.builtInStore = _builtInStore2.default;
exports.hasRole = hasRole;
exports.setRoles = setRoles;
exports.getRoles = getRoles;
exports.setProfile = setProfile;
exports.getProfile = getProfile;
exports.setLogin = setLogin;
exports.getLogin = getLogin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJfc2V0VXNlck5vZGUiLCJuYW1lIiwidmFsdWUiLCJkaXNwYXRjaGVyIiwiaGFuZGxlVmlld0FjdGlvbiIsImRhdGEiLCJ0eXBlIiwiaGFzUm9sZSIsInJvbGUiLCJ1c2VyQnVpbHRJblN0b3JlIiwiZ2V0Um9sZXMiLCJsZW5ndGgiLCJzZXRSb2xlcyIsInJvbGVzIiwic2V0UHJvZmlsZSIsInByb2ZpbGUiLCJnZXRQcm9maWxlIiwic2V0TG9naW4iLCJsb2dpbiIsImdldExvZ2luIiwiYnVpbHRJblN0b3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7O0FBS0EsU0FBU0EsWUFBVCxDQUFzQkMsSUFBdEIsRUFBNEJDLEtBQTVCLEVBQW1DO0FBQy9CQyx5QkFBV0MsZ0JBQVgsQ0FBNEIsRUFBRUMsMEJBQVNKLElBQVQsRUFBZ0JDLEtBQWhCLENBQUYsRUFBMkJJLE1BQU0sUUFBakMsRUFBNUI7QUFDSDtBQUNEOzs7OztBQUtBLFNBQVNDLE9BQVQsQ0FBaUJDLElBQWpCLEVBQXVCO0FBQ25CQSxXQUFPLHVCQUFRQSxJQUFSLElBQWdCQSxJQUFoQixHQUF1QixDQUFDQSxJQUFELENBQTlCO0FBQ0EsV0FBTyxJQUFJLDRCQUFhQSxJQUFiLEVBQW1CQyx1QkFBaUJDLFFBQWpCLEVBQW5CLEVBQWdEQyxNQUEzRDtBQUNIO0FBQ0Q7Ozs7QUFJQSxTQUFTQyxRQUFULENBQWtCQyxLQUFsQixFQUF5QjtBQUNyQmIsaUJBQWEsT0FBYixFQUFzQmEsS0FBdEI7QUFDSDtBQUNEOzs7O0FBSUEsU0FBU0gsUUFBVCxHQUFvQjtBQUNoQixXQUFPRCx1QkFBaUJDLFFBQWpCLEVBQVA7QUFDSDtBQUNEOzs7O0FBSUEsU0FBU0ksVUFBVCxDQUFvQkMsT0FBcEIsRUFBNkI7QUFDekJmLGlCQUFhLFNBQWIsRUFBd0JlLE9BQXhCO0FBQ0g7QUFDRDs7OztBQUlBLFNBQVNDLFVBQVQsR0FBc0I7QUFDbEIsV0FBT1AsdUJBQWlCTyxVQUFqQixFQUFQO0FBQ0g7QUFDRDs7OztBQUlBLFNBQVNDLFFBQVQsQ0FBa0JDLEtBQWxCLEVBQXlCO0FBQ3JCbEIsaUJBQWEsT0FBYixFQUFzQmtCLEtBQXRCO0FBQ0g7QUFDRDs7OztBQUlBLFNBQVNDLFFBQVQsR0FBb0I7QUFDaEIsV0FBT1YsdUJBQWlCVSxRQUFqQixFQUFQO0FBQ0g7a0JBQ2M7QUFDWEMsa0JBQWNYLHNCQURIO0FBRVhGLG9CQUZXO0FBR1hLLHNCQUhXO0FBSVhGLHNCQUpXO0FBS1hJLDBCQUxXO0FBTVhFLDBCQU5XO0FBT1hDLHNCQVBXO0FBUVhFO0FBUlcsQztRQVlTQyxZLEdBQXBCWCxzQjtRQUNBRixPLEdBQUFBLE87UUFDQUssUSxHQUFBQSxRO1FBQ0FGLFEsR0FBQUEsUTtRQUNBSSxVLEdBQUFBLFU7UUFDQUUsVSxHQUFBQSxVO1FBQ0FDLFEsR0FBQUEsUTtRQUNBRSxRLEdBQUFBLFEiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJCdWlsdEluU3RvcmUgZnJvbSAnLi9idWlsdC1pbi1zdG9yZSc7XHJcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC9sYW5nL2lzQXJyYXknO1xyXG5pbXBvcnQgaW50ZXJzZWN0aW9uIGZyb20gJ2xvZGFzaC9hcnJheS9pbnRlcnNlY3Rpb24nO1xyXG5pbXBvcnQgZGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyJztcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIGEgbm9kZSBpbiB0aGUgc3RvcmUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lICBub2RlIG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIG5vZGUgdmFsdWUgdG8gYmUgc2V0XHJcbiAqL1xyXG5mdW5jdGlvbiBfc2V0VXNlck5vZGUobmFtZSwgdmFsdWUpIHtcclxuICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7IGRhdGE6IHsgW25hbWVdOiB2YWx1ZSB9LCB0eXBlOiAndXBkYXRlJyB9KTtcclxufVxyXG4vKipcclxuKiBDaGVjayBpZiBhIHVzZXIgaGFzIHRoZSBnaXZlbnQgcm9sZSBvciByb2xlcy5cclxuKiBAcGFyYW0gIHtzdHJpbmcgfCBhcnJheX0gIHJvbGUgLSBDaGVjayBpZiB0aGUgdXNlciBoYXMgb25lIG9yIG1hbnkgcm9sZXMuXHJcbiogQHJldHVybiB7Qm9vbGVhbn0gLSBUcnVlIGlmIHRoZSB1c2VyIGhhcyBhdCBsZWFzdCBvbiBvZiB0aGUgZ2l2ZW50IHJvbGVzLlxyXG4qL1xyXG5mdW5jdGlvbiBoYXNSb2xlKHJvbGUpIHtcclxuICAgIHJvbGUgPSBpc0FycmF5KHJvbGUpID8gcm9sZSA6IFtyb2xlXTtcclxuICAgIHJldHVybiAwIDwgaW50ZXJzZWN0aW9uKHJvbGUsIHVzZXJCdWlsdEluU3RvcmUuZ2V0Um9sZXMoKSkubGVuZ3RoO1xyXG59XHJcbi8qKlxyXG4gICAgKiBTZXQgdGhlIHVzZXIgcm9sZXMuXHJcbiAgICAqIEBwYXJhbSB7YXJyYXl9IHJvbGVzIC0gVXNlciByb2xlIGxpc3QuXHJcbiAgICAqL1xyXG5mdW5jdGlvbiBzZXRSb2xlcyhyb2xlcykge1xyXG4gICAgX3NldFVzZXJOb2RlKCdyb2xlcycsIHJvbGVzKTtcclxufVxyXG4vKipcclxuKiBHZXQgdGhlIHVzZXIgcm9sZXMuXHJcbiogQHJldHVybiB7YXJyYXl9IC0gVGhlIHVzZXIgcm9sZSBsaXN0LlxyXG4qL1xyXG5mdW5jdGlvbiBnZXRSb2xlcygpIHtcclxuICAgIHJldHVybiB1c2VyQnVpbHRJblN0b3JlLmdldFJvbGVzKCk7XHJcbn1cclxuLyoqXHJcbiogU2V0IHRoZSB1c2VyIHByb2ZpbGUuXHJcbiogQHBhcmFtIHtvYmplY3R9IHByb2ZpbGUgVXNlciBwcm9maWxlLlxyXG4qL1xyXG5mdW5jdGlvbiBzZXRQcm9maWxlKHByb2ZpbGUpIHtcclxuICAgIF9zZXRVc2VyTm9kZSgncHJvZmlsZScsIHByb2ZpbGUpO1xyXG59XHJcbi8qKlxyXG4qIEdldCB0aGUgdXNlciBwcm9maWxlLlxyXG4qIEByZXR1cm4ge29iamVjdH0gcHJvZmlsZSBVc2VyIHByb2ZpbGUuXHJcbiovXHJcbmZ1bmN0aW9uIGdldFByb2ZpbGUoKSB7XHJcbiAgICByZXR1cm4gdXNlckJ1aWx0SW5TdG9yZS5nZXRQcm9maWxlKCk7XHJcbn1cclxuLyoqXHJcbiogU2V0IHVzZXIgcHJvZmlsZS5cclxuKiBAcGFyYW0ge29iamVjdH0gbG9naW4gLSB1c2VyIGxvZ2luLlxyXG4qL1xyXG5mdW5jdGlvbiBzZXRMb2dpbihsb2dpbikge1xyXG4gICAgX3NldFVzZXJOb2RlKCdsb2dpbicsIGxvZ2luKTtcclxufVxyXG4vKipcclxuKiBHZXQgdGhlIHVzZXIgbG9naW4uXHJcbiogQHJldHVybiB7b2JqZWN0fSAtIFRoZSB1c2VyIGxvZ2luLlxyXG4qL1xyXG5mdW5jdGlvbiBnZXRMb2dpbigpIHtcclxuICAgIHJldHVybiB1c2VyQnVpbHRJblN0b3JlLmdldExvZ2luKCk7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgYnVpbHRJblN0b3JlOiB1c2VyQnVpbHRJblN0b3JlLFxyXG4gICAgaGFzUm9sZSxcclxuICAgIHNldFJvbGVzLFxyXG4gICAgZ2V0Um9sZXMsXHJcbiAgICBzZXRQcm9maWxlLFxyXG4gICAgZ2V0UHJvZmlsZSxcclxuICAgIHNldExvZ2luLFxyXG4gICAgZ2V0TG9naW5cclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICB1c2VyQnVpbHRJblN0b3JlIGFzIGJ1aWx0SW5TdG9yZSxcclxuICAgIGhhc1JvbGUsXHJcbiAgICBzZXRSb2xlcyxcclxuICAgIGdldFJvbGVzLFxyXG4gICAgc2V0UHJvZmlsZSxcclxuICAgIGdldFByb2ZpbGUsXHJcbiAgICBzZXRMb2dpbixcclxuICAgIGdldExvZ2luXHJcbn07XHJcbiJdfQ==