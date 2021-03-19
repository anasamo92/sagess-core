'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isFunction = require('lodash/lang/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _defer = require('lodash/function/defer');

var _defer2 = _interopRequireDefault(_defer);

var _intersection = require('lodash/array/intersection');

var _intersection2 = _interopRequireDefault(_intersection);

var _capitalize = require('lodash/string/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable filenames/match-regex */


var reservedNames = ['Error', 'Status'];

var _instances = [];

/**
* @class CoreStore
*/

var CoreStore = function (_EventEmitter) {
    _inherits(CoreStore, _EventEmitter);

    /**
    * Contructor of the store class.
    */
    function CoreStore(config) {
        _classCallCheck(this, CoreStore);

        var _this = _possibleConstructorReturn(this, (CoreStore.__proto__ || Object.getPrototypeOf(CoreStore)).call(this));

        (0, _objectAssign2.default)(_this, {
            config: config
        });
        //Initialize the data as immutable map.
        _this.data = _immutable2.default.Map({});
        _this.status = _immutable2.default.Map({});
        _this.error = _immutable2.default.Map({});
        _this.pendingEvents = [];
        _this.customHandler = (0, _objectAssign2.default)({}, config.customHandler);
        //Register all gernerated methods.
        _this.buildDefinition();
        _this.buildEachNodeChangeEventListener();
        _this.registerDispatcher();
        if (__DEV__) {
            _this._registerDevTools();
        }
        return _this;
    }
    // Get all the instances of core store.


    _createClass(CoreStore, [{
        key: '_registerDevTools',

        // register the instances saving
        value: function _registerDevTools() {
            _instances.push(this);
        }
        /**
        * Initialize the store configuration.
        * @param {object} storeConfiguration - The store configuration for the initialization.
        */

    }, {
        key: 'buildDefinition',
        value: function buildDefinition() {
            /**
            * Build the definitions for the entity (may be a subject.)
            * @type {object}
            */
            if (!this.config.definition) {
                throw new Error('Core Store: missing definition', this.config);
            }
            this.definition = this.config.definition;

            var properties = Object.keys(this.definition).map(function (elt) {
                return (0, _capitalize2.default)(elt);
            });
            var reservedProperties = properties.reduce(function (acc, elt) {
                return acc.concat(reservedNames.map(function (w) {
                    return w + elt;
                }));
            }, []);
            if ((0, _intersection2.default)(properties, reservedProperties).length > 0) {
                throw new Error('You have a name collision into this store : you cannot use a node named Blabla and anoter named ErrorBlabla, or StatusBlabla : ' + (0, _intersection2.default)(properties, reservedProperties).join(' ') + ' ');
            }
            return this.definition;
        }
        /**
        * Get the whole value of the
        * @return {[type]} [description]
        */

    }, {
        key: 'getValue',
        value: function getValue() {
            return this.data ? this.data.toJS() : {};
        }
        /**
        * Getter on the identifier property.
        * @return {string} - Store identifier.
        */

    }, {
        key: 'getStatus',

        /** Return the status of a definition.
        * @param {string} - The definition to load.
        * @returns {string} - The status of a definition.
        */
        value: function getStatus(def) {
            if (this.status.has(def)) {
                return this.status.get(def);
            }
            return undefined;
        }
        /**
        * Emit all events pending in the pendingEvents map.
        */

    }, {
        key: 'emitPendingEvents',
        value: function emitPendingEvents() {
            var _this2 = this;

            this.pendingEvents.map(function (evtToEmit) {
                var name = evtToEmit.name,
                    data = evtToEmit.data;

                _this2.emit(name, data);
            });
        }

        /**
        * Replace the emit function with a willEmit in otder to store the changing event but send it afterwards.
        * @param eventName {string} - The event name.
        * @param  data {object} - The event's associated data.
        */

    }, {
        key: 'willEmit',
        value: function willEmit(eventName, data) {
            this.pendingEvents = this.pendingEvents.reduce(function (result, current) {
                if (current.name !== eventName) {
                    result.push(current);
                }
                return result;
            }, [{ name: eventName, data: data }]);
        }

        /**
        * Clear all pending events.
        */

    }, {
        key: 'clearPendingEvents',
        value: function clearPendingEvents() {
            this.pendingEvents = [];
        }
        /**
        * Build a change listener for each property in the definition. (should be macro entities);
        */

    }, {
        key: 'buildEachNodeChangeEventListener',
        value: function buildEachNodeChangeEventListener() {
            var currentStore = this;
            //Loop through each store properties.
            for (var definition in this.definition) {
                var capitalizeDefinition = (0, _capitalize2.default)(definition);
                //Creates the change listener
                currentStore['add' + capitalizeDefinition + 'ChangeListener'] = function (def) {
                    return function (cb) {
                        currentStore.addListener(def + ':change', cb);
                    };
                }(definition);
                //Remove the change listener
                currentStore['remove' + capitalizeDefinition + 'ChangeListener'] = function (def) {
                    return function (cb) {
                        currentStore.removeListener(def + ':change', cb);
                    };
                }(definition);
                //Create an update method.
                //Should be named updateData to be more explicit
                if (currentStore['update' + capitalizeDefinition] === undefined) {
                    currentStore['update' + capitalizeDefinition] = function (def) {
                        return function (dataNode, status, informations) {
                            var immutableNode = (0, _isFunction2.default)(dataNode) ? dataNode : _immutable2.default.fromJS(dataNode);
                            currentStore.data = currentStore.data.set(def, immutableNode);
                            //Update the status on the data.
                            currentStore.status = currentStore.status.set(def, status);

                            currentStore.willEmit(def + ':change', { property: def, status: status, informations: informations });
                        };
                    }(definition);
                }

                //Create a get method.
                if (currentStore['get' + capitalizeDefinition] === undefined) {
                    currentStore['get' + capitalizeDefinition] = function (def) {
                        return function () {
                            var hasData = currentStore.data.has(def);
                            if (hasData) {
                                var rawData = currentStore.data.get(def);
                                if (rawData && rawData.toJS) {
                                    var data = rawData.toJS();
                                    return data;
                                }
                                return rawData;
                            }
                            return undefined;
                        };
                    }(definition);
                }
                //Creates the error change listener
                currentStore['add' + capitalizeDefinition + 'ErrorListener'] = function (def) {
                    return function (cb) {
                        currentStore.addListener(def + ':error', cb);
                    };
                }(definition);
                //Remove the change listener
                currentStore['remove' + capitalizeDefinition + 'ErrorListener'] = function (def) {
                    return function (cb) {
                        currentStore.removeListener(def + ':error', cb);
                    };
                }(definition);
                //Create an update method.
                currentStore['updateError' + capitalizeDefinition] = function (def) {
                    return function (dataNode, status, informations) {
                        //CheckIsObject
                        var immutableNode = _immutable2.default[(0, _isArray2.default)(dataNode) ? 'List' : 'Map'](dataNode);
                        currentStore.error = currentStore.error.set(def, immutableNode);
                        currentStore.status = currentStore.status.set(def, status);
                        currentStore.willEmit(def + ':error', { property: def, status: status, informations: informations });
                    };
                }(definition);
                //Create a get method.
                currentStore['getError' + capitalizeDefinition] = function (def) {
                    return function () {
                        var hasData = currentStore.error.has(def);
                        return hasData ? currentStore.error.get(def).toJS() : undefined;
                    };
                }(definition);

                // status
                currentStore['add' + capitalizeDefinition + 'StatusListener'] = function (def) {
                    return function (cb) {
                        currentStore.addListener(def + ':status', cb);
                    };
                }(definition);
                //Remove the change listener
                currentStore['remove' + capitalizeDefinition + 'StatusListener'] = function (def) {
                    return function (cb) {
                        currentStore.removeListener(def + ':status', cb);
                    };
                }(definition);
                //Create an update method.
                currentStore['updateStatus' + capitalizeDefinition] = function (def) {
                    return function updateStatus(dataNode, status, informations) {
                        //CheckIsObject
                        //console.log(`status  ${JSON.stringify(status) }`);
                        var statusNode = status; //Immutable.fromJS(status); // mMaybe it is a part of the status only.
                        currentStore.status = currentStore.status.set(def, statusNode);
                        currentStore.willEmit(def + ':status', { property: def, status: status, informations: informations });
                    };
                }(definition);
                //Create a get method.
                currentStore['getStatus' + capitalizeDefinition] = function (def) {
                    return function getStatus() {
                        var hasData = currentStore.status.has(def);
                        var data = hasData ? currentStore.status.get(def) : undefined;
                        return data.toJS ? data.toJS() : data;
                    };
                }(definition);
            }
        }
    }, {
        key: 'delayPendingEvents',
        value: function delayPendingEvents(context) {
            //Delay all the change emit by the store to be sure it is done after the internal store propagation and to go out of the dispatch function.
            (0, _defer2.default)(function () {
                context.emitPendingEvents();
                context.clearPendingEvents();
            });
        }
    }, {
        key: '_buildInformations',
        value: function _buildInformations(incomingInfos) {
            return {
                callerId: incomingInfos.action.callerId
            };
        }
        /**
        * The store registrer itself on the dispatcher.
        */

    }, {
        key: 'registerDispatcher',
        value: function registerDispatcher() {
            var currentStore = this;
            this.dispatch = _dispatcher2.default.register(function (transferInfo) {
                //Check if an identifier check is necessary.
                if (currentStore.identifier) {
                    //If an identifier is needed a check is triggered.
                    if (!transferInfo || !transferInfo.action || !transferInfo.action.identifier || transferInfo.action.identifier !== currentStore.identifier) {
                        return;
                    }
                }
                //currentStore.clearPendingEvents();
                if (currentStore.globalCustomHandler) {
                    return currentStore.globalCustomHandler.call(currentStore, transferInfo);
                }

                //Read data from the action transfer information.
                var rawData = transferInfo.action.data;
                var status = transferInfo.action.status || {};
                var type = transferInfo.action.type;
                var otherInformations = currentStore._buildInformations(transferInfo);

                //Call each node handler for the matching definition's node.
                for (var node in rawData) {
                    if (currentStore.definition[node]) {
                        //Call a custom handler if this exists.
                        if (currentStore.customHandler && currentStore.customHandler[node] && currentStore.customHandler[node][type]) {
                            currentStore.customHandler[node][type].call(currentStore, rawData[node], status[node], otherInformations);
                        } else {
                            //Update the data for the given node. and emit the change/.
                            if (!(0, _isFunction2.default)(currentStore['' + type + (0, _capitalize2.default)(node)])) {
                                throw new Error('The listener you try to call is unavailable : ' + type + ' ' + (0, _capitalize2.default)(node) + ' ');
                            }
                            currentStore['' + type + (0, _capitalize2.default)(node)](rawData[node], status[node], otherInformations);
                        }
                    }
                }
                currentStore.delayPendingEvents(currentStore);
            });
        }
        /**
        * Add a listener on a store event.
        * @param {string}   eventName - Event name.
        * @param {Function} cb - CallBack to call on the event change name.
        */

    }, {
        key: 'addListener',
        value: function addListener(eventName, cb) {
            this.on(eventName, cb);
        }
    }, {
        key: '_instances',
        get: function get() {
            return [].concat(_instances);
        }
    }, {
        key: 'identifier',
        get: function get() {
            return this.config && this.config.identifier ? this.config.identifier : undefined;
        }
    }]);

    return CoreStore;
}(_events.EventEmitter);

exports.default = CoreStore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJyZXNlcnZlZE5hbWVzIiwiX2luc3RhbmNlcyIsIkNvcmVTdG9yZSIsImNvbmZpZyIsImRhdGEiLCJJbW11dGFibGUiLCJNYXAiLCJzdGF0dXMiLCJlcnJvciIsInBlbmRpbmdFdmVudHMiLCJjdXN0b21IYW5kbGVyIiwiYnVpbGREZWZpbml0aW9uIiwiYnVpbGRFYWNoTm9kZUNoYW5nZUV2ZW50TGlzdGVuZXIiLCJyZWdpc3RlckRpc3BhdGNoZXIiLCJfX0RFVl9fIiwiX3JlZ2lzdGVyRGV2VG9vbHMiLCJwdXNoIiwiZGVmaW5pdGlvbiIsIkVycm9yIiwicHJvcGVydGllcyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJlbHQiLCJyZXNlcnZlZFByb3BlcnRpZXMiLCJyZWR1Y2UiLCJhY2MiLCJjb25jYXQiLCJ3IiwibGVuZ3RoIiwiam9pbiIsInRvSlMiLCJkZWYiLCJoYXMiLCJnZXQiLCJ1bmRlZmluZWQiLCJldnRUb0VtaXQiLCJuYW1lIiwiZW1pdCIsImV2ZW50TmFtZSIsInJlc3VsdCIsImN1cnJlbnQiLCJjdXJyZW50U3RvcmUiLCJjYXBpdGFsaXplRGVmaW5pdGlvbiIsImNiIiwiYWRkTGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsImRhdGFOb2RlIiwiaW5mb3JtYXRpb25zIiwiaW1tdXRhYmxlTm9kZSIsImZyb21KUyIsInNldCIsIndpbGxFbWl0IiwicHJvcGVydHkiLCJoYXNEYXRhIiwicmF3RGF0YSIsInVwZGF0ZVN0YXR1cyIsInN0YXR1c05vZGUiLCJnZXRTdGF0dXMiLCJjb250ZXh0IiwiZW1pdFBlbmRpbmdFdmVudHMiLCJjbGVhclBlbmRpbmdFdmVudHMiLCJpbmNvbWluZ0luZm9zIiwiY2FsbGVySWQiLCJhY3Rpb24iLCJkaXNwYXRjaCIsIkFwcERpc3BhdGNoZXIiLCJyZWdpc3RlciIsInRyYW5zZmVySW5mbyIsImlkZW50aWZpZXIiLCJnbG9iYWxDdXN0b21IYW5kbGVyIiwiY2FsbCIsInR5cGUiLCJvdGhlckluZm9ybWF0aW9ucyIsIl9idWlsZEluZm9ybWF0aW9ucyIsIm5vZGUiLCJkZWxheVBlbmRpbmdFdmVudHMiLCJvbiIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQVpBOzs7QUFjQSxJQUFNQSxnQkFBZ0IsQ0FBQyxPQUFELEVBQVUsUUFBVixDQUF0Qjs7QUFFQSxJQUFNQyxhQUFhLEVBQW5COztBQUVBOzs7O0lBR01DLFM7OztBQUVGOzs7QUFHQSx1QkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUFBOztBQUVoQiwyQ0FBYTtBQUNUQTtBQURTLFNBQWI7QUFHQTtBQUNBLGNBQUtDLElBQUwsR0FBWUMsb0JBQVVDLEdBQVYsQ0FBYyxFQUFkLENBQVo7QUFDQSxjQUFLQyxNQUFMLEdBQWNGLG9CQUFVQyxHQUFWLENBQWMsRUFBZCxDQUFkO0FBQ0EsY0FBS0UsS0FBTCxHQUFhSCxvQkFBVUMsR0FBVixDQUFjLEVBQWQsQ0FBYjtBQUNBLGNBQUtHLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxjQUFLQyxhQUFMLEdBQXFCLDRCQUFPLEVBQVAsRUFBV1AsT0FBT08sYUFBbEIsQ0FBckI7QUFDQTtBQUNBLGNBQUtDLGVBQUw7QUFDQSxjQUFLQyxnQ0FBTDtBQUNBLGNBQUtDLGtCQUFMO0FBQ0EsWUFBSUMsT0FBSixFQUFhO0FBQ1Qsa0JBQUtDLGlCQUFMO0FBQ0g7QUFqQmU7QUFrQm5CO0FBQ0Q7Ozs7OztBQUlBOzRDQUNvQjtBQUNoQmQsdUJBQVdlLElBQVgsQ0FBZ0IsSUFBaEI7QUFDSDtBQUNEOzs7Ozs7OzBDQUlrQjtBQUNkOzs7O0FBSUEsZ0JBQUksQ0FBQyxLQUFLYixNQUFMLENBQVljLFVBQWpCLEVBQTZCO0FBQ3pCLHNCQUFNLElBQUlDLEtBQUosQ0FBVSxnQ0FBVixFQUE0QyxLQUFLZixNQUFqRCxDQUFOO0FBQ0g7QUFD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NkQ7QUFDekQsc0NBQU0sSUFBSXpELEtBQUosb0RBQTJEc0QsSUFBM0QsU0FBbUUsMEJBQVdHLElBQVgsQ0FBbkUsT0FBTjtBQUNIO0FBQ0RqQyw4Q0FBZ0I4QixJQUFoQixHQUF1QiwwQkFBV0csSUFBWCxDQUF2QixFQUEyQ3BCLFFBQVFvQixJQUFSLENBQTNDLEVBQTBEcEUsT0FBT29FLElBQVAsQ0FBMUQsRUFBd0VGLGlCQUF4RTtBQUNIO0FBQ0o7QUFDSjtBQUNEL0IsNkJBQWFrQyxrQkFBYixDQUFnQ2xDLFlBQWhDO0FBQ0gsYUFuQ2UsQ0FBaEI7QUFvQ0g7QUFDRDs7Ozs7Ozs7b0NBS1lILFMsRUFBV0ssRSxFQUFJO0FBQ3ZCLGlCQUFLaUMsRUFBTCxDQUFRdEMsU0FBUixFQUFtQkssRUFBbkI7QUFDSDs7OzRCQW5RZ0I7QUFDYiw2QkFBVzNDLFVBQVg7QUFDSDs7OzRCQXFDZ0I7QUFDYixtQkFBTyxLQUFLRSxNQUFMLElBQWUsS0FBS0EsTUFBTCxDQUFZa0UsVUFBM0IsR0FBd0MsS0FBS2xFLE1BQUwsQ0FBWWtFLFVBQXBELEdBQWlFbEMsU0FBeEU7QUFDSDs7OztFQWxFbUIyQyxvQjs7a0JBOFJUNUUsUyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBmaWxlbmFtZXMvbWF0Y2gtcmVnZXggKi9cclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcclxuaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcclxuXHJcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC9sYW5nL2lzQXJyYXknO1xyXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdsb2Rhc2gvbGFuZy9pc0Z1bmN0aW9uJztcclxuXHJcbmltcG9ydCBkZWZlciBmcm9tICdsb2Rhc2gvZnVuY3Rpb24vZGVmZXInO1xyXG5cclxuaW1wb3J0IGludGVyc2VjdGlvbiBmcm9tICdsb2Rhc2gvYXJyYXkvaW50ZXJzZWN0aW9uJztcclxuaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnbG9kYXNoL3N0cmluZy9jYXBpdGFsaXplJztcclxuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xyXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi9kaXNwYXRjaGVyJztcclxuXHJcbmNvbnN0IHJlc2VydmVkTmFtZXMgPSBbJ0Vycm9yJywgJ1N0YXR1cyddO1xyXG5cclxuY29uc3QgX2luc3RhbmNlcyA9IFtdO1xyXG5cclxuLyoqXHJcbiogQGNsYXNzIENvcmVTdG9yZVxyXG4qL1xyXG5jbGFzcyBDb3JlU3RvcmUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDb250cnVjdG9yIG9mIHRoZSBzdG9yZSBjbGFzcy5cclxuICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGFzc2lnbih0aGlzLCB7XHJcbiAgICAgICAgICAgIGNvbmZpZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vSW5pdGlhbGl6ZSB0aGUgZGF0YSBhcyBpbW11dGFibGUgbWFwLlxyXG4gICAgICAgIHRoaXMuZGF0YSA9IEltbXV0YWJsZS5NYXAoe30pO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gSW1tdXRhYmxlLk1hcCh7fSk7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IEltbXV0YWJsZS5NYXAoe30pO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tSGFuZGxlciA9IGFzc2lnbih7fSwgY29uZmlnLmN1c3RvbUhhbmRsZXIpO1xyXG4gICAgICAgIC8vUmVnaXN0ZXIgYWxsIGdlcm5lcmF0ZWQgbWV0aG9kcy5cclxuICAgICAgICB0aGlzLmJ1aWxkRGVmaW5pdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYnVpbGRFYWNoTm9kZUNoYW5nZUV2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRGlzcGF0Y2hlcigpO1xyXG4gICAgICAgIGlmIChfX0RFVl9fKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyRGV2VG9vbHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBHZXQgYWxsIHRoZSBpbnN0YW5jZXMgb2YgY29yZSBzdG9yZS5cclxuICAgIGdldCBfaW5zdGFuY2VzKCkge1xyXG4gICAgICAgIHJldHVybiBbLi4uX2luc3RhbmNlc107XHJcbiAgICB9XHJcbiAgICAvLyByZWdpc3RlciB0aGUgaW5zdGFuY2VzIHNhdmluZ1xyXG4gICAgX3JlZ2lzdGVyRGV2VG9vbHMoKSB7XHJcbiAgICAgICAgX2luc3RhbmNlcy5wdXNoKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEluaXRpYWxpemUgdGhlIHN0b3JlIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBzdG9yZUNvbmZpZ3VyYXRpb24gLSBUaGUgc3RvcmUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGluaXRpYWxpemF0aW9uLlxyXG4gICAgKi9cclxuICAgIGJ1aWxkRGVmaW5pdGlvbigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIEJ1aWxkIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIGVudGl0eSAobWF5IGJlIGEgc3ViamVjdC4pXHJcbiAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5kZWZpbml0aW9uKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29yZSBTdG9yZTogbWlzc2luZyBkZWZpbml0aW9uJywgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRlZmluaXRpb24gPSB0aGlzLmNvbmZpZy5kZWZpbml0aW9uO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXModGhpcy5kZWZpbml0aW9uKS5tYXAoZWx0ID0+IGNhcGl0YWxpemUoZWx0KSk7XHJcbiAgICAgICAgY29uc3QgcmVzZXJ2ZWRQcm9wZXJ0aWVzID0gcHJvcGVydGllcy5yZWR1Y2UoKGFjYywgZWx0KSA9PiBhY2MuY29uY2F0KHJlc2VydmVkTmFtZXMubWFwKHcgPT4gdyArIGVsdCkpLCBbXSk7XHJcbiAgICAgICAgaWYgKGludGVyc2VjdGlvbihwcm9wZXJ0aWVzLCByZXNlcnZlZFByb3BlcnRpZXMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBZb3UgaGF2ZSBhIG5hbWUgY29sbGlzaW9uIGludG8gdGhpcyBzdG9yZSA6IHlvdSBjYW5ub3QgdXNlIGEgbm9kZSBuYW1lZCBCbGFibGEgYW5kIGFub3RlciBuYW1lZCBFcnJvckJsYWJsYSwgb3IgU3RhdHVzQmxhYmxhIDogJHtpbnRlcnNlY3Rpb24ocHJvcGVydGllcywgcmVzZXJ2ZWRQcm9wZXJ0aWVzKS5qb2luKCcgJyl9IGApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kZWZpbml0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgd2hvbGUgdmFsdWUgb2YgdGhlXHJcbiAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEgPyB0aGlzLmRhdGEudG9KUygpIDoge307XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogR2V0dGVyIG9uIHRoZSBpZGVudGlmaWVyIHByb3BlcnR5LlxyXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gU3RvcmUgaWRlbnRpZmllci5cclxuICAgICovXHJcbiAgICBnZXQgaWRlbnRpZmllcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcuaWRlbnRpZmllciA/IHRoaXMuY29uZmlnLmlkZW50aWZpZXIgOiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICAvKiogUmV0dXJuIHRoZSBzdGF0dXMgb2YgYSBkZWZpbml0aW9uLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gLSBUaGUgZGVmaW5pdGlvbiB0byBsb2FkLlxyXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIFRoZSBzdGF0dXMgb2YgYSBkZWZpbml0aW9uLlxyXG4gICAgKi9cclxuICAgIGdldFN0YXR1cyhkZWYpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0dXMuaGFzKGRlZikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHVzLmdldChkZWYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEVtaXQgYWxsIGV2ZW50cyBwZW5kaW5nIGluIHRoZSBwZW5kaW5nRXZlbnRzIG1hcC5cclxuICAgICovXHJcbiAgICBlbWl0UGVuZGluZ0V2ZW50cygpIHtcclxuICAgICAgICB0aGlzLnBlbmRpbmdFdmVudHMubWFwKChldnRUb0VtaXQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHsgbmFtZSwgZGF0YSB9ID0gZXZ0VG9FbWl0O1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQobmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlcGxhY2UgdGhlIGVtaXQgZnVuY3Rpb24gd2l0aCBhIHdpbGxFbWl0IGluIG90ZGVyIHRvIHN0b3JlIHRoZSBjaGFuZ2luZyBldmVudCBidXQgc2VuZCBpdCBhZnRlcndhcmRzLlxyXG4gICAgKiBAcGFyYW0gZXZlbnROYW1lIHtzdHJpbmd9IC0gVGhlIGV2ZW50IG5hbWUuXHJcbiAgICAqIEBwYXJhbSAgZGF0YSB7b2JqZWN0fSAtIFRoZSBldmVudCdzIGFzc29jaWF0ZWQgZGF0YS5cclxuICAgICovXHJcbiAgICB3aWxsRW1pdChldmVudE5hbWUsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLnBlbmRpbmdFdmVudHMgPSB0aGlzLnBlbmRpbmdFdmVudHMucmVkdWNlKChyZXN1bHQsIGN1cnJlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQubmFtZSAhPT0gZXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjdXJyZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sIFt7IG5hbWU6IGV2ZW50TmFtZSwgZGF0YTogZGF0YSB9XSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENsZWFyIGFsbCBwZW5kaW5nIGV2ZW50cy5cclxuICAgICovXHJcbiAgICBjbGVhclBlbmRpbmdFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nRXZlbnRzID0gW107XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogQnVpbGQgYSBjaGFuZ2UgbGlzdGVuZXIgZm9yIGVhY2ggcHJvcGVydHkgaW4gdGhlIGRlZmluaXRpb24uIChzaG91bGQgYmUgbWFjcm8gZW50aXRpZXMpO1xyXG4gICAgKi9cclxuICAgIGJ1aWxkRWFjaE5vZGVDaGFuZ2VFdmVudExpc3RlbmVyKCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdG9yZSA9IHRoaXM7XHJcbiAgICAgICAgLy9Mb29wIHRocm91Z2ggZWFjaCBzdG9yZSBwcm9wZXJ0aWVzLlxyXG4gICAgICAgIGZvciAobGV0IGRlZmluaXRpb24gaW4gdGhpcy5kZWZpbml0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcGl0YWxpemVEZWZpbml0aW9uID0gY2FwaXRhbGl6ZShkZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgLy9DcmVhdGVzIHRoZSBjaGFuZ2UgbGlzdGVuZXJcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2BhZGQke2NhcGl0YWxpemVEZWZpbml0aW9ufUNoYW5nZUxpc3RlbmVyYF0gPSAoZnVuY3Rpb24gKGRlZikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS5hZGRMaXN0ZW5lcihgJHtkZWZ9OmNoYW5nZWAsIGNiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfShkZWZpbml0aW9uKSk7XHJcbiAgICAgICAgICAgIC8vUmVtb3ZlIHRoZSBjaGFuZ2UgbGlzdGVuZXJcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2ByZW1vdmUke2NhcGl0YWxpemVEZWZpbml0aW9ufUNoYW5nZUxpc3RlbmVyYF0gPSAoZnVuY3Rpb24gKGRlZikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS5yZW1vdmVMaXN0ZW5lcihgJHtkZWZ9OmNoYW5nZWAsIGNiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfShkZWZpbml0aW9uKSk7XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGFuIHVwZGF0ZSBtZXRob2QuXHJcbiAgICAgICAgICAgIC8vU2hvdWxkIGJlIG5hbWVkIHVwZGF0ZURhdGEgdG8gYmUgbW9yZSBleHBsaWNpdFxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFN0b3JlW2B1cGRhdGUke2NhcGl0YWxpemVEZWZpbml0aW9ufWBdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZVtgdXBkYXRlJHtjYXBpdGFsaXplRGVmaW5pdGlvbn1gXSA9IChmdW5jdGlvbiAoZGVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhTm9kZSwgc3RhdHVzLCBpbmZvcm1hdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1tdXRhYmxlTm9kZSA9IGlzRnVuY3Rpb24oZGF0YU5vZGUpID8gZGF0YU5vZGUgOiBJbW11dGFibGUuZnJvbUpTKGRhdGFOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0b3JlLmRhdGEgPSBjdXJyZW50U3RvcmUuZGF0YS5zZXQoZGVmLCBpbW11dGFibGVOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9VcGRhdGUgdGhlIHN0YXR1cyBvbiB0aGUgZGF0YS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0b3JlLnN0YXR1cyA9IGN1cnJlbnRTdG9yZS5zdGF0dXMuc2V0KGRlZiwgc3RhdHVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS53aWxsRW1pdChgJHtkZWZ9OmNoYW5nZWAsIHsgcHJvcGVydHk6IGRlZiwgc3RhdHVzOiBzdGF0dXMsIGluZm9ybWF0aW9uczogaW5mb3JtYXRpb25zIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0oZGVmaW5pdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhIGdldCBtZXRob2QuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RvcmVbYGdldCR7Y2FwaXRhbGl6ZURlZmluaXRpb259YF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFN0b3JlW2BnZXQke2NhcGl0YWxpemVEZWZpbml0aW9ufWBdID0gKGZ1bmN0aW9uIChkZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNEYXRhID0gY3VycmVudFN0b3JlLmRhdGEuaGFzKGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYXdEYXRhID0gY3VycmVudFN0b3JlLmRhdGEuZ2V0KGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF3RGF0YSAmJiByYXdEYXRhLnRvSlMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmF3RGF0YS50b0pTKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmF3RGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KGRlZmluaXRpb24pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0NyZWF0ZXMgdGhlIGVycm9yIGNoYW5nZSBsaXN0ZW5lclxyXG4gICAgICAgICAgICBjdXJyZW50U3RvcmVbYGFkZCR7Y2FwaXRhbGl6ZURlZmluaXRpb259RXJyb3JMaXN0ZW5lcmBdID0gKGZ1bmN0aW9uIChkZWYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUuYWRkTGlzdGVuZXIoYCR7ZGVmfTplcnJvcmAsIGNiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfShkZWZpbml0aW9uKSk7XHJcbiAgICAgICAgICAgIC8vUmVtb3ZlIHRoZSBjaGFuZ2UgbGlzdGVuZXJcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2ByZW1vdmUke2NhcGl0YWxpemVEZWZpbml0aW9ufUVycm9yTGlzdGVuZXJgXSA9IChmdW5jdGlvbiAoZGVmKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0b3JlLnJlbW92ZUxpc3RlbmVyKGAke2RlZn06ZXJyb3JgLCBjYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0oZGVmaW5pdGlvbikpO1xyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhbiB1cGRhdGUgbWV0aG9kLlxyXG4gICAgICAgICAgICBjdXJyZW50U3RvcmVbYHVwZGF0ZUVycm9yJHtjYXBpdGFsaXplRGVmaW5pdGlvbn1gXSA9IChmdW5jdGlvbiAoZGVmKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGFOb2RlLCBzdGF0dXMsIGluZm9ybWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ2hlY2tJc09iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltbXV0YWJsZU5vZGUgPSBJbW11dGFibGVbaXNBcnJheShkYXRhTm9kZSkgPyAnTGlzdCcgOiAnTWFwJ10oZGF0YU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS5lcnJvciA9IGN1cnJlbnRTdG9yZS5lcnJvci5zZXQoZGVmLCBpbW11dGFibGVOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUuc3RhdHVzID0gY3VycmVudFN0b3JlLnN0YXR1cy5zZXQoZGVmLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS53aWxsRW1pdChgJHtkZWZ9OmVycm9yYCwgeyBwcm9wZXJ0eTogZGVmLCBzdGF0dXM6IHN0YXR1cywgaW5mb3JtYXRpb25zOiBpbmZvcm1hdGlvbnMgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0oZGVmaW5pdGlvbikpO1xyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhIGdldCBtZXRob2QuXHJcbiAgICAgICAgICAgIGN1cnJlbnRTdG9yZVtgZ2V0RXJyb3Ike2NhcGl0YWxpemVEZWZpbml0aW9ufWBdID0gKGZ1bmN0aW9uIChkZWYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzRGF0YSA9IGN1cnJlbnRTdG9yZS5lcnJvci5oYXMoZGVmKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzRGF0YSA/IGN1cnJlbnRTdG9yZS5lcnJvci5nZXQoZGVmKS50b0pTKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KGRlZmluaXRpb24pKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBzdGF0dXNcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2BhZGQke2NhcGl0YWxpemVEZWZpbml0aW9ufVN0YXR1c0xpc3RlbmVyYF0gPSAoZnVuY3Rpb24gKGRlZikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS5hZGRMaXN0ZW5lcihgJHtkZWZ9OnN0YXR1c2AsIGNiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfShkZWZpbml0aW9uKSk7XHJcbiAgICAgICAgICAgIC8vUmVtb3ZlIHRoZSBjaGFuZ2UgbGlzdGVuZXJcclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2ByZW1vdmUke2NhcGl0YWxpemVEZWZpbml0aW9ufVN0YXR1c0xpc3RlbmVyYF0gPSAoZnVuY3Rpb24gKGRlZikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS5yZW1vdmVMaXN0ZW5lcihgJHtkZWZ9OnN0YXR1c2AsIGNiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfShkZWZpbml0aW9uKSk7XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGFuIHVwZGF0ZSBtZXRob2QuXHJcbiAgICAgICAgICAgIGN1cnJlbnRTdG9yZVtgdXBkYXRlU3RhdHVzJHtjYXBpdGFsaXplRGVmaW5pdGlvbn1gXSA9IChmdW5jdGlvbiAoZGVmKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3RhdHVzKGRhdGFOb2RlLCBzdGF0dXMsIGluZm9ybWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ2hlY2tJc09iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYHN0YXR1cyAgJHtKU09OLnN0cmluZ2lmeShzdGF0dXMpIH1gKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNOb2RlID0gc3RhdHVzOy8vSW1tdXRhYmxlLmZyb21KUyhzdGF0dXMpOyAvLyBtTWF5YmUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBzdGF0dXMgb25seS5cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUuc3RhdHVzID0gY3VycmVudFN0b3JlLnN0YXR1cy5zZXQoZGVmLCBzdGF0dXNOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUud2lsbEVtaXQoYCR7ZGVmfTpzdGF0dXNgLCB7IHByb3BlcnR5OiBkZWYsIHN0YXR1czogc3RhdHVzLCBpbmZvcm1hdGlvbnM6IGluZm9ybWF0aW9ucyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfShkZWZpbml0aW9uKSk7XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgZ2V0IG1ldGhvZC5cclxuICAgICAgICAgICAgY3VycmVudFN0b3JlW2BnZXRTdGF0dXMke2NhcGl0YWxpemVEZWZpbml0aW9ufWBdID0gKGZ1bmN0aW9uIChkZWYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBnZXRTdGF0dXMoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzRGF0YSA9IGN1cnJlbnRTdG9yZS5zdGF0dXMuaGFzKGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGhhc0RhdGEgPyBjdXJyZW50U3RvcmUuc3RhdHVzLmdldChkZWYpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRvSlMgPyBkYXRhLnRvSlMoKSA6IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KGRlZmluaXRpb24pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsYXlQZW5kaW5nRXZlbnRzKGNvbnRleHQpIHtcclxuICAgICAgICAvL0RlbGF5IGFsbCB0aGUgY2hhbmdlIGVtaXQgYnkgdGhlIHN0b3JlIHRvIGJlIHN1cmUgaXQgaXMgZG9uZSBhZnRlciB0aGUgaW50ZXJuYWwgc3RvcmUgcHJvcGFnYXRpb24gYW5kIHRvIGdvIG91dCBvZiB0aGUgZGlzcGF0Y2ggZnVuY3Rpb24uXHJcbiAgICAgICAgZGVmZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250ZXh0LmVtaXRQZW5kaW5nRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJQZW5kaW5nRXZlbnRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfYnVpbGRJbmZvcm1hdGlvbnMoaW5jb21pbmdJbmZvcykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNhbGxlcklkOiBpbmNvbWluZ0luZm9zLmFjdGlvbi5jYWxsZXJJZFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogVGhlIHN0b3JlIHJlZ2lzdHJlciBpdHNlbGYgb24gdGhlIGRpc3BhdGNoZXIuXHJcbiAgICAqL1xyXG4gICAgcmVnaXN0ZXJEaXNwYXRjaGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdG9yZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaCA9IEFwcERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24gKHRyYW5zZmVySW5mbykge1xyXG4gICAgICAgICAgICAvL0NoZWNrIGlmIGFuIGlkZW50aWZpZXIgY2hlY2sgaXMgbmVjZXNzYXJ5LlxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFN0b3JlLmlkZW50aWZpZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vSWYgYW4gaWRlbnRpZmllciBpcyBuZWVkZWQgYSBjaGVjayBpcyB0cmlnZ2VyZWQuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRyYW5zZmVySW5mbyB8fCAhdHJhbnNmZXJJbmZvLmFjdGlvbiB8fCAhdHJhbnNmZXJJbmZvLmFjdGlvbi5pZGVudGlmaWVyIHx8IHRyYW5zZmVySW5mby5hY3Rpb24uaWRlbnRpZmllciAhPT0gY3VycmVudFN0b3JlLmlkZW50aWZpZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jdXJyZW50U3RvcmUuY2xlYXJQZW5kaW5nRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RvcmUuZ2xvYmFsQ3VzdG9tSGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTdG9yZS5nbG9iYWxDdXN0b21IYW5kbGVyLmNhbGwoY3VycmVudFN0b3JlLCB0cmFuc2ZlckluZm8pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1JlYWQgZGF0YSBmcm9tIHRoZSBhY3Rpb24gdHJhbnNmZXIgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgIGNvbnN0IHJhd0RhdGEgPSB0cmFuc2ZlckluZm8uYWN0aW9uLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHRyYW5zZmVySW5mby5hY3Rpb24uc3RhdHVzIHx8IHt9O1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdHJhbnNmZXJJbmZvLmFjdGlvbi50eXBlO1xyXG4gICAgICAgICAgICBjb25zdCBvdGhlckluZm9ybWF0aW9ucyA9IGN1cnJlbnRTdG9yZS5fYnVpbGRJbmZvcm1hdGlvbnModHJhbnNmZXJJbmZvKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2FsbCBlYWNoIG5vZGUgaGFuZGxlciBmb3IgdGhlIG1hdGNoaW5nIGRlZmluaXRpb24ncyBub2RlLlxyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIGluIHJhd0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3RvcmUuZGVmaW5pdGlvbltub2RlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ2FsbCBhIGN1c3RvbSBoYW5kbGVyIGlmIHRoaXMgZXhpc3RzLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3RvcmUuY3VzdG9tSGFuZGxlciAmJiBjdXJyZW50U3RvcmUuY3VzdG9tSGFuZGxlcltub2RlXSAmJiBjdXJyZW50U3RvcmUuY3VzdG9tSGFuZGxlcltub2RlXVt0eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUuY3VzdG9tSGFuZGxlcltub2RlXVt0eXBlXS5jYWxsKGN1cnJlbnRTdG9yZSwgcmF3RGF0YVtub2RlXSwgc3RhdHVzW25vZGVdLCBvdGhlckluZm9ybWF0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9VcGRhdGUgdGhlIGRhdGEgZm9yIHRoZSBnaXZlbiBub2RlLiBhbmQgZW1pdCB0aGUgY2hhbmdlLy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKGN1cnJlbnRTdG9yZVtgJHt0eXBlfSR7Y2FwaXRhbGl6ZShub2RlKX1gXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGxpc3RlbmVyIHlvdSB0cnkgdG8gY2FsbCBpcyB1bmF2YWlsYWJsZSA6ICR7dHlwZX0gJHtjYXBpdGFsaXplKG5vZGUpfSBgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmVbYCR7dHlwZX0ke2NhcGl0YWxpemUobm9kZSl9YF0ocmF3RGF0YVtub2RlXSwgc3RhdHVzW25vZGVdLCBvdGhlckluZm9ybWF0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdG9yZS5kZWxheVBlbmRpbmdFdmVudHMoY3VycmVudFN0b3JlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBBZGQgYSBsaXN0ZW5lciBvbiBhIHN0b3JlIGV2ZW50LlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gICBldmVudE5hbWUgLSBFdmVudCBuYW1lLlxyXG4gICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIENhbGxCYWNrIHRvIGNhbGwgb24gdGhlIGV2ZW50IGNoYW5nZSBuYW1lLlxyXG4gICAgKi9cclxuICAgIGFkZExpc3RlbmVyKGV2ZW50TmFtZSwgY2IpIHtcclxuICAgICAgICB0aGlzLm9uKGV2ZW50TmFtZSwgY2IpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IENvcmVTdG9yZTtcclxuIl19