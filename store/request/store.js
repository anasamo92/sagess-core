'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _CoreStore2 = require('../CoreStore');

var _CoreStore3 = _interopRequireDefault(_CoreStore2);

var _definition = require('./definition');

var _definition2 = _interopRequireDefault(_definition);

var _uuid = require('uuid');

var _dispatcher = require('../../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Dependencies.


var CLEAR = 'clear';
var UPDATE = 'update';

/**
 * Class standing for the cartridge store.
 */
var RequestStore = function (_CoreStore) {
    _inherits(RequestStore, _CoreStore);

    /**
    * Add a listener on the global change on the search store.
    * @param {object} conf - The configuration of the request store.
    */
    function RequestStore(conf) {
        _classCallCheck(this, RequestStore);

        conf = conf || {};
        conf.definition = conf.definition || (0, _definition2.default)();

        var _this = _possibleConstructorReturn(this, (RequestStore.__proto__ || Object.getPrototypeOf(RequestStore)).call(this, conf));

        _this.pending = _immutable2.default.Map({});
        _this.success = _immutable2.default.Map({});
        _this.error = _immutable2.default.Map({});
        _this.cancelled = _immutable2.default.Map({});
        return _this;
    }
    /**
    * Get a message from its identifier.
    * @param {string} messageId - The message identifier.
    * @returns {object} - The requested message.
    */


    _createClass(RequestStore, [{
        key: 'getRequest',
        value: function getRequest(requestId) {
            if (!this.data.has(requestId)) {
                return undefined;
            }
            return this.data.get(requestId);
        }
        /**
        * Get the requests by type
        * @return {object} An object with the total of request by type.
        */

    }, {
        key: 'getRequests',
        value: function getRequests() {
            return {
                pending: this.pending.size,
                cancelled: this.cancelled.size,
                success: this.success.size,
                error: this.error.size,
                total: this.pending.size + this.cancelled.size + this.success.size + this.error.size
            };
        }
        /**
        * Add a listener on the global change on the search store.
        * @param {object} message - The message to add.
        */

    }, {
        key: 'updateRequest',
        value: function updateRequest(request) {
            request.id = request.id || '' + (0, _uuid.v4)();
            //If the status is supported
            if (this.definition[request.status]) {
                //Update the associated collection
                this[request.status] = this[request.status].set(request.id, request);
                //Remove the associated request from pending
                if (request.status !== 'pending' && this.pending.has(request.id)) {
                    this.pending = this.pending.delete(request.id);
                }
            }
            this.emit(UPDATE, request.id);
        }
        /**
        * Clear all messages in the stack.
        */

    }, {
        key: 'clearRequests',
        value: function clearRequests() {
            this.data = this.data.clear();
            this.emit(CLEAR);
        }
        /**
        * Add a listener on the global change on the search store.
        * @param {function} cb - The callback to call when a message is pushed.
        */

    }, {
        key: 'addUpdateRequestListener',
        value: function addUpdateRequestListener(cb) {
            this.addListener(UPDATE, cb);
        }
        /**
        * Remove a listener on the global change on the search store.
        * @param {function} cb - The callback to called when a message is pushed.
        */

    }, {
        key: 'removeUpdateRequestListener',
        value: function removeUpdateRequestListener(cb) {
            this.removeListener(UPDATE, cb);
        }

        /**
        * Add a listener on the global change on the search store.
        * @param {function} cb - The callback to call when a message is pushed.
        */

    }, {
        key: 'addClearRequestsListener',
        value: function addClearRequestsListener(cb) {
            this.addListener(CLEAR, cb);
        }
        /**
        * Remove a listener on the global change on the search store.
        * @param {function} cb - The callback to called when a message is pushed.
        */

    }, {
        key: 'removeClearRequestsListener',
        value: function removeClearRequestsListener(cb) {
            this.removeListener(CLEAR, cb);
        }
    }, {
        key: 'registerDispatcher',
        value: function registerDispatcher() {
            var currentStore = this;
            this.dispatch = _dispatcher2.default.register(function (transferInfo) {
                var rawData = transferInfo.action.data;
                var type = transferInfo.action.type;
                if (!rawData || !rawData.request) {
                    return;
                }
                switch (type) {
                    case 'update':
                        if (rawData.request) {
                            currentStore.updateRequest(rawData.request);
                        }
                        break;
                    case 'clear':
                        if (rawData.request) {
                            currentStore.clearRequests();
                        }
                        break;
                }
            });
        }
    }]);

    return RequestStore;
}(_CoreStore3.default);

exports.default = RequestStore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJDTEVBUiIsIlVQREFURSIsIlJlcXVlc3RTdG9yZSIsImNvbmYiLCJkZWZpbml0aW9uIiwicGVuZGluZyIsIkltbXV0YWJsZSIsIk1hcCIsInN1Y2Nlc3MiLCJlcnJvciIsImNhbmNlbGxlZCIsInJlcXVlc3RJZCIsImRhdGEiLCJoYXMiLCJ1bmRlZmluZWQiLCJnZXQiLCJzaXplIiwidG90YWwiLCJyZXF1ZXN0IiwiaWQiLCJzdGF0dXMiLCJzZXQiLCJkZWxldGUiLCJlbWl0IiwiY2xlYXIiLCJjYiIsImFkZExpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJjdXJyZW50U3RvcmUiLCJkaXNwYXRjaCIsIkFwcERpc3BhdGNoZXIiLCJyZWdpc3RlciIsInRyYW5zZmVySW5mbyIsInJhd0RhdGEiLCJhY3Rpb24iLCJ0eXBlIiwidXBkYXRlUmVxdWVzdCIsImNsZWFyUmVxdWVzdHMiLCJDb3JlU3RvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7K2VBUEE7OztBQUtBLElBQU1BLFFBQVEsT0FBZDtBQUNBLElBQU1DLFNBQVMsUUFBZjs7QUFHQTs7O0lBR01DLFk7OztBQUNGOzs7O0FBSUEsMEJBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFDZEEsZUFBT0EsUUFBUSxFQUFmO0FBQ0FBLGFBQUtDLFVBQUwsR0FBa0JELEtBQUtDLFVBQUwsSUFBbUIsMkJBQXJDOztBQUZjLGdJQUdSRCxJQUhROztBQUlkLGNBQUtFLE9BQUwsR0FBZUMsb0JBQVVDLEdBQVYsQ0FBYyxFQUFkLENBQWY7QUFDQSxjQUFLQyxPQUFMLEdBQWVGLG9CQUFVQyxHQUFWLENBQWMsRUFBZCxDQUFmO0FBQ0EsY0FBS0UsS0FBTCxHQUFhSCxvQkFBVUMsR0FBVixDQUFjLEVBQWQsQ0FBYjtBQUNBLGNBQUtHLFNBQUwsR0FBaUJKLG9CQUFVQyxHQUFWLENBQWMsRUFBZCxDQUFq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QUFpQkg7Ozs7RUE5R3NCQyxtQjs7a0JBaUhacEMsWSIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RlcGVuZGVuY2llcy5cclxuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xyXG5pbXBvcnQgQ29yZVN0b3JlIGZyb20gJy4uL0NvcmVTdG9yZSc7XHJcbmltcG9ydCBnZXREZWZpbml0aW9uIGZyb20gJy4vZGVmaW5pdGlvbic7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcclxuY29uc3QgQ0xFQVIgPSAnY2xlYXInO1xyXG5jb25zdCBVUERBVEUgPSAndXBkYXRlJztcclxuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi4vLi4vZGlzcGF0Y2hlcic7XHJcblxyXG4vKipcclxuICogQ2xhc3Mgc3RhbmRpbmcgZm9yIHRoZSBjYXJ0cmlkZ2Ugc3RvcmUuXHJcbiAqL1xyXG5jbGFzcyBSZXF1ZXN0U3RvcmUgZXh0ZW5kcyBDb3JlU3RvcmUge1xyXG4gICAgLyoqXHJcbiAgICogQWRkIGEgbGlzdGVuZXIgb24gdGhlIGdsb2JhbCBjaGFuZ2Ugb24gdGhlIHNlYXJjaCBzdG9yZS5cclxuICAgKiBAcGFyYW0ge29iamVjdH0gY29uZiAtIFRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSByZXF1ZXN0IHN0b3JlLlxyXG4gICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29uZikge1xyXG4gICAgICAgIGNvbmYgPSBjb25mIHx8IHt9O1xyXG4gICAgICAgIGNvbmYuZGVmaW5pdGlvbiA9IGNvbmYuZGVmaW5pdGlvbiB8fCBnZXREZWZpbml0aW9uKCk7XHJcbiAgICAgICAgc3VwZXIoY29uZik7XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gSW1tdXRhYmxlLk1hcCh7fSk7XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzID0gSW1tdXRhYmxlLk1hcCh7fSk7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IEltbXV0YWJsZS5NYXAoe30pO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsbGVkID0gSW1tdXRhYmxlLk1hcCh7fSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgKiBHZXQgYSBtZXNzYWdlIGZyb20gaXRzIGlkZW50aWZpZXIuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VJZCAtIFRoZSBtZXNzYWdlIGlkZW50aWZpZXIuXHJcbiAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUgcmVxdWVzdGVkIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgICBnZXRSZXF1ZXN0KHJlcXVlc3RJZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kYXRhLmhhcyhyZXF1ZXN0SWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KHJlcXVlc3RJZCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgKiBHZXQgdGhlIHJlcXVlc3RzIGJ5IHR5cGVcclxuICAgKiBAcmV0dXJuIHtvYmplY3R9IEFuIG9iamVjdCB3aXRoIHRoZSB0b3RhbCBvZiByZXF1ZXN0IGJ5IHR5cGUuXHJcbiAgICovXHJcbiAgICBnZXRSZXF1ZXN0cygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwZW5kaW5nOiB0aGlzLnBlbmRpbmcuc2l6ZSxcclxuICAgICAgICAgICAgY2FuY2VsbGVkOiB0aGlzLmNhbmNlbGxlZC5zaXplLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiB0aGlzLnN1Y2Nlc3Muc2l6ZSxcclxuICAgICAgICAgICAgZXJyb3I6IHRoaXMuZXJyb3Iuc2l6ZSxcclxuICAgICAgICAgICAgdG90YWw6IHRoaXMucGVuZGluZy5zaXplICsgdGhpcy5jYW5jZWxsZWQuc2l6ZSArIHRoaXMuc3VjY2Vzcy5zaXplICsgdGhpcy5lcnJvci5zaXplXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAqIEFkZCBhIGxpc3RlbmVyIG9uIHRoZSBnbG9iYWwgY2hhbmdlIG9uIHRoZSBzZWFyY2ggc3RvcmUuXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBhZGQuXHJcbiAgICovXHJcbiAgICB1cGRhdGVSZXF1ZXN0KHJlcXVlc3QpIHtcclxuICAgICAgICByZXF1ZXN0LmlkID0gcmVxdWVzdC5pZCB8fCBgJHt1dWlkKCl9YDtcclxuICAgICAgICAvL0lmIHRoZSBzdGF0dXMgaXMgc3VwcG9ydGVkXHJcbiAgICAgICAgaWYgKHRoaXMuZGVmaW5pdGlvbltyZXF1ZXN0LnN0YXR1c10pIHtcclxuICAgICAgICAgICAgLy9VcGRhdGUgdGhlIGFzc29jaWF0ZWQgY29sbGVjdGlvblxyXG4gICAgICAgICAgICB0aGlzW3JlcXVlc3Quc3RhdHVzXSA9IHRoaXNbcmVxdWVzdC5zdGF0dXNdLnNldChyZXF1ZXN0LmlkLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgLy9SZW1vdmUgdGhlIGFzc29jaWF0ZWQgcmVxdWVzdCBmcm9tIHBlbmRpbmdcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAncGVuZGluZycgJiYgdGhpcy5wZW5kaW5nLmhhcyhyZXF1ZXN0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nID0gdGhpcy5wZW5kaW5nLmRlbGV0ZShyZXF1ZXN0LmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVtaXQoVVBEQVRFLCByZXF1ZXN0LmlkKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAqIENsZWFyIGFsbCBtZXNzYWdlcyBpbiB0aGUgc3RhY2suXHJcbiAgICovXHJcbiAgICBjbGVhclJlcXVlc3RzKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZW1pdChDTEVBUik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgKiBBZGQgYSBsaXN0ZW5lciBvbiB0aGUgZ2xvYmFsIGNoYW5nZSBvbiB0aGUgc2VhcmNoIHN0b3JlLlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbiBhIG1lc3NhZ2UgaXMgcHVzaGVkLlxyXG4gICAqL1xyXG4gICAgYWRkVXBkYXRlUmVxdWVzdExpc3RlbmVyKGNiKSB7XHJcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihVUERBVEUsIGNiKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAqIFJlbW92ZSBhIGxpc3RlbmVyIG9uIHRoZSBnbG9iYWwgY2hhbmdlIG9uIHRoZSBzZWFyY2ggc3RvcmUuXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgLSBUaGUgY2FsbGJhY2sgdG8gY2FsbGVkIHdoZW4gYSBtZXNzYWdlIGlzIHB1c2hlZC5cclxuICAgKi9cclxuICAgIHJlbW92ZVVwZGF0ZVJlcXVlc3RMaXN0ZW5lcihjYikge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoVVBEQVRFLCBjYik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICogQWRkIGEgbGlzdGVuZXIgb24gdGhlIGdsb2JhbCBjaGFuZ2Ugb24gdGhlIHNlYXJjaCBzdG9yZS5cclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiAtIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW4gYSBtZXNzYWdlIGlzIHB1c2hlZC5cclxuICAgKi9cclxuICAgIGFkZENsZWFyUmVxdWVzdHNMaXN0ZW5lcihjYikge1xyXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoQ0xFQVIsIGNiKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAqIFJlbW92ZSBhIGxpc3RlbmVyIG9uIHRoZSBnbG9iYWwgY2hhbmdlIG9uIHRoZSBzZWFyY2ggc3RvcmUuXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgLSBUaGUgY2FsbGJhY2sgdG8gY2FsbGVkIHdoZW4gYSBtZXNzYWdlIGlzIHB1c2hlZC5cclxuICAgKi9cclxuICAgIHJlbW92ZUNsZWFyUmVxdWVzdHNMaXN0ZW5lcihjYikge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoQ0xFQVIsIGNiKTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyRGlzcGF0Y2hlcigpIHtcclxuICAgICAgICBsZXQgY3VycmVudFN0b3JlID0gdGhpcztcclxuICAgICAgICB0aGlzLmRpc3BhdGNoID0gQXBwRGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbiAodHJhbnNmZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIGxldCByYXdEYXRhID0gdHJhbnNmZXJJbmZvLmFjdGlvbi5kYXRhO1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IHRyYW5zZmVySW5mby5hY3Rpb24udHlwZTtcclxuICAgICAgICAgICAgaWYgKCFyYXdEYXRhIHx8ICFyYXdEYXRhLnJlcXVlc3QpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndXBkYXRlJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmF3RGF0YS5yZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS51cGRhdGVSZXF1ZXN0KHJhd0RhdGEucmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYXdEYXRhLnJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0b3JlLmNsZWFyUmVxdWVzdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdFN0b3JlO1xyXG4iXX0=