'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.confirm = exports.clearHeader = exports.setPartialHeader = exports.setHeader = exports.changeRoute = exports.changeMode = exports.mountedComponents = exports.clear = exports.actionBuilder = exports.builtInStore = exports.render = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _builtInStore = require('./built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

var _actionBuilder = require('./action-builder');

var _actionBuilder2 = _interopRequireDefault(_actionBuilder);

var _mountedComponents = require('./mounted-components');

var _mountedComponents2 = _interopRequireDefault(_mountedComponents);

var _clear = require('./clear');

var _clear2 = _interopRequireDefault(_clear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Empty compoennt.
var Empty = function Empty(props) {
    return _react2.default.createElement('div', { 'data-focus': 'empty' });
};
Empty.displayName = 'Empty';

/**
 * Change application mode.
 * @param  {string} newMode      - New application mode.
 * @param  {string} previousMode - Previous mode.
 */
var changeMode = function changeMode(newMode, previousMode) {
    var mode = { newMode: newMode, previousMode: previousMode };
    _dispatcher2.default.handleViewAction({ data: { mode: mode }, type: 'update' });
};

/**
    * Change application route (maybe not the wole route but a route's group.)
    * @param  {string} newRoute - new route name.
    */
var changeRoute = function changeRoute(newRoute) {
    _dispatcher2.default.handleViewAction({ data: { route: newRoute }, type: 'update' });
};
/**
 * Set component to application's header.
 * @param {ReactComponent} cartridge     component injected in the cartridge
 * @param {ReactComponent} summary       component injected in the summary bar
 * @param {ReactComponent} actions       arrays of cartridge actions
 * @param {ReactComponent} barLeft       component injected in the left bar
 * @param {ReactComponent} canDeploy     indicates wether the cartridge can deploy or not
 * @param {ReactComponent} barRight      component injected in the right bar
 * @param {ReactComponent} EmptyComponent Empty component
 */
var setHeader = function setHeader(_ref) {
    var cartridge = _ref.cartridge,
        summary = _ref.summary,
        actions = _ref.actions,
        barLeft = _ref.barLeft,
        canDeploy = _ref.canDeploy,
        barRight = _ref.barRight,
        _ref$EmptyComponent = _ref.EmptyComponent,
        EmptyComponent = _ref$EmptyComponent === undefined ? Empty : _ref$EmptyComponent;

    var data = {
        cartridgeComponent: cartridge || { component: EmptyComponent },
        summaryComponent: summary || { component: EmptyComponent },
        actions: actions || { primary: [], secondary: [] },
        barContentLeftComponent: barLeft || { component: EmptyComponent },
        canDeploy: (0, _isUndefined2.default)(canDeploy) ? true : canDeploy
    };

    if (barRight) {
        data.barContentRightComponent = barRight;
    }

    _dispatcher2.default.handleViewAction({ data: data, type: 'update' });
};
/**
 * Set component to application's header with only the component gived in parameter.
 * @param {ReactComponent} cartridge     component injected in the cartridge
 * @param {ReactComponent} summary       component injected in the summary bar
 * @param {ReactComponent} actions       arrays of cartridge actions
 * @param {ReactComponent} barLeft       component injected in the left bar
 * @param {ReactComponent} canDeploy     indicates wether the cartridge can deploy or not
 * @param {ReactComponent} barRight      component injected in the right bar
 * @param {ReactComponent} EmptyComponent Empty component
 */
var setPartialHeader = function setPartialHeader(_ref2) {
    var cartridge = _ref2.cartridge,
        summary = _ref2.summary,
        actions = _ref2.actions,
        barLeft = _ref2.barLeft,
        barRight = _ref2.barRight,
        canDeploy = _ref2.canDeploy;

    var data = {
        canDeploy: (0, _isUndefined2.default)(canDeploy) ? true : canDeploy
    };

    if (cartridge) {
        data.cartridgeComponent = cartridge;
    }
    if (summary) {
        data.summaryComponent = summary;
    }
    if (actions) {
        data.actions = actions;
    }
    if (barLeft) {
        data.barContentLeftComponent = barLeft;
    }
    if (barRight) {
        data.barContentRightComponent = barRight;
    }

    _dispatcher2.default.handleViewAction({ data: data, type: 'update' });
};
/**
 * Clear the application's header.
 * @return {[type]} [description]
 */
var clearHeader = function clearHeader() {
    _dispatcher2.default.handleViewAction({
        data: {
            cartridgeComponent: { component: Empty },
            barContentLeftComponent: { component: Empty },
            summaryComponent: { component: Empty },
            actions: { primary: [], secondary: [] }
        },
        type: 'update'
    });
};

exports.render = _render2.default;
exports.builtInStore = _builtInStore2.default;
exports.actionBuilder = _actionBuilder2.default;
exports.clear = _clear2.default;
exports.mountedComponents = _mountedComponents2.default;
exports.changeMode = changeMode;
exports.changeRoute = changeRoute;
exports.setHeader = setHeader;
exports.setPartialHeader = setPartialHeader;
exports.clearHeader = clearHeader;
exports.confirm = _confirm2.default;
exports.default = {
    render: _render2.default,
    builtInStore: _builtInStore2.default,
    actionBuilder: _actionBuilder2.default,
    clear: _clear2.default,
    mountedComponents: _mountedComponents2.default,
    changeMode: changeMode,
    changeRoute: changeRoute,
    setHeader: setHeader,
    setPartialHeader: setPartialHeader,
    clearHeader: clearHeader,
    confirm: _confirm2.default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJFbXB0eSIsImRpc3BsYXlOYW1lIiwiY2hhbmdlTW9kZSIsIm5ld01vZGUiLCJwcmV2aW91c01vZGUiLCJtb2RlIiwiZGlzcGF0Y2hlciIsImhhbmRsZVZpZXdBY3Rpb24iLCJkYXRhIiwidHlwZSIsImNoYW5nZVJvdXRlIiwibmV3Um91dGUiLCJyb3V0ZSIsInNldEhlYWRlciIsImNhcnRyaWRnZSIsInN1bW1hcnkiLCJhY3Rpb25zIiwiYmFyTGVmdCIsImNhbkRlcGxveSIsImJhclJpZ2h0IiwiRW1wdHlDb21wb25lbnQiLCJjYXJ0cmlkZ2VDb21wb25lbnQiLCJjb21wb25lbnQiLCJzdW1tYXJ5Q29tcG9uZW50IiwicHJpbWFyeSIsInNlY29uZGFyeSIsImJhckNvbnRlbnRMZWZ0Q29tcG9uZW50IiwiYmFyQ29udGVudFJpZ2h0Q29tcG9uZW50Iiwic2V0UGFydGlhbEhlYWRlciIsImNsZWFySGVhZGVyIiwicmVuZGVyIiwiYnVpbHRJblN0b3JlIiwiYWN0aW9uQnVpbGRlciIsImNsZWFyIiwibW91bnRlZENvbXBvbmVudHMiLCJjb25maXJtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBLElBQU1BLFFBQVEsU0FBUkEsS0FBUTtBQUFBLFdBQVMsdUNBQUssY0FBVyxPQUFoQixHQUFUO0FBQUEsQ0FBZDtBQUNBQSxNQUFNQyxXQUFOLEdBQW9CLE9BQXBCOztBQUVBOzs7OztBQUtBLElBQU1DLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxPQUFELEVBQVVDLFlBQVYsRUFBMkI7QUFDMUMsUUFBTUMsT0FBTyxFQUFFRixTQUFTQSxPQUFYLEVBQW9CQyxjQUFjQSxZQUFsQyxFQUFiO0FBQ0FFLHlCQUFXQyxnQkFBWCxDQUE0QixFQUFFQyxNQUFNLEVBQUVILE1BQU1BLElBQVIs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OztRQWNJcUIsTSxHQUFBQSxnQjtRQUNBQyxZLEdBQUFBLHNCO1FBQ0FDLGEsR0FBQUEsdUI7UUFDQUMsSyxHQUFBQSxlO1FBQ0FDLGlCLEdBQUFBLDJCO1FBQ0FoQyxVLEdBQUFBLFU7UUFDQVEsVyxHQUFBQSxXO1FBQ0FHLFMsR0FBQUEsUztRQUNBZSxnQixHQUFBQSxnQjtRQUNBQyxXLEdBQUFBLFc7UUFDQU0sTyxHQUFBQSxpQjtrQkFHVztBQUNYTCw0QkFEVztBQUVYQyx3Q0FGVztBQUdYQywwQ0FIVztBQUlYQywwQkFKVztBQUtYQyxrREFMVztBQU1YaEMsMEJBTlc7QUFPWFEsNEJBUFc7QUFRWEcsd0JBUlc7QUFTWGUsc0NBVFc7QUFVWEMsNEJBVlc7QUFXWE07QUFYVyxDIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBkaXNwYXRjaGVyIGZyb20gJy4uL2Rpc3BhdGNoZXInO1xyXG5pbXBvcnQgaXNVbmRlZmluZWQgZnJvbSAnbG9kYXNoL2xhbmcvaXNVbmRlZmluZWQnO1xyXG5pbXBvcnQgY29uZmlybSBmcm9tICcuL2NvbmZpcm0nO1xyXG5cclxuaW1wb3J0IHJlbmRlciBmcm9tICcuL3JlbmRlcic7XHJcbmltcG9ydCBidWlsdEluU3RvcmUgZnJvbSAnLi9idWlsdC1pbi1zdG9yZSc7XHJcbmltcG9ydCBhY3Rpb25CdWlsZGVyIGZyb20gJy4vYWN0aW9uLWJ1aWxkZXInO1xyXG5pbXBvcnQgbW91bnRlZENvbXBvbmVudHMgZnJvbSAnLi9tb3VudGVkLWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgY2xlYXIgZnJvbSAnLi9jbGVhcic7XHJcblxyXG4vL0VtcHR5IGNvbXBvZW5udC5cclxuY29uc3QgRW1wdHkgPSBwcm9wcyA9PiA8ZGl2IGRhdGEtZm9jdXM9J2VtcHR5JyAvPjtcclxuRW1wdHkuZGlzcGxheU5hbWUgPSAnRW1wdHknO1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZSBhcHBsaWNhdGlvbiBtb2RlLlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG5ld01vZGUgICAgICAtIE5ldyBhcHBsaWNhdGlvbiBtb2RlLlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHByZXZpb3VzTW9kZSAtIFByZXZpb3VzIG1vZGUuXHJcbiAqL1xyXG5jb25zdCBjaGFuZ2VNb2RlID0gKG5ld01vZGUsIHByZXZpb3VzTW9kZSkgPT4ge1xyXG4gICAgY29uc3QgbW9kZSA9IHsgbmV3TW9kZTogbmV3TW9kZSwgcHJldmlvdXNNb2RlOiBwcmV2aW91c01vZGUgfTtcclxuICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7IGRhdGE6IHsgbW9kZTogbW9kZSB9LCB0eXBlOiAndXBkYXRlJyB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gICAgKiBDaGFuZ2UgYXBwbGljYXRpb24gcm91dGUgKG1heWJlIG5vdCB0aGUgd29sZSByb3V0ZSBidXQgYSByb3V0ZSdzIGdyb3VwLilcclxuICAgICogQHBhcmFtICB7c3RyaW5nfSBuZXdSb3V0ZSAtIG5ldyByb3V0ZSBuYW1lLlxyXG4gICAgKi9cclxuY29uc3QgY2hhbmdlUm91dGUgPSAobmV3Um91dGUpID0+IHtcclxuICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7IGRhdGE6IHsgcm91dGU6IG5ld1JvdXRlIH0sIHR5cGU6ICd1cGRhdGUnIH0pO1xyXG59O1xyXG4vKipcclxuICogU2V0IGNvbXBvbmVudCB0byBhcHBsaWNhdGlvbidzIGhlYWRlci5cclxuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2FydHJpZGdlICAgICBjb21wb25lbnQgaW5qZWN0ZWQgaW4gdGhlIGNhcnRyaWRnZVxyXG4gKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBzdW1tYXJ5ICAgICAgIGNvbXBvbmVudCBpbmplY3RlZCBpbiB0aGUgc3VtbWFyeSBiYXJcclxuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gYWN0aW9ucyAgICAgICBhcnJheXMgb2YgY2FydHJpZGdlIGFjdGlvbnNcclxuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gYmFyTGVmdCAgICAgICBjb21wb25lbnQgaW5qZWN0ZWQgaW4gdGhlIGxlZnQgYmFyXHJcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNhbkRlcGxveSAgICAgaW5kaWNhdGVzIHdldGhlciB0aGUgY2FydHJpZGdlIGNhbiBkZXBsb3kgb3Igbm90XHJcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGJhclJpZ2h0ICAgICAgY29tcG9uZW50IGluamVjdGVkIGluIHRoZSByaWdodCBiYXJcclxuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gRW1wdHlDb21wb25lbnQgRW1wdHkgY29tcG9uZW50XHJcbiAqL1xyXG5jb25zdCBzZXRIZWFkZXIgPSAoeyBjYXJ0cmlkZ2UsIHN1bW1hcnksIGFjdGlvbnMsIGJhckxlZnQsIGNhbkRlcGxveSwgYmFyUmlnaHQsIEVtcHR5Q29tcG9uZW50ID0gRW1wdHkgfSkgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICBjYXJ0cmlkZ2VDb21wb25lbnQ6IGNhcnRyaWRnZSB8fCB7IGNvbXBvbmVudDogRW1wdHlDb21wb25lbnQgfSxcclxuICAgICAgICBzdW1tYXJ5Q29tcG9uZW50OiBzdW1tYXJ5IHx8IHsgY29tcG9uZW50OiBFbXB0eUNvbXBvbmVudCB9LFxyXG4gICAgICAgIGFjdGlvbnM6IGFjdGlvbnMgfHwgeyBwcmltYXJ5OiBbXSwgc2Vjb25kYXJ5OiBbXSB9LFxyXG4gICAgICAgIGJhckNvbnRlbnRMZWZ0Q29tcG9uZW50OiBiYXJMZWZ0IHx8IHsgY29tcG9uZW50OiBFbXB0eUNvbXBvbmVudCB9LFxyXG4gICAgICAgIGNhbkRlcGxveTogaXNVbmRlZmluZWQoY2FuRGVwbG95KSA/IHRydWUgOiBjYW5EZXBsb3lcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGJhclJpZ2h0KSB7XHJcbiAgICAgICAgZGF0YS5iYXJDb250ZW50UmlnaHRDb21wb25lbnQgPSBiYXJSaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oeyBkYXRhLCB0eXBlOiAndXBkYXRlJyB9KTtcclxufTtcclxuLyoqXHJcbiAqIFNldCBjb21wb25lbnQgdG8gYXBwbGljYXRpb24ncyBoZWFkZXIgd2l0aCBvbmx5IHRoZSBjb21wb25lbnQgZ2l2ZWQgaW4gcGFyYW1ldGVyLlxyXG4gKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjYXJ0cmlkZ2UgICAgIGNvbXBvbmVudCBpbmplY3RlZCBpbiB0aGUgY2FydHJpZGdlXHJcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IHN1bW1hcnkgICAgICAgY29tcG9uZW50IGluamVjdGVkIGluIHRoZSBzdW1tYXJ5IGJhclxyXG4gKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBhY3Rpb25zICAgICAgIGFycmF5cyBvZiBjYXJ0cmlkZ2UgYWN0aW9uc1xyXG4gKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBiYXJMZWZ0ICAgICAgIGNvbXBvbmVudCBpbmplY3RlZCBpbiB0aGUgbGVmdCBiYXJcclxuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2FuRGVwbG95ICAgICBpbmRpY2F0ZXMgd2V0aGVyIHRoZSBjYXJ0cmlkZ2UgY2FuIGRlcGxveSBvciBub3RcclxuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gYmFyUmlnaHQgICAgICBjb21wb25lbnQgaW5qZWN0ZWQgaW4gdGhlIHJpZ2h0IGJhclxyXG4gKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBFbXB0eUNvbXBvbmVudCBFbXB0eSBjb21wb25lbnRcclxuICovXHJcbmNvbnN0IHNldFBhcnRpYWxIZWFkZXIgPSAoeyBjYXJ0cmlkZ2UsIHN1bW1hcnksIGFjdGlvbnMsIGJhckxlZnQsIGJhclJpZ2h0LCBjYW5EZXBsb3kgfSkgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICBjYW5EZXBsb3k6IGlzVW5kZWZpbmVkKGNhbkRlcGxveSkgPyB0cnVlIDogY2FuRGVwbG95XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChjYXJ0cmlkZ2UpIHtcclxuICAgICAgICBkYXRhLmNhcnRyaWRnZUNvbXBvbmVudCA9IGNhcnRyaWRnZTtcclxuICAgIH1cclxuICAgIGlmIChzdW1tYXJ5KSB7XHJcbiAgICAgICAgZGF0YS5zdW1tYXJ5Q29tcG9uZW50ID0gc3VtbWFyeTtcclxuICAgIH1cclxuICAgIGlmIChhY3Rpb25zKSB7XHJcbiAgICAgICAgZGF0YS5hY3Rpb25zID0gYWN0aW9ucztcclxuICAgIH1cclxuICAgIGlmIChiYXJMZWZ0KSB7XHJcbiAgICAgICAgZGF0YS5iYXJDb250ZW50TGVmdENvbXBvbmVudCA9IGJhckxlZnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoYmFyUmlnaHQpIHtcclxuICAgICAgICBkYXRhLmJhckNvbnRlbnRSaWdodENvbXBvbmVudCA9IGJhclJpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7IGRhdGEsIHR5cGU6ICd1cGRhdGUnIH0pO1xyXG59O1xyXG4vKipcclxuICogQ2xlYXIgdGhlIGFwcGxpY2F0aW9uJ3MgaGVhZGVyLlxyXG4gKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cclxuICovXHJcbmNvbnN0IGNsZWFySGVhZGVyID0gKCkgPT4ge1xyXG4gICAgZGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGNhcnRyaWRnZUNvbXBvbmVudDogeyBjb21wb25lbnQ6IEVtcHR5IH0sXHJcbiAgICAgICAgICAgIGJhckNvbnRlbnRMZWZ0Q29tcG9uZW50OiB7IGNvbXBvbmVudDogRW1wdHkgfSxcclxuICAgICAgICAgICAgc3VtbWFyeUNvbXBvbmVudDogeyBjb21wb25lbnQ6IEVtcHR5IH0sXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IHsgcHJpbWFyeTogW10sIHNlY29uZGFyeTogW10gfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZTogJ3VwZGF0ZSdcclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICByZW5kZXIsXHJcbiAgICBidWlsdEluU3RvcmUsXHJcbiAgICBhY3Rpb25CdWlsZGVyLFxyXG4gICAgY2xlYXIsXHJcbiAgICBtb3VudGVkQ29tcG9uZW50cyxcclxuICAgIGNoYW5nZU1vZGUsXHJcbiAgICBjaGFuZ2VSb3V0ZSxcclxuICAgIHNldEhlYWRlcixcclxuICAgIHNldFBhcnRpYWxIZWFkZXIsXHJcbiAgICBjbGVhckhlYWRlcixcclxuICAgIGNvbmZpcm1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHJlbmRlcixcclxuICAgIGJ1aWx0SW5TdG9yZSxcclxuICAgIGFjdGlvbkJ1aWxkZXIsXHJcbiAgICBjbGVhcixcclxuICAgIG1vdW50ZWRDb21wb25lbnRzLFxyXG4gICAgY2hhbmdlTW9kZSxcclxuICAgIGNoYW5nZVJvdXRlLFxyXG4gICAgc2V0SGVhZGVyLFxyXG4gICAgc2V0UGFydGlhbEhlYWRlcixcclxuICAgIGNsZWFySGVhZGVyLFxyXG4gICAgY29uZmlybVxyXG59O1xyXG4iXX0=