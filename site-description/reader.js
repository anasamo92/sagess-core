'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _exception = require('../exception');

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isFunction = require('lodash/lang/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isEqual = require('lodash/lang/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _clone = require('lodash/lang/clone');

var _clone2 = _interopRequireDefault(_clone);

var _contains = require('lodash/collection/contains');

var _contains2 = _interopRequireDefault(_contains);

var _intersection = require('lodash/array/intersection');

var _intersection2 = _interopRequireDefault(_intersection);

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Module page.
var siteDescriptionStructure = void 0,
    siteDescriptionParams = void 0,
    isProcess = false;

//Get the site process
var getSite = function getSite() {
    isProcess = true;
    if (!(0, _isFunction2.default)(siteDescriptionStructure)) {
        console.warn('You are trying to call getSite before it was correctly initialized...');
    }
    return siteDescriptionStructure(siteDescriptionParams);
};

//Define the application site description.
//The siteDescription must be a function which return an object with the following structure:
// `{headers: [{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: [[{name: "NameOfTheModule", url: "#nameOftheModule/:param, roles:['CHIEF', 'MASTER']", headers: []}]]}]}`
var defineSite = function defineSite(siteDescription) {
    if (!(0, _isObject2.default)(siteDescription)) {
        throw new _exception.ArgumentNullException('SiteDescription must be an object', siteDescription);
    }
    if (!(0, _isObject2.default)(siteDescription.params)) {
        throw new _exception.ArgumentNullException('SiteDescription.params must be an object', siteDescription);
    }
    if (!(0, _isFunction2.default)(siteDescription.value)) {
        throw new _exception.ArgumentNullException('SiteDescription.value must be a function', siteDescription);
    }
    siteDescriptionParams = siteDescription.params || {};
    siteDescriptionStructure = siteDescription.value;
    return getSite();
};

//param must be a {name: 'paramName', value: 'paramValue'} object.
var defineParam = function defineParamSiteDescriptionHelper(param) {
    if (param === undefined) {
        throw new _exception.ArgumentNullException('You cannot set an undefined param.', param);
    }
    //console.log("Debug", param.name, siteDescriptionParams,siteDescriptionParams['codePays']);
    if (siteDescriptionParams[param.name] === undefined) {
        throw new _exception.ArgumentNullException('The parameter you try to define has not been anticipated by the siteDescription', {
            param: param,
            siteParams: siteDescriptionParams
        });
    }
    if (siteDescriptionParams[param.name].value === param.value && (0, _isEqual2.default)(siteDescriptionParams[param.name].title, param.title)) {
        console.info('No changes on param', param);
        return false;
    }
    siteDescriptionParams[param.name] = {
        value: param.value,
        title: param.title,
        isDefine: true
    };
    isProcess = false;
    return true;
};

//Check if the params is define in the params list.
var checkParams = function checkParams(paramsArray) {
    if (typeof paramsArray === 'undefined') {
        return true;
    }
    if ((0, _isArray2.default)(paramsArray)) {
        throw new _exception.ArgumentInvalidException('The paramsArray must be an array');
    }
    if ((0, _intersection2.default)((0, _keys2.default)(siteDescriptionParams), paramsArray).length !== paramsArray.length) {
        return false;
    }
    for (var prop in siteDescriptionParams) {
        if ((0, _contains2.default)(paramsArray, prop) && !siteDescriptionParams[prop].isDefine) {
            return false;
        }
    }
    return true;
};

var siteDescriptionHelper = {
    defineSite: defineSite,
    defineParam: defineParam,
    getSite: getSite,
    getParams: function getParams() {
        return (0, _clone2.default)(siteDescriptionParams);
    },
    checkParams: checkParams,
    isProcessed: function isProcessed() {
        return isProcess;
    }
};

exports.default = siteDescriptionHelper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJzaXRlRGVzY3JpcHRpb25TdHJ1Y3R1cmUiLCJzaXRlRGVzY3JpcHRpb25QYXJhbXMiLCJpc1Byb2Nlc3MiLCJnZXRTaXRlIiwiY29uc29sZSIsIndhcm4iLCJkZWZpbmVTaXRlIiwic2l0ZURlc2NyaXB0aW9uIiwiQXJndW1lbnROdWxsRXhjZXB0aW9uIiwicGFyYW1zIiwidmFsdWUiLCJkZWZpbmVQYXJhbSIsImRlZmluZVBhcmFtU2l0ZURlc2NyaXB0aW9uSGVscGVyIiwicGFyYW0iLCJ1bmRlZmluZWQiLCJuYW1lIiwic2l0ZVBhcmFtcyIsInRpdGxlIiwiaW5mbyIsImlzRGVmaW5lIiwiY2hlY2tQYXJhbXMiLCJwYXJhbXNBcnJheSIsIkFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbiIsImxlbmd0aCIsInByb3AiLCJzaXRlRGVzY3JpcHRpb25IZWxwZXIiLCJnZXRQYXJhbXMiLCJpc1Byb2Nlc3NlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJQUFJQSxpQ0FBSjtBQUFBLElBQ0lDLDhCQURKO0FBQUEsSUFFSUMsWUFBWSxLQUZoQjs7QUFJQTtBQUNBLElBQUlDLFVBQVUsU0FBU0EsT0FBVCxHQUFtQjtBQUM3QkQsZ0JBQVksSUFBWjtBQUNBLFFBQUksQ0FBQywwQkFBV0Ysd0JBQVgsQ0FBTCxFQUEyQztBQUN2Q0ksZ0JBQVFDLElBQVIsQ0FBYSx1RUFBYjtBQUNIO0FBQ0QsV0FBT0wseUJBQXlCQyxxQkFBekIsQ0FBUDtBQUNILENBTkQ7O0FBUUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUssYUFBYSxTQUFTQSxVQUFULENBQW9CQyxlQUFwQixFQUFxQztBQUNsRCxRQUFJLENBQUMsd0JBQVNBLGVBQVQsQ0FBTCxFQUFnQztBQUM1QixjQUFNLElBQUlDLGdDQUFKLENBQTBCLG1DQUExQixFQUErREQsZUFBL0QsQ0FBTjtBQUNIO0FBQ0QsUUFBSSxDQUFDLHdCQUFTQSxnQkFBZ0JFLE1BQXpCLENBQUwsRUFBdUM7QUFDbkMsY0FBTSxJQUFJRCxnQ0FBSixDQUEwQiwwQ0FBMUIsRUFBc0VELGVBQXRFLENBQU47QUFDSDtBQUNELFFBQUksQ0FBQywwQkFBV0EsZ0JBQWdCRyxLQUEzQixDQUFMLEVBQXdDO0FBQ3BDLGNBQU0sSUFBSUYsZ0NBQUosQ0FBMEIsMENBQTFCLEVBQXNFRCxlQUF0RSxDQUFOO0FBQ0g7QUFDRE4sNEJBQXdCTSxnQkFBZ0JFLE1BQWhCLElBQTBCLEVBQWxEO0FBQ0FULCtCQUEyQk8sZ0JBQWdCRyxLQUEzQztBQUNBLFdBQU9QLFNBQVA7QUFDSCxDQWJEOztBQWVBO0FBQ0EsSUFBSVEsY0FBYyxTQUFTQyxnQ0FBVCxDQUEwQ0MsS0FBMUMsRUFBaUQ7QUFDL0QsUUFBSUEsVUFBVUMsU0FBZCxFQUF5QjtBQUNyQixjQUFNLElBQUlOLGdDQUFKLENBQTBCLG9DQUExQixFQUFnRUssS0FBaEUsQ0FBTjtBQUNIO0FBQ0Q7QUFDQSxRQUFJWixzQkFBc0JZLE1BQU1FLElBQTVCLE1BQXNDRCxTQUExQyxFQUFxRDtBQUNqRCxjQUFNLElBQUlOLGdDQUFKLENBQTBCLGlGQUExQixFQUE2RztBQUMvR0ssbUJBQU9BLEtBRHdHO0FBRS9HRyx3QkFBWWY7QUFGbUcsU0FBN0csQ0FBTjtBQUlIO0FBQ0QsUUFBSUEsc0JBQXNCWSxNQUFNRSxJQUE1QixFQUFrQ0wsS0FBbEMsS0FBNENHLE1BQU1ILEtBQWxELElBQTJELHVCQUFRVCxzQkFBc0JZLE1BQU1FLElBQTVCLEVBQWtDRSxLQUExQyxFQUFpREosTUFBTUksS0FBdkQsQ0FBL0QsRUFBOEg7QUFDMUhiLGdCQUFRYyxJQUFSLENBQWEscUJBQWIsRUFBb0NMLEtBQXBDO0FBQ0EsZUFBTyxLQUFQO0FBQ0g7QUFDRFosMEJBQXNCWSxNQUFNRSxJQUE1QixJQUFvQztBQUNoQ0wsZUFBT0csTUFBTUgsS0FEbUI7QUFFaENPLGVBQU9KLE1BQU1JLEtBRm1CO0FBR2hDRSxrQkFBVTtBQUhzQixLQUFwQztBQUtBakIsZ0JBQVksS0FBWjtBQUNBLFdBQU8sSUFBUDtBQUNILENBdEJEOztBQXdCQTtBQUNBLElBQUlrQixjQUFjLFNBQVNBLFdBQVQsQ0FBcUJDLFdBQXJCLEVBQWtDO0FBQ2hELFFBQUksT0FBT0EsV0FBUCxLQUF1QixXQUEzQixFQUF3QztBQUNwQyxlQUFPLElBQVA7QUFDSDtBQUNELFFBQUksdUJBQVFBLFdBQVIsQ0FBSixFQUEwQjtBQUN0QixjQUFNLElBQUlDLG1DQUFKLENBQTZCLGtDQUE3QixDQUFOO0FBQ0g7QUFDRCxRQUFJLDRCQUFhLG9CQUFLckIscUJBQUwsQ0FBYixFQUEwQ29CLFdBQTFDLEVBQXVERSxNQUF2RCxLQUFrRUYsWUFBWUUsTUFBbEYsRUFBMEY7QUFDdEYsZUFBTyxLQUFQO0FBQ0g7QUFDRCxTQUFLLElBQUlDLElBQVQsSUFBaUJ2QixxQkFBakIsRUFBd0M7QUFDcEMsWUFBSSx3QkFBU29CLFdBQVQsRUFBc0JHLElBQXRCLEtBQStCLENBQUN2QixzQkFBc0J1QixJQUF0QixFQUE0QkwsUUFBaEUsRUFBMEU7QUFDdEUsbUJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFDRCxXQUFPLElBQVA7QUFDSCxDQWhCRDs7QUFrQkEsSUFBSU0sd0JBQXdCO0FBQ3hCbkIsZ0JBQVlBLFVBRFk7QUFFeEJLLGlCQUFhQSxXQUZXO0FBR3hCUixhQUFTQSxPQUhlO0FBSXhCdUIsZUFBVyxxQkFBWTtBQUNuQixlQUFPLHFCQUFNekIscUJBQU4sQ0FBUDtBQUNILEtBTnVCO0FBT3hCbUIsaUJBQWFBLFdBUFc7QUFReEJPLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDaEMsZUFBT3pCLFNBQVA7QUFDSDtBQVZ1QixDQUE1Qjs7a0JBYWV1QixxQiIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcmd1bWVudE51bGxFeGNlcHRpb24sIEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbiB9IGZyb20gJy4uL2V4Y2VwdGlvbic7XHJcblxyXG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2xhbmcvaXNPYmplY3QnO1xyXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdsb2Rhc2gvbGFuZy9pc0Z1bmN0aW9uJztcclxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoL2xhbmcvaXNBcnJheSc7XHJcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2xvZGFzaC9sYW5nL2lzRXF1YWwnO1xyXG5pbXBvcnQgY2xvbmUgZnJvbSAnbG9kYXNoL2xhbmcvY2xvbmUnO1xyXG5cclxuXHJcbmltcG9ydCBjb250YWlucyBmcm9tICdsb2Rhc2gvY29sbGVjdGlvbi9jb250YWlucyc7XHJcbmltcG9ydCBpbnRlcnNlY3Rpb24gZnJvbSAnbG9kYXNoL2FycmF5L2ludGVyc2VjdGlvbic7XHJcbmltcG9ydCBrZXlzIGZyb20gJ2xvZGFzaC9vYmplY3Qva2V5cyc7XHJcblxyXG4vL01vZHVsZSBwYWdlLlxyXG5sZXQgc2l0ZURlc2NyaXB0aW9uU3RydWN0dXJlLFxyXG4gICAgc2l0ZURlc2NyaXB0aW9uUGFyYW1zLFxyXG4gICAgaXNQcm9jZXNzID0gZmFsc2U7XHJcblxyXG4vL0dldCB0aGUgc2l0ZSBwcm9jZXNzXHJcbmxldCBnZXRTaXRlID0gZnVuY3Rpb24gZ2V0U2l0ZSgpIHtcclxuICAgIGlzUHJvY2VzcyA9IHRydWU7XHJcbiAgICBpZiAoIWlzRnVuY3Rpb24oc2l0ZURlc2NyaXB0aW9uU3RydWN0dXJlKSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignWW91IGFyZSB0cnlpbmcgdG8gY2FsbCBnZXRTaXRlIGJlZm9yZSBpdCB3YXMgY29ycmVjdGx5IGluaXRpYWxpemVkLi4uJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2l0ZURlc2NyaXB0aW9uU3RydWN0dXJlKHNpdGVEZXNjcmlwdGlvblBhcmFtcyk7XHJcbn07XHJcblxyXG4vL0RlZmluZSB0aGUgYXBwbGljYXRpb24gc2l0ZSBkZXNjcmlwdGlvbi5cclxuLy9UaGUgc2l0ZURlc2NyaXB0aW9uIG11c3QgYmUgYSBmdW5jdGlvbiB3aGljaCByZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmU6XHJcbi8vIGB7aGVhZGVyczogW3tuYW1lOiBcIk5hbWVPZlRoZU1vZHVsZVwiLCB1cmw6IFwiI25hbWVPZnRoZU1vZHVsZS86cGFyYW0sIHJvbGVzOlsnQ0hJRUYnLCAnTUFTVEVSJ11cIiwgaGVhZGVyczogW1t7bmFtZTogXCJOYW1lT2ZUaGVNb2R1bGVcIiwgdXJsOiBcIiNuYW1lT2Z0aGVNb2R1bGUvOnBhcmFtLCByb2xlczpbJ0NISUVGJywgJ01BU1RFUiddXCIsIGhlYWRlcnM6IFtdfV1dfV19YFxyXG5sZXQgZGVmaW5lU2l0ZSA9IGZ1bmN0aW9uIGRlZmluZVNpdGUoc2l0ZURlc2NyaXB0aW9uKSB7XHJcbiAgICBpZiAoIWlzT2JqZWN0KHNpdGVEZXNjcmlwdGlvbikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdTaXRlRGVzY3JpcHRpb24gbXVzdCBiZSBhbiBvYmplY3QnLCBzaXRlRGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc09iamVjdChzaXRlRGVzY3JpcHRpb24ucGFyYW1zKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ1NpdGVEZXNjcmlwdGlvbi5wYXJhbXMgbXVzdCBiZSBhbiBvYmplY3QnLCBzaXRlRGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc0Z1bmN0aW9uKHNpdGVEZXNjcmlwdGlvbi52YWx1ZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdTaXRlRGVzY3JpcHRpb24udmFsdWUgbXVzdCBiZSBhIGZ1bmN0aW9uJywgc2l0ZURlc2NyaXB0aW9uKTtcclxuICAgIH1cclxuICAgIHNpdGVEZXNjcmlwdGlvblBhcmFtcyA9IHNpdGVEZXNjcmlwdGlvbi5wYXJhbXMgfHwge307XHJcbiAgICBzaXRlRGVzY3JpcHRpb25TdHJ1Y3R1cmUgPSBzaXRlRGVzY3JpcHRpb24udmFsdWU7XHJcbiAgICByZXR1cm4gZ2V0U2l0ZSgpO1xyXG59O1xyXG5cclxuLy9wYXJhbSBtdXN0IGJlIGEge25hbWU6ICdwYXJhbU5hbWUnLCB2YWx1ZTogJ3BhcmFtVmFsdWUnfSBvYmplY3QuXHJcbmxldCBkZWZpbmVQYXJhbSA9IGZ1bmN0aW9uIGRlZmluZVBhcmFtU2l0ZURlc2NyaXB0aW9uSGVscGVyKHBhcmFtKSB7XHJcbiAgICBpZiAocGFyYW0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oJ1lvdSBjYW5ub3Qgc2V0IGFuIHVuZGVmaW5lZCBwYXJhbS4nLCBwYXJhbSk7XHJcbiAgICB9XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiRGVidWdcIiwgcGFyYW0ubmFtZSwgc2l0ZURlc2NyaXB0aW9uUGFyYW1zLHNpdGVEZXNjcmlwdGlvblBhcmFtc1snY29kZVBheXMnXSk7XHJcbiAgICBpZiAoc2l0ZURlc2NyaXB0aW9uUGFyYW1zW3BhcmFtLm5hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCdUaGUgcGFyYW1ldGVyIHlvdSB0cnkgdG8gZGVmaW5lIGhhcyBub3QgYmVlbiBhbnRpY2lwYXRlZCBieSB0aGUgc2l0ZURlc2NyaXB0aW9uJywge1xyXG4gICAgICAgICAgICBwYXJhbTogcGFyYW0sXHJcbiAgICAgICAgICAgIHNpdGVQYXJhbXM6IHNpdGVEZXNjcmlwdGlvblBhcmFtc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHNpdGVEZXNjcmlwdGlvblBhcmFtc1twYXJhbS5uYW1lXS52YWx1ZSA9PT0gcGFyYW0udmFsdWUgJiYgaXNFcXVhbChzaXRlRGVzY3JpcHRpb25QYXJhbXNbcGFyYW0ubmFtZV0udGl0bGUsIHBhcmFtLnRpdGxlKSkge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnTm8gY2hhbmdlcyBvbiBwYXJhbScsIHBhcmFtKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzaXRlRGVzY3JpcHRpb25QYXJhbXNbcGFyYW0ubmFtZV0gPSB7XHJcbiAgICAgICAgdmFsdWU6IHBhcmFtLnZhbHVlLFxyXG4gICAgICAgIHRpdGxlOiBwYXJhbS50aXRsZSxcclxuICAgICAgICBpc0RlZmluZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIGlzUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vL0NoZWNrIGlmIHRoZSBwYXJhbXMgaXMgZGVmaW5lIGluIHRoZSBwYXJhbXMgbGlzdC5cclxubGV0IGNoZWNrUGFyYW1zID0gZnVuY3Rpb24gY2hlY2tQYXJhbXMocGFyYW1zQXJyYXkpIHtcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zQXJyYXkgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNBcnJheShwYXJhbXNBcnJheSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRJbnZhbGlkRXhjZXB0aW9uKCdUaGUgcGFyYW1zQXJyYXkgbXVzdCBiZSBhbiBhcnJheScpO1xyXG4gICAgfVxyXG4gICAgaWYgKGludGVyc2VjdGlvbihrZXlzKHNpdGVEZXNjcmlwdGlvblBhcmFtcyksIHBhcmFtc0FycmF5KS5sZW5ndGggIT09IHBhcmFtc0FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IHByb3AgaW4gc2l0ZURlc2NyaXB0aW9uUGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKGNvbnRhaW5zKHBhcmFtc0FycmF5LCBwcm9wKSAmJiAhc2l0ZURlc2NyaXB0aW9uUGFyYW1zW3Byb3BdLmlzRGVmaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmxldCBzaXRlRGVzY3JpcHRpb25IZWxwZXIgPSB7XHJcbiAgICBkZWZpbmVTaXRlOiBkZWZpbmVTaXRlLFxyXG4gICAgZGVmaW5lUGFyYW06IGRlZmluZVBhcmFtLFxyXG4gICAgZ2V0U2l0ZTogZ2V0U2l0ZSxcclxuICAgIGdldFBhcmFtczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBjbG9uZShzaXRlRGVzY3JpcHRpb25QYXJhbXMpO1xyXG4gICAgfSxcclxuICAgIGNoZWNrUGFyYW1zOiBjaGVja1BhcmFtcyxcclxuICAgIGlzUHJvY2Vzc2VkOiBmdW5jdGlvbiBpc1Byb2Nlc3NlZCgpIHtcclxuICAgICAgICByZXR1cm4gaXNQcm9jZXNzO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2l0ZURlc2NyaXB0aW9uSGVscGVyO1xyXG4iXX0=