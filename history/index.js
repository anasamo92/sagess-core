'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _navigate = void 0,
    _back = void 0,
    _start = void 0;

// Define the navigation functions depending on backbone or react-router
var setNavigationFunctions = function setNavigationFunctions(navigate, back, start) {
    _navigate = navigate;
    _back = back;
    _start = start;
};

var navigate = function navigate() {
    if (!_navigate) {
        throw new Error('react-router or backbone URL Navigation was badly given in the setNavigationFunctions()');
    }
    _navigate.apply(undefined, arguments);
};

var back = function back() {
    if (!_back) {
        throw new Error('react-router or backbone Previous Page Navigation was badly given in the setNavigationFunctions()');
    }
    _back.apply(undefined, arguments);
};

var start = function start() {
    if (!_start) {
        throw new Error('Backbone start router was badly given in the setNavigationFunctions()');
    }
    _start.apply(undefined, arguments);
};

exports.setNavigationFunctions = setNavigationFunctions;
exports.navigate = navigate;
exports.back = back;
exports.start = start;
exports.default = {
    setNavigationFunctions: setNavigationFunctions,
    navigate: navigate,
    back: back,
    start: start
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJfbmF2aWdhdGUiLCJfYmFjayIsIl9zdGFydCIsInNldE5hdmlnYXRpb25GdW5jdGlvbnMiLCJuYXZpZ2F0ZSIsImJhY2siLCJzdGFydCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUlBLGtCQUFKO0FBQUEsSUFBZUMsY0FBZjtBQUFBLElBQXNCQyxlQUF0Qjs7QUFFQTtBQUNBLElBQU1DLHlCQUF5QixTQUF6QkEsc0JBQXlCLENBQUNDLFFBQUQsRUFBV0MsSUFBWCxFQUFpQkMsS0FBakIsRUFBMkI7QUFDdEROLGdCQUFZSSxRQUFaO0FBQ0FILFlBQVFJLElBQVI7QUFDQUgsYUFBU0ksS0FBVDtBQUNILENBSkQ7O0FBTUEsSUFBTUYsV0FBVyxTQUFYQSxRQUFXLEdBQWE7QUFDMUIsUUFBSSxDQUFDSixTQUFMLEVBQWdCO0FBQ1osY0FBTSxJQUFJTyxLQUFKLENBQVUseUZBQVYsQ0FBTjtBQUNIO0FBQ0RQO0FBQ0gsQ0FMRDs7QUFPQSxJQUFNSyxPQUFPLFNBQVBBLElBQU8sR0FBYTtBQUN0QixRQUFJLENBQUNKLEtBQUwsRUFBWTtBQUNSLGNBQU0sSUFBSU0sS0FBSixDQUFVLG1HQUFWLENBQU47QUFDSDtBQUNETjtBQUNILENBTEQ7O0FBT0EsSUFBTUssUUFBUSxTQUFSQSxLQUFRLEdBQWE7QUFDdkIsUUFBSSxDQUFDSixNQUFMLEVBQWE7QUFDVCxjQUFNLElBQUlLLEtBQUosQ0FBVSx1RUFBVixDQUFOO0FBQ0g7QUFDREw7QUFDSCxDQUxEOztRQVFJQyxzQixHQUFBQSxzQjtRQUNBQyxRLEdBQUFBLFE7UUFDQUMsSSxHQUFBQSxJO1FBQ0FDLEssR0FBQUEsSztrQkFHVztBQUNYSCxrREFEVztBQUVYQyxzQkFGVztBQUdYQyxjQUhXO0FBSVhDO0FBSlcsQyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgX25hdmlnYXRlLCBfYmFjaywgX3N0YXJ0O1xyXG5cclxuLy8gRGVmaW5lIHRoZSBuYXZpZ2F0aW9uIGZ1bmN0aW9ucyBkZXBlbmRpbmcgb24gYmFja2JvbmUgb3IgcmVhY3Qtcm91dGVyXHJcbmNvbnN0IHNldE5hdmlnYXRpb25GdW5jdGlvbnMgPSAobmF2aWdhdGUsIGJhY2ssIHN0YXJ0KSA9PiB7XHJcbiAgICBfbmF2aWdhdGUgPSBuYXZpZ2F0ZTtcclxuICAgIF9iYWNrID0gYmFjaztcclxuICAgIF9zdGFydCA9IHN0YXJ0O1xyXG59XHJcblxyXG5jb25zdCBuYXZpZ2F0ZSA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICBpZiAoIV9uYXZpZ2F0ZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncmVhY3Qtcm91dGVyIG9yIGJhY2tib25lIFVSTCBOYXZpZ2F0aW9uIHdhcyBiYWRseSBnaXZlbiBpbiB0aGUgc2V0TmF2aWdhdGlvbkZ1bmN0aW9ucygpJylcclxuICAgIH1cclxuICAgIF9uYXZpZ2F0ZSguLi5hcmdzKTtcclxufVxyXG5cclxuY29uc3QgYmFjayA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICBpZiAoIV9iYWNrKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZWFjdC1yb3V0ZXIgb3IgYmFja2JvbmUgUHJldmlvdXMgUGFnZSBOYXZpZ2F0aW9uIHdhcyBiYWRseSBnaXZlbiBpbiB0aGUgc2V0TmF2aWdhdGlvbkZ1bmN0aW9ucygpJylcclxuICAgIH1cclxuICAgIF9iYWNrKC4uLmFyZ3MpO1xyXG59XHJcblxyXG5jb25zdCBzdGFydCA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICBpZiAoIV9zdGFydCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQmFja2JvbmUgc3RhcnQgcm91dGVyIHdhcyBiYWRseSBnaXZlbiBpbiB0aGUgc2V0TmF2aWdhdGlvbkZ1bmN0aW9ucygpJylcclxuICAgIH1cclxuICAgIF9zdGFydCguLi5hcmdzKTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIHNldE5hdmlnYXRpb25GdW5jdGlvbnMsXHJcbiAgICBuYXZpZ2F0ZSxcclxuICAgIGJhY2ssXHJcbiAgICBzdGFydFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBzZXROYXZpZ2F0aW9uRnVuY3Rpb25zLFxyXG4gICAgbmF2aWdhdGUsXHJcbiAgICBiYWNrLFxyXG4gICAgc3RhcnRcclxufSJdfQ==