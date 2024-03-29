'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFieldInformations = exports.getEntityInformations = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _check = require('../../util/string/check');

var _check2 = _interopRequireDefault(_check);

var _check3 = require('../../util/object/check');

var _check4 = _interopRequireDefault(_check3);

var _checkIsNotNull = require('../../util/object/checkIsNotNull');

var _checkIsNotNull2 = _interopRequireDefault(_checkIsNotNull);

var _container = require('../domain/container');

var _container2 = _interopRequireDefault(_container);

var _container3 = require('./container');

var _container4 = _interopRequireDefault(_container3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEPARATOR = '.';

/**
* Pointer to the domain contaier.
* @type {Object}
*/

var computedEntityContainer = _immutable2.default.Map({});

/*
binder
idAttribute
decoratorOptions
symbol
style
decorator
isValidationOff
label
required
domain
*/

/**
 * Build all entity information from entity name.
 * @param  {string} entityName - The entity name.
 */
function _buildEntityInformation(entityName) {
    var entityDomainInfos = _container4.default.getEntityConfiguration(entityName);
    (0, _checkIsNotNull2.default)('entityDomainInfos', entityDomainInfos);
    var container = {};
    //Populate the domain values i
    for (var key in entityDomainInfos) {
        container[key] = _buildFieldInformation('' + entityName + SEPARATOR + key);
    }
    //Update the computed information map.
    computedEntityContainer = computedEntityContainer.set(entityName, _immutable2.default.Map(container));
}

/**
 * Build the field informations.
 * @param  {string} fieldPath - The field path.
 * @return {Immutable.Map} - The immutable field description.
 */
function _buildFieldInformation(fieldPath) {
    var fieldConf = _container4.default.getFieldConfiguration(fieldPath);
    var immutableFieldConf = _immutable2.default.Map(fieldConf);
    //Maybe add a domain check existance
    var domain = fieldConf.domain;

    return _container2.default.get(domain).mergeDeep(immutableFieldConf);
}

/**
* Get the entity information from the entity name and given the extended informations.
* @param {string} entityName - The name of the entity.
* @param {object} complementaryInformation - Additional information on the entity.
* @return {object} - The entity informations from the entity  name.
*/
function getEntityInformations(entityName, complementaryInformation) {
    (0, _check2.default)('entityName', entityName);
    (0, _check4.default)('complementaryInformation', complementaryInformation);
    var key = entityName.split(SEPARATOR);
    if (!computedEntityContainer.hasIn(key)) {
        _buildEntityInformation(entityName);
    }
    return computedEntityContainer.get(entityName).mergeDeep(complementaryInformation).toJS();
}

/**
* Get the field informations.
* @param {string} fieldName - name or path of the field.
* @param {object} complementaryInformation - Additional informations to extend the domain informations.
* @return {object} - The builded field informations.
*/
function getFieldInformations(fieldName, complementaryInformation) {
    (0, _check2.default)('fieldName', fieldName);
    (0, _check4.default)('complementaryInformation', complementaryInformation);
    var fieldPath = fieldName.split(SEPARATOR);
    if (computedEntityContainer.hasIn(fieldPath)) {
        return computedEntityContainer.getIn(fieldPath).toJS();
    }
    return _buildFieldInformation(fieldPath).mergeDeep(complementaryInformation).toJS();
}

exports.getEntityInformations = getEntityInformations;
exports.getFieldInformations = getFieldInformations;
exports.default = {
    getEntityInformations: getEntityInformations,
    getFieldInformations: getFieldInformations
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJTRVBBUkFUT1IiLCJjb21wdXRlZEVudGl0eUNvbnRhaW5lciIsIkltbXV0YWJsZSIsIk1hcCIsIl9idWlsZEVudGl0eUluZm9ybWF0aW9uIiwiZW50aXR5TmFtZSIsImVudGl0eURvbWFpbkluZm9zIiwiZW50aXR5Q29udGFpbmVyIiwiZ2V0RW50aXR5Q29uZmlndXJhdGlvbiIsImNvbnRhaW5lciIsImtleSIsIl9idWlsZEZpZWxkSW5mb3JtYXRpb24iLCJzZXQiLCJmaWVsZFBhdGgiLCJmaWVsZENvbmYiLCJnZXRGaWVsZENvbmZpZ3VyYXRpb24iLCJpbW11dGFibGVGaWVsZENvbmYiLCJkb21haW4iLCJkb21haW5Db250YWluZXIiLCJnZXQiLCJtZXJnZURlZXAiLCJnZXRFbnRpdHlJbmZvcm1hdGlvbnMiLCJjb21wbGVtZW50YXJ5SW5mb3JtYXRpb24iLCJzcGxpdCIsImhhc0luIiwidG9KUyIsImdldEZpZWxkSW5mb3JtYXRpb25zIiwiZmllbGROYW1lIiwiZ2V0SW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQU9BOzs7O0FBQ0E7Ozs7OztBQVBBLElBQU1BLFlBQVksR0FBbEI7O0FBRUE7Ozs7O0FBTUEsSUFBSUMsMEJBQTBCQyxvQkFBVUMsR0FBVixDQUFjLEVBQWQsQ0FBOUI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFhQTs7OztBQUlBLFNBQVNDLHVCQUFULENBQWlDQyxVQUFqQyxFQUE2QztBQUN6QyxRQUFNQyxvQkFBb0JDLG9CQUFnQkMsc0JBQWhCLENBQXVDSCxVQUF2QyxDQUExQjtBQUNBLGtDQUFlLG1CQUFmLEVBQW9DQyxpQkFBcEM7QUFDQSxRQUFJRyxZQUFZLEVBQWhCO0FBQ0E7QUFDQSxTQUFLLElBQUlDLEdBQVQsSUFBZ0JKLGlCQUFoQixFQUFtQztBQUMvQkcsa0JBQVVDLEdBQVYsSUFBaUJDLDRCQUEwQk4sVUFBMUIsR0FBdUNMLFNBQXZDLEdBQW1EVSxHQUFuRCxDQUFqQjtBQUNIO0FBQ0Q7QUFDQVQsOEJBQTBCQSx3QkFBd0JXLEdBQXhCLENBQTRCUCxVQUE1QixFQUF3Q0gsb0JBQVVDLEdBQVYsQ0FBY00sU0FBZCxDQUF4QyxDQUExQjtBQUNIOztBQUVEOzs7OztBQUtBLFNBQVNFLHNCQUFULENBQWdDRSxTQUFoQyxFQUEyQztBQUN2QyxRQUFNQyxZQUFZUCxvQkFBZ0JRLHFCQUFoQixDQUFzQ0YsU0FBdEMsQ0FBbEI7QUFDQSxRQUFNRyxxQkFBcUJkLG9CQUFVQyxHQUFWLENBQWNXLFNBQWQsQ0FBM0I7QUFDQTtBQUh1QyxRQUlqQ0csTUFKaUMsR0FJdEJILFNBSnNCLENBSWpDRyxNQUppQzs7QUFLdkMsV0FBT0Msb0JBQWdCQyxHQUFoQixDQUFvQkYsTUFBcEIsRUFBNEJHLFNBQTVCLENBQXNDSixrQkFBdEMsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7QUFNQSxTQUFTSyxxQkFBVCxDQUErQmhCLFVBQS9CLEVBQTJDaUIsd0JBQTNDLEVBQXFFO0FBQ2pFLHlCQUFjLFlBQWQsRUFBNEJqQixVQUE1QjtBQUNBLHlCQUFjLDBCQUFkLEVBQTBDaUIsd0JBQTFDO0FBQ0EsUUFBTVosTUFBTUwsV0FBV2tCLEtBQVgsQ0FBaUJ2QixTQUFqQixDQUFaO0FBQ0EsUUFBSSxDQUFDQyx3QkFBd0J1QixLQUF4QixDQUE4QmQsR0FBOUIsQ0FBTCxFQUF5QztBQUNyQ04sZ0NBQXdCQyxVQUF4QjtBQUNIO0FBQ0QsV0FBT0osd0JBQXdCa0IsR0FBeEIsQ0FBNEJkLFVBQTVCLEVBQXdDZSxTQUF4QyxDQUFrREUsd0JBQWxELEVBQTRFRyxJQUE1RSxFQUFQO0FBQ0g7O0FBRUQ7Ozs7OztBQU1BLFNBQVNDLG9CQUFULENBQThCQyxTQUE5QixFQUF5Q0wsd0JBQXpDLEVBQW1FO0FBQy9ELHlCQUFjLFdBQWQsRUFBMkJLLFNBQTNCO0FBQ0EseUJBQWMsMEJBQWQsRUFBMENMLHdCQUExQztBQUNBLFFBQU1ULFlBQVljLFVBQVVKLEtBQVYsQ0FBZ0J2QixTQUFoQixDQUFsQjtBQUNBLFFBQUlDLHdCQUF3QnVCLEtBQXhCLENBQThCWCxTQUE5QixDQUFKLEVBQThDO0FBQzFDLGVBQU9aLHdCQUF3QjJCLEtBQXhCLENBQThCZixTQUE5QixFQUF5Q1ksSUFBekMsRUFBUDtBQUNIO0FBQ0QsV0FBT2QsdUJBQXVCRSxTQUF2QixFQUFrQ08sU0FBbEMsQ0FBNENFLHdCQUE1QyxFQUFzRUcsSUFBdEUsRUFBUDtBQUNIOztRQUdHSixxQixHQUFBQSxxQjtRQUNBSyxvQixHQUFBQSxvQjtrQkFHVztBQUNYTCxnREFEVztBQUVYSztBQUZXLEMiLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xyXG5pbXBvcnQgY2hlY2tJc1N0cmluZyBmcm9tICcuLi8uLi91dGlsL3N0cmluZy9jaGVjayc7XHJcbmltcG9ydCBjaGVja0lzT2JqZWN0IGZyb20gJy4uLy4uL3V0aWwvb2JqZWN0L2NoZWNrJztcclxuaW1wb3J0IGNoZWNrSXNOb3ROdWxsIGZyb20gJy4uLy4uL3V0aWwvb2JqZWN0L2NoZWNrSXNOb3ROdWxsJztcclxuY29uc3QgU0VQQVJBVE9SID0gJy4nO1xyXG5cclxuLyoqXHJcbiogUG9pbnRlciB0byB0aGUgZG9tYWluIGNvbnRhaWVyLlxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmltcG9ydCBkb21haW5Db250YWluZXIgZnJvbSAnLi4vZG9tYWluL2NvbnRhaW5lcic7XHJcbmltcG9ydCBlbnRpdHlDb250YWluZXIgZnJvbSAnLi9jb250YWluZXInO1xyXG5sZXQgY29tcHV0ZWRFbnRpdHlDb250YWluZXIgPSBJbW11dGFibGUuTWFwKHt9KTtcclxuXHJcbi8qXHJcbmJpbmRlclxyXG5pZEF0dHJpYnV0ZVxyXG5kZWNvcmF0b3JPcHRpb25zXHJcbnN5bWJvbFxyXG5zdHlsZVxyXG5kZWNvcmF0b3JcclxuaXNWYWxpZGF0aW9uT2ZmXHJcbmxhYmVsXHJcbnJlcXVpcmVkXHJcbmRvbWFpblxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIEJ1aWxkIGFsbCBlbnRpdHkgaW5mb3JtYXRpb24gZnJvbSBlbnRpdHkgbmFtZS5cclxuICogQHBhcmFtICB7c3RyaW5nfSBlbnRpdHlOYW1lIC0gVGhlIGVudGl0eSBuYW1lLlxyXG4gKi9cclxuZnVuY3Rpb24gX2J1aWxkRW50aXR5SW5mb3JtYXRpb24oZW50aXR5TmFtZSkge1xyXG4gICAgY29uc3QgZW50aXR5RG9tYWluSW5mb3MgPSBlbnRpdHlDb250YWluZXIuZ2V0RW50aXR5Q29uZmlndXJhdGlvbihlbnRpdHlOYW1lKTtcclxuICAgIGNoZWNrSXNOb3ROdWxsKCdlbnRpdHlEb21haW5JbmZvcycsIGVudGl0eURvbWFpbkluZm9zKTtcclxuICAgIGxldCBjb250YWluZXIgPSB7fTtcclxuICAgIC8vUG9wdWxhdGUgdGhlIGRvbWFpbiB2YWx1ZXMgaVxyXG4gICAgZm9yIChsZXQga2V5IGluIGVudGl0eURvbWFpbkluZm9zKSB7XHJcbiAgICAgICAgY29udGFpbmVyW2tleV0gPSBfYnVpbGRGaWVsZEluZm9ybWF0aW9uKGAke2VudGl0eU5hbWV9JHtTRVBBUkFUT1J9JHtrZXl9YCk7XHJcbiAgICB9XHJcbiAgICAvL1VwZGF0ZSB0aGUgY29tcHV0ZWQgaW5mb3JtYXRpb24gbWFwLlxyXG4gICAgY29tcHV0ZWRFbnRpdHlDb250YWluZXIgPSBjb21wdXRlZEVudGl0eUNvbnRhaW5lci5zZXQoZW50aXR5TmFtZSwgSW1tdXRhYmxlLk1hcChjb250YWluZXIpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEJ1aWxkIHRoZSBmaWVsZCBpbmZvcm1hdGlvbnMuXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gZmllbGRQYXRoIC0gVGhlIGZpZWxkIHBhdGguXHJcbiAqIEByZXR1cm4ge0ltbXV0YWJsZS5NYXB9IC0gVGhlIGltbXV0YWJsZSBmaWVsZCBkZXNjcmlwdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIF9idWlsZEZpZWxkSW5mb3JtYXRpb24oZmllbGRQYXRoKSB7XHJcbiAgICBjb25zdCBmaWVsZENvbmYgPSBlbnRpdHlDb250YWluZXIuZ2V0RmllbGRDb25maWd1cmF0aW9uKGZpZWxkUGF0aCk7XHJcbiAgICBjb25zdCBpbW11dGFibGVGaWVsZENvbmYgPSBJbW11dGFibGUuTWFwKGZpZWxkQ29uZik7XHJcbiAgICAvL01heWJlIGFkZCBhIGRvbWFpbiBjaGVjayBleGlzdGFuY2VcclxuICAgIGxldCB7IGRvbWFpbiB9ID0gZmllbGRDb25mO1xyXG4gICAgcmV0dXJuIGRvbWFpbkNvbnRhaW5lci5nZXQoZG9tYWluKS5tZXJnZURlZXAoaW1tdXRhYmxlRmllbGRDb25mKTtcclxufVxyXG5cclxuLyoqXHJcbiogR2V0IHRoZSBlbnRpdHkgaW5mb3JtYXRpb24gZnJvbSB0aGUgZW50aXR5IG5hbWUgYW5kIGdpdmVuIHRoZSBleHRlbmRlZCBpbmZvcm1hdGlvbnMuXHJcbiogQHBhcmFtIHtzdHJpbmd9IGVudGl0eU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZW50aXR5LlxyXG4qIEBwYXJhbSB7b2JqZWN0fSBjb21wbGVtZW50YXJ5SW5mb3JtYXRpb24gLSBBZGRpdGlvbmFsIGluZm9ybWF0aW9uIG9uIHRoZSBlbnRpdHkuXHJcbiogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBlbnRpdHkgaW5mb3JtYXRpb25zIGZyb20gdGhlIGVudGl0eSAgbmFtZS5cclxuKi9cclxuZnVuY3Rpb24gZ2V0RW50aXR5SW5mb3JtYXRpb25zKGVudGl0eU5hbWUsIGNvbXBsZW1lbnRhcnlJbmZvcm1hdGlvbikge1xyXG4gICAgY2hlY2tJc1N0cmluZygnZW50aXR5TmFtZScsIGVudGl0eU5hbWUpO1xyXG4gICAgY2hlY2tJc09iamVjdCgnY29tcGxlbWVudGFyeUluZm9ybWF0aW9uJywgY29tcGxlbWVudGFyeUluZm9ybWF0aW9uKTtcclxuICAgIGNvbnN0IGtleSA9IGVudGl0eU5hbWUuc3BsaXQoU0VQQVJBVE9SKTtcclxuICAgIGlmICghY29tcHV0ZWRFbnRpdHlDb250YWluZXIuaGFzSW4oa2V5KSkge1xyXG4gICAgICAgIF9idWlsZEVudGl0eUluZm9ybWF0aW9uKGVudGl0eU5hbWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXB1dGVkRW50aXR5Q29udGFpbmVyLmdldChlbnRpdHlOYW1lKS5tZXJnZURlZXAoY29tcGxlbWVudGFyeUluZm9ybWF0aW9uKS50b0pTKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4qIEdldCB0aGUgZmllbGQgaW5mb3JtYXRpb25zLlxyXG4qIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWUgLSBuYW1lIG9yIHBhdGggb2YgdGhlIGZpZWxkLlxyXG4qIEBwYXJhbSB7b2JqZWN0fSBjb21wbGVtZW50YXJ5SW5mb3JtYXRpb24gLSBBZGRpdGlvbmFsIGluZm9ybWF0aW9ucyB0byBleHRlbmQgdGhlIGRvbWFpbiBpbmZvcm1hdGlvbnMuXHJcbiogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBidWlsZGVkIGZpZWxkIGluZm9ybWF0aW9ucy5cclxuKi9cclxuZnVuY3Rpb24gZ2V0RmllbGRJbmZvcm1hdGlvbnMoZmllbGROYW1lLCBjb21wbGVtZW50YXJ5SW5mb3JtYXRpb24pIHtcclxuICAgIGNoZWNrSXNTdHJpbmcoJ2ZpZWxkTmFtZScsIGZpZWxkTmFtZSk7XHJcbiAgICBjaGVja0lzT2JqZWN0KCdjb21wbGVtZW50YXJ5SW5mb3JtYXRpb24nLCBjb21wbGVtZW50YXJ5SW5mb3JtYXRpb24pO1xyXG4gICAgY29uc3QgZmllbGRQYXRoID0gZmllbGROYW1lLnNwbGl0KFNFUEFSQVRPUik7XHJcbiAgICBpZiAoY29tcHV0ZWRFbnRpdHlDb250YWluZXIuaGFzSW4oZmllbGRQYXRoKSkge1xyXG4gICAgICAgIHJldHVybiBjb21wdXRlZEVudGl0eUNvbnRhaW5lci5nZXRJbihmaWVsZFBhdGgpLnRvSlMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfYnVpbGRGaWVsZEluZm9ybWF0aW9uKGZpZWxkUGF0aCkubWVyZ2VEZWVwKGNvbXBsZW1lbnRhcnlJbmZvcm1hdGlvbikudG9KUygpO1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgZ2V0RW50aXR5SW5mb3JtYXRpb25zLFxyXG4gICAgZ2V0RmllbGRJbmZvcm1hdGlvbnNcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGdldEVudGl0eUluZm9ybWF0aW9ucyxcclxuICAgIGdldEZpZWxkSW5mb3JtYXRpb25zXHJcbn07XHJcblxyXG4iXX0=