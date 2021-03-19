'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = checkDomain;

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _intersection = require('lodash/array/intersection');

var _intersection2 = _interopRequireDefault(_intersection);

var _uniq = require('lodash/array/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _difference = require('lodash/array/difference');

var _difference2 = _interopRequireDefault(_difference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkDomain(entityDef, domains) {
    domains = (0, _keys2.default)(domains);
    var arr = [];
    for (var node in entityDef) {
        for (var sub in entityDef[node]) {
            arr.push(entityDef[node][sub].domain);
        }
    }
    var appDomains = (0, _uniq2.default)(arr);
    console.info('########################## DOMAINS ##############################');
    console.info('Entity definitions domains: ', appDomains);
    console.info('Domains with a definition', domains);
    var missingDomains = (0, _difference2.default)(appDomains, (0, _intersection2.default)(appDomains, domains));
    if (0 < missingDomains.length) {
        console.warn('Missing domain\'s definition', missingDomains);
    }
    var useLessDomains = (0, _difference2.default)(domains, (0, _intersection2.default)(appDomains, domains));
    if (0 < useLessDomains) {
        console.warn('Useless domain definition', useLessDomains);
    }
    console.info('####################################################################');
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJjaGVja0RvbWFpbiIsImVudGl0eURlZiIsImRvbWFpbnMiLCJhcnIiLCJub2RlIiwic3ViIiwicHVzaCIsImRvbWFpbiIsImFwcERvbWFpbnMiLCJjb25zb2xlIiwiaW5mbyIsIm1pc3NpbmdEb21haW5zIiwibGVuZ3RoIiwid2FybiIsInVzZUxlc3NEb21haW5zIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFLd0JBLFc7O0FBTHhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFZSxTQUFTQSxXQUFULENBQXFCQyxTQUFyQixFQUFnQ0MsT0FBaEMsRUFBeUM7QUFDcERBLGNBQVUsb0JBQUtBLE9BQUwsQ0FBVjtBQUNBLFFBQUlDLE1BQU0sRUFBVjtBQUNBLFNBQUssSUFBSUMsSUFBVCxJQUFpQkgsU0FBakIsRUFBNEI7QUFDeEIsYUFBSyxJQUFJSSxHQUFULElBQWdCSixVQUFVRyxJQUFWLENBQWhCLEVBQWlDO0FBQzdCRCxnQkFBSUcsSUFBSixDQUFTTCxVQUFVRyxJQUFWLEVBQWdCQyxHQUFoQixFQUFxQkUsTUFBOUI7QUFDSDtBQUNKO0FBQ0QsUUFBTUMsYUFBYSxvQkFBS0wsR0FBTCxDQUFuQjtBQUNBTSxZQUFRQyxJQUFSLENBQWEsbUVBQWI7QUFDQUQsWUFBUUMsSUFBUixDQUFhLDhCQUFiLEVBQTZDRixVQUE3QztBQUNBQyxZQUFRQyxJQUFSLENBQWEsMkJBQWIsRUFBMENSLE9BQTFDO0FBQ0EsUUFBTVMsaUJBQWlCLDBCQUFXSCxVQUFYLEVBQXVCLDRCQUFhQSxVQUFiLEVBQXlCTixPQUF6QixDQUF2QixDQUF2QjtBQUNBLFFBQUksSUFBSVMsZUFBZUMsTUFBdkIsRUFBK0I7QUFDM0JILGdCQUFRSSxJQUFSLENBQWEsOEJBQWIsRUFBNkNGLGNBQTdDO0FBQ0g7QUFDRCxRQUFNRyxpQkFBaUIsMEJBQVdaLE9BQVgsRUFBb0IsNEJBQWFNLFVBQWIsRUFBeUJOLE9BQXpCLENBQXBCLENBQXZCO0FBQ0EsUUFBSSxJQUFJWSxjQUFSLEVBQXdCO0FBQ3BCTCxnQkFBUUksSUFBUixDQUFhLDJCQUFiLEVBQTBDQyxjQUExQztBQUNIO0FBQ0RMLFlBQVFDLElBQVIsQ0FBYSxzRUFBYjtBQUNIIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrZXlzIGZyb20gJ2xvZGFzaC9vYmplY3Qva2V5cyc7XHJcbmltcG9ydCBpbnRlcnNlY3Rpb24gZnJvbSAnbG9kYXNoL2FycmF5L2ludGVyc2VjdGlvbic7XHJcbmltcG9ydCB1bmlxIGZyb20gJ2xvZGFzaC9hcnJheS91bmlxJztcclxuaW1wb3J0IGRpZmZlcmVuY2UgZnJvbSAnbG9kYXNoL2FycmF5L2RpZmZlcmVuY2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tEb21haW4oZW50aXR5RGVmLCBkb21haW5zKSB7XHJcbiAgICBkb21haW5zID0ga2V5cyhkb21haW5zKTtcclxuICAgIGxldCBhcnIgPSBbXTtcclxuICAgIGZvciAobGV0IG5vZGUgaW4gZW50aXR5RGVmKSB7XHJcbiAgICAgICAgZm9yIChsZXQgc3ViIGluIGVudGl0eURlZltub2RlXSkge1xyXG4gICAgICAgICAgICBhcnIucHVzaChlbnRpdHlEZWZbbm9kZV1bc3ViXS5kb21haW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGFwcERvbWFpbnMgPSB1bmlxKGFycik7XHJcbiAgICBjb25zb2xlLmluZm8oJyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIERPTUFJTlMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJyk7XHJcbiAgICBjb25zb2xlLmluZm8oJ0VudGl0eSBkZWZpbml0aW9ucyBkb21haW5zOiAnLCBhcHBEb21haW5zKTtcclxuICAgIGNvbnNvbGUuaW5mbygnRG9tYWlucyB3aXRoIGEgZGVmaW5pdGlvbicsIGRvbWFpbnMpO1xyXG4gICAgY29uc3QgbWlzc2luZ0RvbWFpbnMgPSBkaWZmZXJlbmNlKGFwcERvbWFpbnMsIGludGVyc2VjdGlvbihhcHBEb21haW5zLCBkb21haW5zKSk7XHJcbiAgICBpZiAoMCA8IG1pc3NpbmdEb21haW5zLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignTWlzc2luZyBkb21haW5cXCdzIGRlZmluaXRpb24nLCBtaXNzaW5nRG9tYWlucyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB1c2VMZXNzRG9tYWlucyA9IGRpZmZlcmVuY2UoZG9tYWlucywgaW50ZXJzZWN0aW9uKGFwcERvbWFpbnMsIGRvbWFpbnMpKTtcclxuICAgIGlmICgwIDwgdXNlTGVzc0RvbWFpbnMpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ1VzZWxlc3MgZG9tYWluIGRlZmluaXRpb24nLCB1c2VMZXNzRG9tYWlucyk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmluZm8oJyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJyk7XHJcbn1cclxuIl19