"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var connectAudioNodes_1 = require("../connectAudioNodes");
var utils_1 = require("../utils");
var VirtualAudioNodeBase_1 = require("./VirtualAudioNodeBase");
var CustomVirtualAudioNode = /** @class */ (function (_super) {
    __extends(CustomVirtualAudioNode, _super);
    function CustomVirtualAudioNode(node, output, params) {
        var _this = _super.call(this) || this;
        _this.node = node;
        _this.output = output;
        _this.audioNode = undefined;
        _this.connected = false;
        _this.params = params || {};
        return _this;
    }
    CustomVirtualAudioNode.prototype.connect = function () {
        var connectArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            connectArgs[_i] = arguments[_i];
        }
        for (var _a = 0, _b = (0, utils_1.values)(this.virtualNodes); _a < _b.length; _a++) {
            var childVirtualNode = _b[_a];
            var output = childVirtualNode.output;
            if (output === "output" ||
                (Array.isArray(output) && output.indexOf("output") !== -1)) {
                childVirtualNode.connect.apply(childVirtualNode, connectArgs.filter(Boolean));
            }
        }
        this.connected = true;
    };
    CustomVirtualAudioNode.prototype.disconnect = function (node) {
        for (var _i = 0, _a = (0, utils_1.values)(this.virtualNodes); _i < _a.length; _i++) {
            var virtualNode = _a[_i];
            var output = virtualNode.output;
            if (output === "output" ||
                (Array.isArray(output) && output.indexOf("output") !== -1)) {
                virtualNode.disconnect();
            }
        }
        this.connected = false;
    };
    CustomVirtualAudioNode.prototype.disconnectAndDestroy = function () {
        for (var _i = 0, _a = (0, utils_1.values)(this.virtualNodes); _i < _a.length; _i++) {
            var virtualNode = _a[_i];
            virtualNode.disconnectAndDestroy();
        }
        this.connected = false;
    };
    CustomVirtualAudioNode.prototype.initialize = function (audioContext) {
        this.virtualNodes = (0, utils_1.mapObj)(function (virtualAudioNodeParam) {
            return virtualAudioNodeParam.initialize(audioContext);
        }, this.node(this.params));
        (0, connectAudioNodes_1.default)(this.virtualNodes, function () { });
        return this;
    };
    CustomVirtualAudioNode.prototype.update = function (_params, audioContext) {
        var params = _params !== null && _params !== void 0 ? _params : {};
        var audioGraphParamsFactoryValues = (0, utils_1.values)(this.node(params));
        var keys = Object.keys(this.virtualNodes);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var virtualAudioNode = this.virtualNodes[key];
            var newVirtualAudioNode = audioGraphParamsFactoryValues[i];
            if (virtualAudioNode.cannotUpdateInPlace(newVirtualAudioNode)) {
                virtualAudioNode.disconnectAndDestroy();
                this.virtualNodes[key] = newVirtualAudioNode.initialize(audioContext);
                continue;
            }
            virtualAudioNode.update(newVirtualAudioNode.params, audioContext);
            if (!(0, utils_1.equals)(newVirtualAudioNode.output, virtualAudioNode.output)) {
                virtualAudioNode.disconnect();
                virtualAudioNode.output = newVirtualAudioNode.output;
            }
        }
        (0, connectAudioNodes_1.default)(this.virtualNodes, function () { });
        this.params = params;
        return this;
    };
    return CustomVirtualAudioNode;
}(VirtualAudioNodeBase_1.default));
exports.default = CustomVirtualAudioNode;
