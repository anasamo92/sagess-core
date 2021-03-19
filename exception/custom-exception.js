'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Classe standing for custom exception.
* @see https://gist.github.com/daliwali/09ca19032ab192524dc6
*/
var CustomException = function (_Error) {
    _inherits(CustomException, _Error);

    function CustomException(name, message, options) {
        _classCallCheck(this, CustomException);

        var _this = _possibleConstructorReturn(this, (CustomException.__proto__ || Object.getPrototypeOf(CustomException)).call(this));

        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(_this, _this.constructor);
        } else {
            Object.defineProperty(_this, 'stack', {
                value: new Error().stack
            });
        }
        Object.defineProperty(_this, 'message', {
            value: message
        });
        _this.options = options;
        return _this;
    }

    _createClass(CustomException, [{
        key: 'log',

        /**
        * Log the exception in the js console.
        */
        value: function log() {
            console.error('name', this.name, 'message', this.message, 'options', this.options);
        }
        /**
         * Jsonify the exception.
         * @return {object} - The json exception.
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var name = this.name,
                message = this.message,
                options = this.options;

            return { name: name, message: message, options: options };
        }
    }, {
        key: 'name',
        get: function get() {
            return this.constructor.name;
        }
    }]);

    return CustomException;
}(Error);

exports.default = CustomException;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJDdXN0b21FeGNlcHRpb24iLCJuYW1lIiwibWVzc2FnZSIsIm9wdGlvbnMiLCJFcnJvciIsImhhc093blByb3BlcnR5IiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJjb25zdHJ1Y3RvciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJzdGFjayIsImNvbnNvbGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQUlNQSxlOzs7QUFDRiw2QkFBWUMsSUFBWixFQUFrQkMsT0FBbEIsRUFBMkJDLE9BQTNCLEVBQW9DO0FBQUE7O0FBQUE7O0FBRWhDLFlBQUlDLE1BQU1DLGNBQU4sQ0FBcUIsbUJBQXJCLENBQUosRUFBK0M7QUFDM0NELGtCQUFNRSxpQkFBTixRQUE4QixNQUFLQyxXQUFuQztBQUNILFNBRkQsTUFFTztBQUNIQyxtQkFBT0MsY0FBUCxRQUE0QixPQUE1QixFQUFxQztBQUNqQ0MsdUJBQVEsSUFBSU4sS0FBSixFQUFELENBQWNPO0FBRFksYUFBckM7QUFHSDtBQUNESCxlQUFPQyxjQUFQLFFBQTRCLFNBQTVCLEVBQXVDO0FBQ25DQyxtQkFBT1I7QUFENEIsU0FBdkM7QUFHQSxjQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFaZ0M7QUFhbkM7Ozs7O0FBSUQ7Ozs4QkFHTTtBQUNGUyxvQkFBUUMsS0FBUixDQUFjLE1BQWQsRUFBc0IsS0FBS1osSUFBM0IsRUFBaUMsU0FBakMsRUFBNEMsS0FBS0MsT0FBakQsRUFBMEQsU0FBMUQsRUFBcUUsS0FBS0MsT0FBMUU7QUFDSDtBQUNEOzs7Ozs7O2lDQUlTO0FBQUEsZ0JBQ0dGLElBREgsR0FDOEIsSUFEOUIsQ0FDR0EsSUFESDtBQUFBLGdCQUNTQyxPQURULEdBQzhCLElBRDlCLENBQ1NBLE9BRFQ7QUFBQSxnQkFDa0JDLE9BRGxCLEdBQzhCLElBRDlCLENBQ2tCQSxPQURsQjs7QUFFTCxtQkFBTyxFQUFFRixVQUFGLEVBQVFDLGdCQUFSLEVBQWlCQyxnQkFBakIsRUFBUDtBQUNIOzs7NEJBaEJVO0FBQ1AsbUJBQU8sS0FBS0ksV0FBTCxDQUFpQk4sSUFBeEI7QUFDSDs7OztFQWpCeUJHLEs7O2tCQWtDZkosZSIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuKiBDbGFzc2Ugc3RhbmRpbmcgZm9yIGN1c3RvbSBleGNlcHRpb24uXHJcbiogQHNlZSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9kYWxpd2FsaS8wOWNhMTkwMzJhYjE5MjUyNGRjNlxyXG4qL1xyXG5jbGFzcyBDdXN0b21FeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAoRXJyb3IuaGFzT3duUHJvcGVydHkoJ2NhcHR1cmVTdGFja1RyYWNlJykpIHtcclxuICAgICAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzdGFjaycsIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAobmV3IEVycm9yKCkpLnN0YWNrXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21lc3NhZ2UnLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBtZXNzYWdlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIH1cclxuICAgIGdldCBuYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogTG9nIHRoZSBleGNlcHRpb24gaW4gdGhlIGpzIGNvbnNvbGUuXHJcbiAgICAqL1xyXG4gICAgbG9nKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ25hbWUnLCB0aGlzLm5hbWUsICdtZXNzYWdlJywgdGhpcy5tZXNzYWdlLCAnb3B0aW9ucycsIHRoaXMub3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEpzb25pZnkgdGhlIGV4Y2VwdGlvbi5cclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUganNvbiBleGNlcHRpb24uXHJcbiAgICAgKi9cclxuICAgIHRvSlNPTigpIHtcclxuICAgICAgICBjb25zdCB7IG5hbWUsIG1lc3NhZ2UsIG9wdGlvbnMgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgbWVzc2FnZSwgb3B0aW9ucyB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXN0b21FeGNlcHRpb247XHJcbiJdfQ==