'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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


var PUSH = 'push';
var CLEAR = 'clear';

/**
 * Class standing for the cartridge store.
 */
var MessageStore = function (_CoreStore) {
    _inherits(MessageStore, _CoreStore);

    /**
    * Add a listener on the global change on the search store.
    * @param {object} conf - The configuration of the message store.
    */
    function MessageStore(conf) {
        _classCallCheck(this, MessageStore);

        conf = conf || {};
        conf.definition = conf.definition || (0, _definition2.default)();
        return _possibleConstructorReturn(this, (MessageStore.__proto__ || Object.getPrototypeOf(MessageStore)).call(this, conf));
    }
    /**
    * Get a message from its identifier.
    * @param {string} messageId - The message identifier.
    * @returns {object} - The requested message.
    */


    _createClass(MessageStore, [{
        key: 'getMessage',
        value: function getMessage(messageId) {
            if (!this.data.has(messageId)) {
                return undefined;
            }
            var message = this.data.get(messageId);
            if (!message.isAck) {
                this.deleteMessage(messageId);
            }
            return message;
        }
        /**
        * Delete a message given its id.
        * @param {string} messageId - The message identifier.
        */

    }, {
        key: 'deleteMessage',
        value: function deleteMessage(messageId) {
            if (this.data.has(messageId)) {
                this.data = this.data.delete(messageId);
            }
        }
        /**
        * Add a listener on the global change on the search store.
        * @param {object} message - The message to add.
        */

    }, {
        key: 'pushMessage',
        value: function pushMessage(message) {
            message.id = '' + (0, _uuid.v4)();
            this.data = this.data.set(message.id, message);
            this.emit(PUSH, message.id);
        }
        /**
        * Clear all messages in the stack.
        */

    }, {
        key: 'clearMessages',
        value: function clearMessages() {
            this.data = this.data.clear();
            this.emit(CLEAR);
        }
        /**
        * Add a listener on the global change on the search store.
        * @param {function} cb - The callback to call when a message is pushed.
        */

    }, {
        key: 'addPushedMessageListener',
        value: function addPushedMessageListener(cb) {
            this.addListener(PUSH, cb);
        }
        /**
        * Remove a listener on the global change on the search store.
        * @param {function} cb - The callback to called when a message is pushed.
        */

    }, {
        key: 'removePushedMessageListener',
        value: function removePushedMessageListener(cb) {
            this.removeListener(PUSH, cb);
        }

        /**
        * Add a listener on the global change on the search store.
        * @param {function} cb - The callback to call when a message is pushed.
        */

    }, {
        key: 'addClearMessagesListener',
        value: function addClearMessagesListener(cb) {
            this.addListener(CLEAR, cb);
        }
        /**
        * Remove a listener on the global change on the search store.
        * @param {function} cb - The callback to called when a message is pushed.
        */

    }, {
        key: 'removeClearMessagesListener',
        value: function removeClearMessagesListener(cb) {
            this.removeListener(CLEAR, cb);
        }
    }, {
        key: 'registerDispatcher',
        value: function registerDispatcher() {
            var currentStore = this;
            this.dispatch = _dispatcher2.default.register(function (transferInfo) {
                var rawData = transferInfo.action.data;
                var type = transferInfo.action.type;

                switch (type) {
                    case 'push':
                        if (rawData.message) {
                            currentStore.pushMessage(rawData.message);
                        }
                        break;
                    case 'clear':
                        if (rawData.messages) {
                            currentStore.clearMessages();
                        }
                        break;
                }
            });
        }
    }]);

    return MessageStore;
}(_CoreStore3.default);

exports.default = MessageStore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJQVVNIIiwiQ0xFQVIiLCJNZXNzYWdlU3RvcmUiLCJjb25mIiwiZGVmaW5pdGlvbiIsIm1lc3NhZ2VJZCIsImRhdGEiLCJoYXMiLCJ1bmRlZmluZWQiLCJtZXNzYWdlIiwiZ2V0IiwiaXNBY2siLCJkZWxldGVNZXNzYWdlIiwiZGVsZXRlIiwiaWQiLCJzZXQiLCJlbWl0IiwiY2xlYXIiLCJjYiIsImFkZExpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJjdXJyZW50U3RvcmUiLCJkaXNwYXRjaCIsIkFwcERpc3BhdGNoZXIiLCJyZWdpc3RlciIsInRyYW5zZmVySW5mbyIsInJhd0RhdGEiLCJhY3Rpb24iLCJ0eXBlIiwicHVzaE1lc3NhZ2UiLCJtZXNzYWdlcyIsImNsZWFyTWVzc2FnZXMiLCJDb3JlU3RvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOzs7Ozs7Ozs7OytlQU5BOzs7QUFJQSxJQUFNQSxPQUFPLE1BQWI7QUFDQSxJQUFNQyxRQUFRLE9BQWQ7O0FBR0E7OztJQUdNQyxZOzs7QUFDRjs7OztBQUlBLDBCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2RBLGVBQU9BLFFBQVEsRUFBZjtBQUNBQSxhQUFLQyxVQUFMLEdBQWtCRCxLQUFLQyxVQUFMLElBQW1CLDJCQUFyQztBQUZjLDJIQUdSRCxJQUhRO0FBSWpCO0FBQ0Q7Ozs7Ozs7OzttQ0FLV0UsUyxFQUFXO0FBQ2xCLGdCQUFJLENBQUMsS0FBS0MsSUFBTCxDQUFVQyxHQUFWLENBQWNGLFNBQWQsQ0FBTCxFQUErQjtBQUMzQix1QkFBT0csU0FBUDtBQUNIO0FBQ0QsZ0JBQUlDLFVBQVUsS0FBS0gsSUFBTCxDQUFVSSxHQUFWLENBQWNMLFNBQWQsQ0FBZDtBQUNBLGdCQUFJLENBQUNJLFFBQVFFLEtBQWIsRUFBb0I7QUFDaEIscUJBQUtDLGFBQUwsQ0FBbUJQLFNBQW5CO0FBQ0g7QUFDRCxtQkFBT0ksT0FBUDtBQUNIO0FBQ0Q7Ozs7Ozs7c0NBSWNKLFMsRUFBVztBQUNyQixnQkFBSSxLQUFLQyxJQUFMLENBQVVDLEdBQVYsQ0FBY0YsU0FBZCxDQUFKLEVBQThCO0FBQzFCLHFCQUFLQyxJQUFMLEdBQVksS0FBS0EsSUFBTCxDQUFVTyxNQUFWLENBQWlCUixTQUFqQixDQUFaO0FBQ0g7QUFDSjtBQUNEOzs7Ozs7O29DQUlZSSxPLEVBQVM7QUFDakJBLG9CQUFRSyxFQUFSLFFBQWdCLGVBQWhCO0FBQ0EsaUJBQUtSLElBQUwsR0FBWSxLQUFLQSxJQUFMLENBQVVTLEdBQVYsQ0FBY04sUUFBUUssRUFBdEIsRUFBMEJMLE9BQTFCLENBQVo7QUFDQSxpQkFBS08sSUFBTCxDQUFVaEIsSUFBVixFQUFnQlMsUUFBUUssRUFBeEI7QUFDSDtBQUNEOzs7Ozs7d0NBR2dCO0FBQ1osaUJBQUtSLElBQUwsR0FBWSxLQUFLQSxJQUFMLENBQVVXLEtBQVYsRUFBWjtBQUNBLGlCQUFLRCxJQUFMLENBQVVmLEtBQVY7QUFDSDtBQUNEOzs7Ozs7O2lEQUl5QmlCLEUsRUFBSTtBQUN6QixpQkFBS0MsV0FBTCxDQUFpQm5CLElBQWpCLEVBQXVCa0IsRUFBdkI7QUFDSDtBQUNEOzs7Ozs7O29EQUk0QkEsRSxFQUFJO0FBQzVCLGlCQUFLRSxjQUFMLENBQW9CcEIsSUFBcEIsRUFBMEJrQixFQUExQjtBQUNIOztBQUVEOzs7Ozs7O2lEQUl5QkEsRSxFQUFJO0FBQ3pCLGlCQUFLQyxXQUFMLENBQWlCbEIsS0FBakIsRUFBd0JpQixFQUF4QjtBQUNIO0FBQ0Q7Ozs7Ozs7b0RBSTRCQSxFLEVBQUk7QUFDNUIsaUJBQUtFLGNBQUwsQ0FBb0JuQixLQUFwQixFQUEyQmlCLEVBQTNCO0FBQ0g7Ozs2Q0FDb0I7QUFDakIsZ0JBQUlHLGVBQWUsSUFBbkI7QUFDQSxpQkFBS0MsUUFBTCxHQUFnQkMscUJBQWNDLFFBQWQsQ0FBdUIsVUFBVUMsWUFBVixFQUF3QjtBQUMzRCxvQkFBSUMsVUFBVUQsYUFBYUUsTUFBYixDQUFvQnJCLElBQWxDO0FBQ0Esb0JBQUlzQixPQUFPSCxhQUFhRSxNQUFiLENBQW9CQyxJQUEvQjs7QUFFQSx3QkFBUUEsSUFBUjtBQUNJLHlCQUFLLE1BQUw7QUFDSSw0QkFBSUYsUUFBUWpCLE9BQVosRUFBcUI7QUFDakJZLHlDQUFhUSxXQUFiLENBQXlCSCxRQUFRakIsT0FBakM7QUFDSDtBQUNEO0FBQ0oseUJBQUssT0FBTDtBQUNJLDRCQUFJaUIsUUFBUUksUUFBWixFQUFzQjtBQUNsQlQseUNBQWFVLGFBQWI7QUFDSDtBQUNEO0FBVlI7QUFZSCxhQWhCZSxDQUFoQjtBQWlCSDs7OztFQWxHc0JDLG1COztrQkFxR1o5QixZIiwiZmlsZSI6InByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG5pbXBvcnQgQ29yZVN0b3JlIGZyb20gJy4uL0NvcmVTdG9yZSc7XHJcbmltcG9ydCBnZXREZWZpbml0aW9uIGZyb20gJy4vZGVmaW5pdGlvbic7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcclxuY29uc3QgUFVTSCA9ICdwdXNoJztcclxuY29uc3QgQ0xFQVIgPSAnY2xlYXInO1xyXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi8uLi9kaXNwYXRjaGVyJztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBzdGFuZGluZyBmb3IgdGhlIGNhcnRyaWRnZSBzdG9yZS5cclxuICovXHJcbmNsYXNzIE1lc3NhZ2VTdG9yZSBleHRlbmRzIENvcmVTdG9yZSB7XHJcbiAgICAvKipcclxuICAgKiBBZGQgYSBsaXN0ZW5lciBvbiB0aGUgZ2xvYmFsIGNoYW5nZSBvbiB0aGUgc2VhcmNoIHN0b3JlLlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb25mIC0gVGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIG1lc3NhZ2Ugc3RvcmUuXHJcbiAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25mKSB7XHJcbiAgICAgICAgY29uZiA9IGNvbmYgfHwge307XHJcbiAgICAgICAgY29uZi5kZWZpbml0aW9uID0gY29uZi5kZWZpbml0aW9uIHx8IGdldERlZmluaXRpb24oKTtcclxuICAgICAgICBzdXBlcihjb25mKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAqIEdldCBhIG1lc3NhZ2UgZnJvbSBpdHMgaWRlbnRpZmllci5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZUlkIC0gVGhlIG1lc3NhZ2UgaWRlbnRpZmllci5cclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFRoZSByZXF1ZXN0ZWQgbWVzc2FnZS5cclxuICAgKi9cclxuICAgIGdldE1lc3NhZ2UobWVzc2FnZUlkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEuaGFzKG1lc3NhZ2VJZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmRhdGEuZ2V0KG1lc3NhZ2VJZCk7XHJcbiAgICAgICAgaWYgKCFtZXNzYWdlLmlzQWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlTWVzc2FnZShtZXNzYWdlSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAqIERlbGV0ZSBhIG1lc3NhZ2UgZ2l2ZW4gaXRzIGlkLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlSWQgLSBUaGUgbWVzc2FnZSBpZGVudGlmaWVyLlxyXG4gICAqL1xyXG4gICAgZGVsZXRlTWVzc2FnZShtZXNzYWdlSWQpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmhhcyhtZXNzYWdlSWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5kZWxldGUobWVzc2FnZUlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgKiBBZGQgYSBsaXN0ZW5lciBvbiB0aGUgZ2xvYmFsIGNoYW5nZSBvbiB0aGUgc2VhcmNoIHN0b3JlLlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBtZXNzYWdlIC0gVGhlIG1lc3NhZ2UgdG8gYWRkLlxyXG4gICAqL1xyXG4gICAgcHVzaE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIG1lc3NhZ2UuaWQgPSBgJHt1dWlkKCl9YDtcclxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc2V0KG1lc3NhZ2UuaWQsIG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuZW1pdChQVVNILCBtZXNzYWdlLmlkKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAqIENsZWFyIGFsbCBtZXNzYWdlcyBpbiB0aGUgc3RhY2suXHJcbiAgICovXHJcbiAgICBjbGVhck1lc3NhZ2VzKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZW1pdChDTEVBUik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgKiBBZGQgYSBsaXN0ZW5lciBvbiB0aGUgZ2xvYmFsIGNoYW5nZSBvbiB0aGUgc2VhcmNoIHN0b3JlLlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbiBhIG1lc3NhZ2UgaXMgcHVzaGVkLlxyXG4gICAqL1xyXG4gICAgYWRkUHVzaGVkTWVzc2FnZUxpc3RlbmVyKGNiKSB7XHJcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihQVVNILCBjYik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBvbiB0aGUgZ2xvYmFsIGNoYW5nZSBvbiB0aGUgc2VhcmNoIHN0b3JlLlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gVGhlIGNhbGxiYWNrIHRvIGNhbGxlZCB3aGVuIGEgbWVzc2FnZSBpcyBwdXNoZWQuXHJcbiAgICovXHJcbiAgICByZW1vdmVQdXNoZWRNZXNzYWdlTGlzdGVuZXIoY2IpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKFBVU0gsIGNiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgKiBBZGQgYSBsaXN0ZW5lciBvbiB0aGUgZ2xvYmFsIGNoYW5nZSBvbiB0aGUgc2VhcmNoIHN0b3JlLlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbiBhIG1lc3NhZ2UgaXMgcHVzaGVkLlxyXG4gICAqL1xyXG4gICAgYWRkQ2xlYXJNZXNzYWdlc0xpc3RlbmVyKGNiKSB7XHJcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihDTEVBUiwgY2IpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICogUmVtb3ZlIGEgbGlzdGVuZXIgb24gdGhlIGdsb2JhbCBjaGFuZ2Ugb24gdGhlIHNlYXJjaCBzdG9yZS5cclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiAtIFRoZSBjYWxsYmFjayB0byBjYWxsZWQgd2hlbiBhIG1lc3NhZ2UgaXMgcHVzaGVkLlxyXG4gICAqL1xyXG4gICAgcmVtb3ZlQ2xlYXJNZXNzYWdlc0xpc3RlbmVyKGNiKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihDTEVBUiwgY2IpO1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJEaXNwYXRjaGVyKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50U3RvcmUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2ggPSBBcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uICh0cmFuc2ZlckluZm8pIHtcclxuICAgICAgICAgICAgbGV0IHJhd0RhdGEgPSB0cmFuc2ZlckluZm8uYWN0aW9uLmRhdGE7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gdHJhbnNmZXJJbmZvLmFjdGlvbi50eXBlO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdwdXNoJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmF3RGF0YS5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZS5wdXNoTWVzc2FnZShyYXdEYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmF3RGF0YS5tZXNzYWdlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RvcmUuY2xlYXJNZXNzYWdlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlU3RvcmU7XHJcbiJdfQ==