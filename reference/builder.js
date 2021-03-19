'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAutoCompleteServiceQuery = exports.loadMany = exports.loadList = exports.loadListByName = undefined;

var _fetch = require('../network/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _check = require('../util/string/check');

var _check2 = _interopRequireDefault(_check);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = {};

//Container for the list and
/*global Promise,  _*/

/* Filename: helpers/reference_helper.js  */
//Dependency gestion depending on the fact that we are in the browser or in node.

var promiseWaiting = [];

function _deletePromiseWaiting(name) {
    var indexPrm = promiseWaiting.indexOf(name);
    if (indexPrm !== -1) {
        promiseWaiting.splice(indexPrm, 1);
    }
}

function _getTimeStamp() {
    return new Date().getTime();
}
/*
* Serve the data from the cache.
*/
function _cacheData(key, value) {
    cache[key] = { timeStamp: _getTimeStamp(), value: value };
    _deletePromiseWaiting(key);
    return value;
}

/**
* Load a list from its description
* @param {object} listDesc - Description of the list to load
* @returns {Promise} - A promise of the loading.
* @example - refHelper.loadList({url: "http://localhost:8080/api/list/1"}).then(console.log,console.error);
*/
function loadList(listDesc) {
    return (0, _fetch2.default)({ url: listDesc.url, method: 'GET' });
}

// Load a reference with its list name.
// It calls the service which must have been registered.
/**
* Load a list by name.
* @param {string} listName - The name of the list to load.
* @param {object} args     - Argument to provide to the function.
*/
function loadListByName(listName, args) {
    var skipCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    (0, _check2.default)('listName', listName);
    var configurationElement = (0, _config.getElement)(listName);
    if (typeof configurationElement !== 'function') {
        throw new Error('You are trying to load the reference list: ' + listName + ' which does not have a list configure.');
    }
    var now = _getTimeStamp();
    if (cache[listName] && now - cache[listName].timeStamp < (0, _config.getCacheDuration)() && !skipCache) {
        _deletePromiseWaiting(listName);
        //console.info('data served from cache', listName, cache[listName].value);
        return Promise.resolve(cache[listName].value);
    }
    //Call the service, the service must return a promise.
    return configurationElement(args).then(function (data) {
        return _cacheData(listName, data);
    });
}

//Load many lists by their names. `refHelper.loadMany(['list1', 'list2']).then(success, error)`
// Return an array of many promises for all the given lists.
// Be carefull, if there is a problem for one list, the error callback is called.
function loadMany(names) {
    var skipCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (names === undefined) {
        return [];
    }
    if (!Array.isArray(names)) {
        throw new Error('LoadMany is expecting an array.');
    }
    return names.reduce(function (acc, name) {
        if (promiseWaiting.indexOf(name) !== -1) {
            return acc;
        }
        promiseWaiting.push(name);
        return acc.concat([loadListByName(name, null, skipCache).then(function (dataList) {
            return { name: name, dataList: dataList };
        })]);
    }, []);
}
/**
* Get a function to trigger in autocomplete case.
* The function will trigger a promise.
* @param {string} listName - Name of the list.
*/
function getAutoCompleteServiceQuery(listName) {
    return function (query) {
        loadListByName(listName, query.term).then(function (results) {
            query.callback(results);
        });
    };
}

exports.loadListByName = loadListByName;
exports.loadList = loadList;
exports.loadMany = loadMany;
exports.getAutoCompleteServiceQuery = getAutoCompleteServiceQuery;
exports.default = {
    loadListByName: loadListByName,
    loadList: loadList,
    loadMany: loadMany,
    getAutoCompleteServiceQuery: getAutoCompleteServiceQuery
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJjYWNoZSIsInByb21pc2VXYWl0aW5nIiwiX2RlbGV0ZVByb21pc2VXYWl0aW5nIiwibmFtZSIsImluZGV4UHJtIiwiaW5kZXhPZiIsInNwbGljZSIsIl9nZXRUaW1lU3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsIl9jYWNoZURhdGEiLCJrZXkiLCJ2YWx1ZSIsInRpbWVTdGFtcCIsImxvYWRMaXN0IiwibGlzdERlc2MiLCJ1cmwiLCJtZXRob2QiLCJsb2FkTGlzdEJ5TmFtZSIsImxpc3ROYW1lIiwiYXJncyIsInNraXBDYWNoZSIsImNvbmZpZ3VyYXRpb25FbGVtZW50IiwiRXJyb3IiLCJub3ciLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJkYXRhIiwibG9hZE1hbnkiLCJuYW1lcyIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsInJlZHVjZSIsImFjYyIsInB1c2giLCJjb25jYXQiLCJkYXRhTGlzdCIsImdldEF1dG9Db21wbGV0ZVNlcnZpY2VRdWVyeSIsInF1ZXJ5IiwidGVybSIsInJlc3VsdHMiLCJjYWxsYmFjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUVBLElBQUlBLFFBQVEsRUFBWjs7QUFIQTtBQVJBOztBQUdBO0FBQ0E7O0FBUUEsSUFBTUMsaUJBQWlCLEVBQXZCOztBQUVBLFNBQVNDLHFCQUFULENBQStCQyxJQUEvQixFQUFxQztBQUNqQyxRQUFNQyxXQUFXSCxlQUFlSSxPQUFmLENBQXVCRixJQUF2QixDQUFqQjtBQUNBLFFBQUlDLGFBQWEsQ0FBQyxDQUFsQixFQUFxQjtBQUNqQkgsdUJBQWVLLE1BQWYsQ0FBc0JGLFFBQXRCLEVBQWdDLENBQWhDO0FBQ0g7QUFDSjs7QUFFRCxTQUFTRyxhQUFULEdBQXlCO0FBQ3JCLFdBQU8sSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBQVA7QUFDSDtBQUNEOzs7QUFHQSxTQUFTQyxVQUFULENBQW9CQyxH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b2JhbCBQcm9taXNlLCAgXyovXHJcblxyXG5cclxuLyogRmlsZW5hbWU6IGhlbHBlcnMvcmVmZXJlbmNlX2hlbHBlci5qcyAgKi9cclxuLy9EZXBlbmRlbmN5IGdlc3Rpb24gZGVwZW5kaW5nIG9uIHRoZSBmYWN0IHRoYXQgd2UgYXJlIGluIHRoZSBicm93c2VyIG9yIGluIG5vZGUuXHJcbmltcG9ydCBmZXRjaCBmcm9tICcuLi9uZXR3b3JrL2ZldGNoJztcclxuaW1wb3J0IGNoZWNrSXNTdHJpbmcgZnJvbSAnLi4vdXRpbC9zdHJpbmcvY2hlY2snO1xyXG5cclxuLy9Db250YWluZXIgZm9yIHRoZSBsaXN0IGFuZFxyXG5pbXBvcnQgeyBnZXRFbGVtZW50LCBnZXRDYWNoZUR1cmF0aW9uIH0gZnJvbSAnLi9jb25maWcnO1xyXG5cclxubGV0IGNhY2hlID0ge307XHJcbmNvbnN0IHByb21pc2VXYWl0aW5nID0gW107XHJcblxyXG5mdW5jdGlvbiBfZGVsZXRlUHJvbWlzZVdhaXRpbmcobmFtZSkge1xyXG4gICAgY29uc3QgaW5kZXhQcm0gPSBwcm9taXNlV2FpdGluZy5pbmRleE9mKG5hbWUpO1xyXG4gICAgaWYgKGluZGV4UHJtICE9PSAtMSkge1xyXG4gICAgICAgIHByb21pc2VXYWl0aW5nLnNwbGljZShpbmRleFBybSwgMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9nZXRUaW1lU3RhbXAoKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbn1cclxuLypcclxuKiBTZXJ2ZSB0aGUgZGF0YSBmcm9tIHRoZSBjYWNoZS5cclxuKi9cclxuZnVuY3Rpb24gX2NhY2hlRGF0YShrZXksIHZhbHVlKSB7XHJcbiAgICBjYWNoZVtrZXldID0geyB0aW1lU3RhbXA6IF9nZXRUaW1lU3RhbXAoKSwgdmFsdWU6IHZhbHVlIH07XHJcbiAgICBfZGVsZXRlUHJvbWlzZVdhaXRpbmcoa2V5KTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiogTG9hZCBhIGxpc3QgZnJvbSBpdHMgZGVzY3JpcHRpb25cclxuKiBAcGFyYW0ge29iamVjdH0gbGlzdERlc2MgLSBEZXNjcmlwdGlvbiBvZiB0aGUgbGlzdCB0byBsb2FkXHJcbiogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIG9mIHRoZSBsb2FkaW5nLlxyXG4qIEBleGFtcGxlIC0gcmVmSGVscGVyLmxvYWRMaXN0KHt1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9saXN0LzFcIn0pLnRoZW4oY29uc29sZS5sb2csY29uc29sZS5lcnJvcik7XHJcbiovXHJcbmZ1bmN0aW9uIGxvYWRMaXN0KGxpc3REZXNjKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goeyB1cmw6IGxpc3REZXNjLnVybCwgbWV0aG9kOiAnR0VUJyB9KTtcclxufVxyXG5cclxuLy8gTG9hZCBhIHJlZmVyZW5jZSB3aXRoIGl0cyBsaXN0IG5hbWUuXHJcbi8vIEl0IGNhbGxzIHRoZSBzZXJ2aWNlIHdoaWNoIG11c3QgaGF2ZSBiZWVuIHJlZ2lzdGVyZWQuXHJcbi8qKlxyXG4qIExvYWQgYSBsaXN0IGJ5IG5hbWUuXHJcbiogQHBhcmFtIHtzdHJpbmd9IGxpc3ROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGxpc3QgdG8gbG9hZC5cclxuKiBAcGFyYW0ge29iamVjdH0gYXJncyAgICAgLSBBcmd1bWVudCB0byBwcm92aWRlIHRvIHRoZSBmdW5jdGlvbi5cclxuKi9cclxuZnVuY3Rpb24gbG9hZExpc3RCeU5hbWUobGlzdE5hbWUsIGFyZ3MsIHNraXBDYWNoZSA9IGZhbHNlKSB7XHJcbiAgICBjaGVja0lzU3RyaW5nKCdsaXN0TmFtZScsIGxpc3ROYW1lKTtcclxuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25FbGVtZW50ID0gZ2V0RWxlbWVudChsaXN0TmFtZSk7XHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZ3VyYXRpb25FbGVtZW50ICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBZb3UgYXJlIHRyeWluZyB0byBsb2FkIHRoZSByZWZlcmVuY2UgbGlzdDogJHtsaXN0TmFtZX0gd2hpY2ggZG9lcyBub3QgaGF2ZSBhIGxpc3QgY29uZmlndXJlLmApO1xyXG4gICAgfVxyXG4gICAgbGV0IG5vdyA9IF9nZXRUaW1lU3RhbXAoKTtcclxuICAgIGlmIChjYWNoZVtsaXN0TmFtZV0gJiYgKG5vdyAtIGNhY2hlW2xpc3ROYW1lXS50aW1lU3RhbXApIDwgZ2V0Q2FjaGVEdXJhdGlvbigpICYmICFza2lwQ2FjaGUpIHtcclxuICAgICAgICBfZGVsZXRlUHJvbWlzZVdhaXRpbmcobGlzdE5hbWUpO1xyXG4gICAgICAgIC8vY29uc29sZS5pbmZvKCdkYXRhIHNlcnZlZCBmcm9tIGNhY2hlJywgbGlzdE5hbWUsIGNhY2hlW2xpc3ROYW1lXS52YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjYWNoZVtsaXN0TmFtZV0udmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy9DYWxsIHRoZSBzZXJ2aWNlLCB0aGUgc2VydmljZSBtdXN0IHJldHVybiBhIHByb21pc2UuXHJcbiAgICByZXR1cm4gY29uZmlndXJhdGlvbkVsZW1lbnQoYXJncylcclxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NhY2hlRGF0YShsaXN0TmFtZSwgZGF0YSlcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuLy9Mb2FkIG1hbnkgbGlzdHMgYnkgdGhlaXIgbmFtZXMuIGByZWZIZWxwZXIubG9hZE1hbnkoWydsaXN0MScsICdsaXN0MiddKS50aGVuKHN1Y2Nlc3MsIGVycm9yKWBcclxuLy8gUmV0dXJuIGFuIGFycmF5IG9mIG1hbnkgcHJvbWlzZXMgZm9yIGFsbCB0aGUgZ2l2ZW4gbGlzdHMuXHJcbi8vIEJlIGNhcmVmdWxsLCBpZiB0aGVyZSBpcyBhIHByb2JsZW0gZm9yIG9uZSBsaXN0LCB0aGUgZXJyb3IgY2FsbGJhY2sgaXMgY2FsbGVkLlxyXG5mdW5jdGlvbiBsb2FkTWFueShuYW1lcywgc2tpcENhY2hlID0gZmFsc2UpIHtcclxuICAgIGlmIChuYW1lcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5hbWVzKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTG9hZE1hbnkgaXMgZXhwZWN0aW5nIGFuIGFycmF5LicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5hbWVzLnJlZHVjZSgoYWNjLCBuYW1lKSA9PiB7XHJcbiAgICAgICAgaWYgKHByb21pc2VXYWl0aW5nLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb21pc2VXYWl0aW5nLnB1c2gobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQoW2xvYWRMaXN0QnlOYW1lKG5hbWUsIG51bGwsIHNraXBDYWNoZSkudGhlbihkYXRhTGlzdCA9PiAoeyBuYW1lLCBkYXRhTGlzdDogZGF0YUxpc3QgfSkpXSk7XHJcbiAgICB9LCBbXSk7XHJcbn1cclxuLyoqXHJcbiogR2V0IGEgZnVuY3Rpb24gdG8gdHJpZ2dlciBpbiBhdXRvY29tcGxldGUgY2FzZS5cclxuKiBUaGUgZnVuY3Rpb24gd2lsbCB0cmlnZ2VyIGEgcHJvbWlzZS5cclxuKiBAcGFyYW0ge3N0cmluZ30gbGlzdE5hbWUgLSBOYW1lIG9mIHRoZSBsaXN0LlxyXG4qL1xyXG5mdW5jdGlvbiBnZXRBdXRvQ29tcGxldGVTZXJ2aWNlUXVlcnkobGlzdE5hbWUpIHtcclxuICAgIHJldHVybiAocXVlcnkpID0+IHtcclxuICAgICAgICBsb2FkTGlzdEJ5TmFtZShsaXN0TmFtZSwgcXVlcnkudGVybSkudGhlbigocmVzdWx0cykgPT4ge1xyXG4gICAgICAgICAgICBxdWVyeS5jYWxsYmFjayhyZXN1bHRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBsb2FkTGlzdEJ5TmFtZSxcclxuICAgIGxvYWRMaXN0LFxyXG4gICAgbG9hZE1hbnksXHJcbiAgICBnZXRBdXRvQ29tcGxldGVTZXJ2aWNlUXVlcnlcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGxvYWRMaXN0QnlOYW1lLFxyXG4gICAgbG9hZExpc3QsXHJcbiAgICBsb2FkTWFueSxcclxuICAgIGdldEF1dG9Db21wbGV0ZVNlcnZpY2VRdWVyeVxyXG59O1xyXG4iXX0=