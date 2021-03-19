'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
* Build the cartridge store definition.
* @return {object} - The cartridge component.
*/
exports.default = function () {
    return ['summaryComponent', 'barContentLeftComponent', 'barContentRightComponent', 'cartridgeComponent', 'actions', 'mode', 'route', 'confirmConfig', 'canDeploy'].reduce(function (def, node) {
        def[node] = node;
        return def;
    }, {});
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJyZWR1Y2UiLCJkZWYiLCJub2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztrQkFJZSxZQUFNO0FBQ2pCLFdBQU8sQ0FBQyxrQkFBRCxFQUFxQix5QkFBckIsRUFBZ0QsMEJBQWhELEVBQTRFLG9CQUE1RSxFQUFrRyxTQUFsRyxFQUE2RyxNQUE3RyxFQUFxSCxPQUFySCxFQUE4SCxlQUE5SCxFQUErSSxXQUEvSSxFQUNGQSxNQURFLENBQ0ssVUFBQ0MsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDbkJELFlBQUlDLElBQUosSUFBWUEsSUFBWjtBQUNBLGVBQU9ELEdBQVA7QUFDSCxLQUpFLEVBSUEsRUFKQSxDQUFQO0FBS0gsQyIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuKiBCdWlsZCB0aGUgY2FydHJpZGdlIHN0b3JlIGRlZmluaXRpb24uXHJcbiogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBjYXJ0cmlkZ2UgY29tcG9uZW50LlxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICByZXR1cm4gWydzdW1tYXJ5Q29tcG9uZW50JywgJ2JhckNvbnRlbnRMZWZ0Q29tcG9uZW50JywgJ2JhckNvbnRlbnRSaWdodENvbXBvbmVudCcsICdjYXJ0cmlkZ2VDb21wb25lbnQnLCAnYWN0aW9ucycsICdtb2RlJywgJ3JvdXRlJywgJ2NvbmZpcm1Db25maWcnLCAnY2FuRGVwbG95J11cclxuICAgICAgICAucmVkdWNlKChkZWYsIG5vZGUpID0+IHtcclxuICAgICAgICAgICAgZGVmW25vZGVdID0gbm9kZTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZjtcclxuICAgICAgICB9LCB7fSk7XHJcbn07XHJcbiJdfQ==