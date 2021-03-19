'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = builder;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Create a component with a mixin except id the component is mixin only.
* @param {object}  mixin - The component mixin.
* @param {Boolean} isMixinOnly - define if the component is a mixin only.
* @return {object} - {component} the built react component.
*/
function createComponent(mixin, isMixinOnly) {
    if (isMixinOnly) {
        return null;
    }
    return { component: _react2.default.createClass(mixin) };
}

/**
* Build a module with a mixin and a React component.
* @param  {object} componentMixin - Mixin of the component.
* @param {boolean} isMixinOnly - Bolean to set .
* @return {object} {mixin: 'the component mixin', component: 'the react instanciated component'}
*/
function builder(componentMixin, isMixinOnly) {
    return (0, _objectAssign2.default)({ mixin: componentMixin }, createComponent(componentMixin, isMixinOnly));
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJidWlsZGVyIiwiY3JlYXRlQ29tcG9uZW50IiwibWl4aW4iLCJpc01peGluT25seSIsImNvbXBvbmVudCIsIlJlYWN0IiwiY3JlYXRlQ2xhc3MiLCJjb21wb25lbnRNaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBc0J3QkEsTzs7QUF0QnhCOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7QUFNQSxTQUFTQyxlQUFULENBQXlCQyxLQUF6QixFQUFnQ0MsV0FBaEMsRUFBNkM7QUFDekMsUUFBSUEsV0FBSixFQUFpQjtBQUNiLGVBQU8sSUFBUDtBQUNIO0FBQ0QsV0FBTyxFQUFFQyxXQUFXQyxnQkFBTUMsV0FBTixDQUFrQkosS0FBbEIsQ0FBYixFQUFQO0FBQ0g7O0FBRUQ7Ozs7OztBQU1lLFNBQVNGLE9BQVQsQ0FBaUJPLGNBQWpCLEVBQWlDSixXQUFqQyxFQUE4QztBQUN6RCxXQUFPLDRCQUNILEVBQUVELE9BQU9LLGNBQVQsRUFERyxFQUVITixnQkFBZ0JNLGNBQWhCLEVBQWdDSixXQUFoQyxDQUZHLENBQVA7QUFJSCIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5cclxuLyoqXHJcbiogQ3JlYXRlIGEgY29tcG9uZW50IHdpdGggYSBtaXhpbiBleGNlcHQgaWQgdGhlIGNvbXBvbmVudCBpcyBtaXhpbiBvbmx5LlxyXG4qIEBwYXJhbSB7b2JqZWN0fSAgbWl4aW4gLSBUaGUgY29tcG9uZW50IG1peGluLlxyXG4qIEBwYXJhbSB7Qm9vbGVhbn0gaXNNaXhpbk9ubHkgLSBkZWZpbmUgaWYgdGhlIGNvbXBvbmVudCBpcyBhIG1peGluIG9ubHkuXHJcbiogQHJldHVybiB7b2JqZWN0fSAtIHtjb21wb25lbnR9IHRoZSBidWlsdCByZWFjdCBjb21wb25lbnQuXHJcbiovXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChtaXhpbiwgaXNNaXhpbk9ubHkpIHtcclxuICAgIGlmIChpc01peGluT25seSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgY29tcG9uZW50OiBSZWFjdC5jcmVhdGVDbGFzcyhtaXhpbikgfTtcclxufVxyXG5cclxuLyoqXHJcbiogQnVpbGQgYSBtb2R1bGUgd2l0aCBhIG1peGluIGFuZCBhIFJlYWN0IGNvbXBvbmVudC5cclxuKiBAcGFyYW0gIHtvYmplY3R9IGNvbXBvbmVudE1peGluIC0gTWl4aW4gb2YgdGhlIGNvbXBvbmVudC5cclxuKiBAcGFyYW0ge2Jvb2xlYW59IGlzTWl4aW5Pbmx5IC0gQm9sZWFuIHRvIHNldCAuXHJcbiogQHJldHVybiB7b2JqZWN0fSB7bWl4aW46ICd0aGUgY29tcG9uZW50IG1peGluJywgY29tcG9uZW50OiAndGhlIHJlYWN0IGluc3RhbmNpYXRlZCBjb21wb25lbnQnfVxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZGVyKGNvbXBvbmVudE1peGluLCBpc01peGluT25seSkge1xyXG4gICAgcmV0dXJuIGFzc2lnbihcclxuICAgICAgICB7IG1peGluOiBjb21wb25lbnRNaXhpbiB9LFxyXG4gICAgICAgIGNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRNaXhpbiwgaXNNaXhpbk9ubHkpXHJcbiAgICApO1xyXG59XHJcbiJdfQ==