'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clearComponent;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mountedComponents = require('./mounted-components');

var _mountedComponents2 = _interopRequireDefault(_mountedComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Clear a react component.
* @param {String} targetSelector - the component's DOM selector
*/
function clearComponent(targetSelector) {
    if (_mountedComponents2.default[targetSelector]) {
        _reactDom2.default.unmountComponentAtNode(document.querySelector(targetSelector));
        delete _mountedComponents2.default[targetSelector];
        console.info('Component ' + targetSelector + ' unmounted.');
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJjbGVhckNvbXBvbmVudCIsInRhcmdldFNlbGVjdG9yIiwibW91bnRlZENvbXBvbmVudHMiLCJSZWFjdERPTSIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb25zb2xlIiwiaW5mbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBT3dCQSxjOztBQVB4Qjs7OztBQUNBOzs7Ozs7QUFFQTs7OztBQUllLFNBQVNBLGNBQVQsQ0FBd0JDLGNBQXhCLEVBQXdDO0FBQ25ELFFBQUlDLDRCQUFrQkQsY0FBbEIsQ0FBSixFQUF1QztBQUNuQ0UsMkJBQVNDLHNCQUFULENBQWdDQyxTQUFTQyxhQUFULENBQXVCTCxjQUF2QixDQUFoQztBQUNBLGVBQU9DLDRCQUFrQkQsY0FBbEIsQ0FBUDtBQUNBTSxnQkFBUUMsSUFBUixDQUFhLGVBQWVQLGNBQWYsR0FBZ0MsYUFBN0M7QUFDSDtBQUNKIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgbW91bnRlZENvbXBvbmVudHMgZnJvbSAnLi9tb3VudGVkLWNvbXBvbmVudHMnO1xyXG5cclxuLyoqXHJcbiogQ2xlYXIgYSByZWFjdCBjb21wb25lbnQuXHJcbiogQHBhcmFtIHtTdHJpbmd9IHRhcmdldFNlbGVjdG9yIC0gdGhlIGNvbXBvbmVudCdzIERPTSBzZWxlY3RvclxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbGVhckNvbXBvbmVudCh0YXJnZXRTZWxlY3Rvcikge1xyXG4gICAgaWYgKG1vdW50ZWRDb21wb25lbnRzW3RhcmdldFNlbGVjdG9yXSkge1xyXG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRTZWxlY3RvcikpO1xyXG4gICAgICAgIGRlbGV0ZSBtb3VudGVkQ29tcG9uZW50c1t0YXJnZXRTZWxlY3Rvcl07XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdDb21wb25lbnQgJyArIHRhcmdldFNlbGVjdG9yICsgJyB1bm1vdW50ZWQuJyk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==