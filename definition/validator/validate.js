'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _exception = require('../../exception');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _translation = require('../../translation');

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _stringLength = require('./string-length');

var _stringLength2 = _interopRequireDefault(_stringLength);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _isNull = require('lodash/lang/isNull');

var _isNull2 = _interopRequireDefault(_isNull);

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Validae a property given validators.
* @param  {object} property   - Property to validate which should be as follows: `{name: "field_name",value: "field_value", validators: [{...}] }`.
* @param  {array} validators - The validators to apply on the property.
* @return {object} - The validation status.
*/

//Focus validators
function validate(property, validators) {
    //console.log("validate", property, validators);
    var errors = [],
        res = void 0,
        validator = void 0;
    if (validators) {
        for (var i = 0, _len = validators.length; i < _len; i++) {
            validator = validators[i];
            res = validateProperty(property, validator);
            if (!(0, _isNull2.default)(res) && !(0, _isUndefined2.default)(res)) {
                errors.push(res);
            }
        }
    }
    //Check what's the good type to return.
    return {
        name: property.name,
        value: property.value,
        isValid: 0 === errors.length,
        errors: errors
    };
}

/**
* Validate a property.
* @param  {object} property  - The property to validate.
* @param  {function} validator - The validator to apply.
* @return {object} - The property validation status.
*/
//Dependency
function validateProperty(property, validator) {
    var isValid = void 0;
    if (!validator) {
        return void 0;
    }
    if (!property) {
        return void 0;
    }
    var value = property.value;
    var options = validator.options;

    var isValueNullOrUndefined = (0, _isNull2.default)(value) || (0, _isUndefined2.default)(value);
    isValid = function () {
        switch (validator.type) {
            case 'required':
                var prevalidString = '' === property.value ? false : true;
                var prevalidDate = true;
                return true === validator.value ? !(0, _isNull2.default)(value) && !(0, _isUndefined2.default)(value) && prevalidString && prevalidDate : true;
            case 'regex':
                if (isValueNullOrUndefined) {
                    return true;
                }
                return validator.value.test(value);
            case 'email':
                if (isValueNullOrUndefined) {
                    return true;
                }
                return (0, _email2.default)(value, options);
            case 'number':
                return (0, _number2.default)(value, options);
            case 'string':
                var stringToValidate = value || '';
                return (0, _stringLength2.default)(stringToValidate, options);
            case 'date':
                return (0, _date2.default)(value, options);
            case 'function':
                return validator.value(value, options);
            default:
                return void 0;
        }
    }();
    if ((0, _isUndefined2.default)(isValid) || (0, _isNull2.default)(isValid)) {
        console.warn('The validator of type: ' + validator.type + ' is not defined');
    } else if (false === isValid) {
        //Add the name of the property.
        return getErrorLabel(validator.type, property.modelName + '.' + property.name, options); //"The property " + property.name + " is invalid.";
    }
}
/**
 * Get the error label from a type and a field name.
 * @param  {string} type      - The type name.
 * @param  {string} fieldName - The field name.
 * @param  {object} options - The options to put such as the translationKey which could be defined in the domain.
 * @return {string} The formatted error.
 */
function getErrorLabel(type, fieldName) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    options = options || {};
    var translationKey = options.translationKey ? options.translationKey : 'domain.validation.' + type;
    var opts = Object.assign({ fieldName: (0, _translation.translate)(fieldName) }, options);
    return (0, _translation.translate)(translationKey, opts);
}

exports.default = validate;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJ2YWxpZGF0ZSIsInByb3BlcnR5IiwidmFsaWRhdG9ycyIsImVycm9ycyIsInJlcyIsInZhbGlkYXRvciIsImkiLCJfbGVuIiwibGVuZ3RoIiwidmFsaWRhdGVQcm9wZXJ0eSIsInB1c2giLCJuYW1lIiwidmFsdWUiLCJpc1ZhbGlkIiwib3B0aW9ucyIsImlzVmFsdWVOdWxsT3JVbmRlZmluZWQiLCJ0eXBlIiwicHJldmFsaWRTdHJpbmciLCJwcmV2YWxpZERhdGUiLCJ0ZXN0Iiwic3RyaW5nVG9WYWxpZGF0ZSIsImNvbnNvbGUiLCJ3YXJuIiwiZ2V0RXJyb3JMYWJlbCIsIm1vZGVsTmFtZSIsImZpZWxkTmFtZSIsInRyYW5zbGF0aW9uS2V5Iiwib3B0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7O0FBUkE7QUFjQSxTQUFTQSxRQUFULENBQWtCQyxRQUFsQixFQUE0QkMsVUFBNUIsRUFBd0M7QUFDcEM7QUFDQSxRQUFJQyxTQUFTLEVBQWI7QUFBQSxRQUFpQkMsWUFBakI7QUFBQSxRQUFzQkMsa0JBQXRCO0FBQ0EsUUFBSUgsVUFBSixFQUFnQjtBQUNaLGFBQUssSUFBSUksSUFBSSxDQUFSLEVBQVdDLE9BQU9MLFdBQVdNLE1BQWxDLEVBQTBDRixJQUFJQyxJQUE5QyxFQUFvREQsR0FBcEQsRUFBeUQ7QUFDckRELHdCQUFZSCxXQUFXSSxDQUFYLENBQVo7QUFDQUYsa0JBQU1LLGlCQUFpQlIsUUFBakIsRUFBMkJJLFNBQTNCLENBQU47QUFDQSxnQkFBSSxDQUFDLHNCQUFPRCxHQUFQLENBQUQsSUFBZ0IsQ0FBQywyQkFBWUEsR0FBWixDQUFyQixFQUF1QztBQUNuQ0QsdUJBQU9PLElBQVAsQ0FBWU4sR0FBWjtBQUNIO0FBQ0o7QUFDSjtBQUNEO0FBQ0EsV0FBTztBQUNITyxj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ZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RlcGVuZGVuY3lcclxuaW1wb3J0IHsgRGVwZW5kZW5jeUV4Y2VwdGlvbiB9IGZyb20gJy4uLy4uL2V4Y2VwdGlvbic7XHJcbmltcG9ydCBhc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XHJcbmltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJy4uLy4uL3RyYW5zbGF0aW9uJztcclxuLy9Gb2N1cyB2YWxpZGF0b3JzXHJcbmltcG9ydCBlbWFpbFZhbGlkYXRpb24gZnJvbSAnLi9lbWFpbCc7XHJcbmltcG9ydCBudW1iZXJWYWxpZGF0aW9uIGZyb20gJy4vbnVtYmVyJztcclxuaW1wb3J0IHN0cmluZ0xlbmd0aCBmcm9tICcuL3N0cmluZy1sZW5ndGgnO1xyXG5pbXBvcnQgZGF0ZVZhbGlkYXRpb24gZnJvbSAnLi9kYXRlJztcclxuaW1wb3J0IGlzTnVsbCBmcm9tICdsb2Rhc2gvbGFuZy9pc051bGwnO1xyXG5pbXBvcnQgaXNVbmRlZmluZWQgZnJvbSAnbG9kYXNoL2xhbmcvaXNVbmRlZmluZWQnO1xyXG5cclxuLyoqXHJcbiogVmFsaWRhZSBhIHByb3BlcnR5IGdpdmVuIHZhbGlkYXRvcnMuXHJcbiogQHBhcmFtICB7b2JqZWN0fSBwcm9wZXJ0eSAgIC0gUHJvcGVydHkgdG8gdmFsaWRhdGUgd2hpY2ggc2hvdWxkIGJlIGFzIGZvbGxvd3M6IGB7bmFtZTogXCJmaWVsZF9uYW1lXCIsdmFsdWU6IFwiZmllbGRfdmFsdWVcIiwgdmFsaWRhdG9yczogW3suLi59XSB9YC5cclxuKiBAcGFyYW0gIHthcnJheX0gdmFsaWRhdG9ycyAtIFRoZSB2YWxpZGF0b3JzIHRvIGFwcGx5IG9uIHRoZSBwcm9wZXJ0eS5cclxuKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHZhbGlkYXRpb24gc3RhdHVzLlxyXG4qL1xyXG5mdW5jdGlvbiB2YWxpZGF0ZShwcm9wZXJ0eSwgdmFsaWRhdG9ycykge1xyXG4gICAgLy9jb25zb2xlLmxvZyhcInZhbGlkYXRlXCIsIHByb3BlcnR5LCB2YWxpZGF0b3JzKTtcclxuICAgIGxldCBlcnJvcnMgPSBbXSwgcmVzLCB2YWxpZGF0b3I7XHJcbiAgICBpZiAodmFsaWRhdG9ycykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfbGVuID0gdmFsaWRhdG9ycy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgdmFsaWRhdG9yID0gdmFsaWRhdG9yc1tpXTtcclxuICAgICAgICAgICAgcmVzID0gdmFsaWRhdGVQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsaWRhdG9yKTtcclxuICAgICAgICAgICAgaWYgKCFpc051bGwocmVzKSAmJiAhaXNVbmRlZmluZWQocmVzKSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2gocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vQ2hlY2sgd2hhdCdzIHRoZSBnb29kIHR5cGUgdG8gcmV0dXJuLlxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiBwcm9wZXJ0eS5uYW1lLFxyXG4gICAgICAgIHZhbHVlOiBwcm9wZXJ0eS52YWx1ZSxcclxuICAgICAgICBpc1ZhbGlkOiAwID09PSBlcnJvcnMubGVuZ3RoLFxyXG4gICAgICAgIGVycm9yczogZXJyb3JzXHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuKiBWYWxpZGF0ZSBhIHByb3BlcnR5LlxyXG4qIEBwYXJhbSAge29iamVjdH0gcHJvcGVydHkgIC0gVGhlIHByb3BlcnR5IHRvIHZhbGlkYXRlLlxyXG4qIEBwYXJhbSAge2Z1bmN0aW9ufSB2YWxpZGF0b3IgLSBUaGUgdmFsaWRhdG9yIHRvIGFwcGx5LlxyXG4qIEByZXR1cm4ge29iamVjdH0gLSBUaGUgcHJvcGVydHkgdmFsaWRhdGlvbiBzdGF0dXMuXHJcbiovXHJcbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydHkocHJvcGVydHksIHZhbGlkYXRvcikge1xyXG4gICAgbGV0IGlzVmFsaWQ7XHJcbiAgICBpZiAoIXZhbGlkYXRvcikge1xyXG4gICAgICAgIHJldHVybiB2b2lkIDA7XHJcbiAgICB9XHJcbiAgICBpZiAoIXByb3BlcnR5KSB7XHJcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BlcnR5O1xyXG4gICAgY29uc3QgeyBvcHRpb25zIH0gPSB2YWxpZGF0b3I7XHJcbiAgICBjb25zdCBpc1ZhbHVlTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsKHZhbHVlKSB8fCBpc1VuZGVmaW5lZCh2YWx1ZSk7XHJcbiAgICBpc1ZhbGlkID0gKCgpID0+IHtcclxuICAgICAgICBzd2l0Y2ggKHZhbGlkYXRvci50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JlcXVpcmVkJzpcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZhbGlkU3RyaW5nID0gJycgPT09IHByb3BlcnR5LnZhbHVlID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmFsaWREYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlID09PSB2YWxpZGF0b3IudmFsdWUgPyAoIWlzTnVsbCh2YWx1ZSkgJiYgIWlzVW5kZWZpbmVkKHZhbHVlKSAmJiBwcmV2YWxpZFN0cmluZyAmJiBwcmV2YWxpZERhdGUpIDogdHJ1ZTtcclxuICAgICAgICAgICAgY2FzZSAncmVnZXgnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGlzVmFsdWVOdWxsT3JVbmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IudmFsdWUudGVzdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcclxuICAgICAgICAgICAgICAgIGlmIChpc1ZhbHVlTnVsbE9yVW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1haWxWYWxpZGF0aW9uKHZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW1iZXJWYWxpZGF0aW9uKHZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0cmluZ1RvVmFsaWRhdGUgPSB2YWx1ZSB8fCAnJztcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdMZW5ndGgoc3RyaW5nVG9WYWxpZGF0ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVWYWxpZGF0aW9uKHZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci52YWx1ZSh2YWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoaXNWYWxpZCkgfHwgaXNOdWxsKGlzVmFsaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBUaGUgdmFsaWRhdG9yIG9mIHR5cGU6ICR7dmFsaWRhdG9yLnR5cGV9IGlzIG5vdCBkZWZpbmVkYCk7XHJcbiAgICB9IGVsc2UgaWYgKGZhbHNlID09PSBpc1ZhbGlkKSB7XHJcbiAgICAgICAgLy9BZGQgdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5LlxyXG4gICAgICAgIHJldHVybiBnZXRFcnJvckxhYmVsKHZhbGlkYXRvci50eXBlLCBwcm9wZXJ0eS5tb2RlbE5hbWUgKyAnLicgKyBwcm9wZXJ0eS5uYW1lLCBvcHRpb25zKTsgLy9cIlRoZSBwcm9wZXJ0eSBcIiArIHByb3BlcnR5Lm5hbWUgKyBcIiBpcyBpbnZhbGlkLlwiO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBHZXQgdGhlIGVycm9yIGxhYmVsIGZyb20gYSB0eXBlIGFuZCBhIGZpZWxkIG5hbWUuXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gdHlwZSAgICAgIC0gVGhlIHR5cGUgbmFtZS5cclxuICogQHBhcmFtICB7c3RyaW5nfSBmaWVsZE5hbWUgLSBUaGUgZmllbGQgbmFtZS5cclxuICogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdG8gcHV0IHN1Y2ggYXMgdGhlIHRyYW5zbGF0aW9uS2V5IHdoaWNoIGNvdWxkIGJlIGRlZmluZWQgaW4gdGhlIGRvbWFpbi5cclxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGVycm9yLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RXJyb3JMYWJlbCh0eXBlLCBmaWVsZE5hbWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleSA9IG9wdGlvbnMudHJhbnNsYXRpb25LZXkgPyBvcHRpb25zLnRyYW5zbGF0aW9uS2V5IDogYGRvbWFpbi52YWxpZGF0aW9uLiR7dHlwZX1gO1xyXG4gICAgY29uc3Qgb3B0cyA9IHsgZmllbGROYW1lOiB0cmFuc2xhdGUoZmllbGROYW1lKSwgLi4ub3B0aW9ucyB9O1xyXG4gICAgcmV0dXJuIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbktleSwgb3B0cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlO1xyXG4iXX0=