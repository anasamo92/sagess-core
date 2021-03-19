'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = dateValidation;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Validate a date.
* @param  {string | date} dateToValidate - The date to validate.
* @param  {object} options   - The validator options.
* @return {boolean} - True if the date is valide , false otherwise.
*/
function dateValidation(dateToValidate, options) {
    return (0, _moment2.default)(dateToValidate, options).isValid();
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJkYXRlVmFsaWRhdGlvbiIsImRhdGVUb1ZhbGlkYXRlIiwib3B0aW9ucyIsImlzVmFsaWQiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQVF3QkEsYzs7QUFSeEI7Ozs7OztBQUVBOzs7Ozs7QUFNZSxTQUFTQSxjQUFULENBQXdCQyxjQUF4QixFQUF3Q0MsT0FBeEMsRUFBaUQ7QUFDNUQsV0FBTyxzQkFBT0QsY0FBUCxFQUF1QkMsT0FBdkIsRUFBZ0NDLE9BQWhDLEVBQVA7QUFDSCIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG4vKipcclxuKiBWYWxpZGF0ZSBhIGRhdGUuXHJcbiogQHBhcmFtICB7c3RyaW5nIHwgZGF0ZX0gZGF0ZVRvVmFsaWRhdGUgLSBUaGUgZGF0ZSB0byB2YWxpZGF0ZS5cclxuKiBAcGFyYW0gIHtvYmplY3R9IG9wdGlvbnMgICAtIFRoZSB2YWxpZGF0b3Igb3B0aW9ucy5cclxuKiBAcmV0dXJuIHtib29sZWFufSAtIFRydWUgaWYgdGhlIGRhdGUgaXMgdmFsaWRlICwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRlVmFsaWRhdGlvbihkYXRlVG9WYWxpZGF0ZSwgb3B0aW9ucykge1xyXG4gICAgcmV0dXJuIG1vbWVudChkYXRlVG9WYWxpZGF0ZSwgb3B0aW9ucykuaXNWYWxpZCgpO1xyXG59Il19