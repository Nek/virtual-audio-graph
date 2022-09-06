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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var CustomVirtualAudioNode_1 = require("./CustomVirtualAudioNode");
var VirtualAudioNodeBase_1 = require("./VirtualAudioNodeBase");
var AudioWorkletVirtualAudioNode = /** @class */ (function (_super) {
    __extends(AudioWorkletVirtualAudioNode, _super);
    function AudioWorkletVirtualAudioNode(node, output, params, input) {
        var _this = _super.call(this) || this;
        _this.node = node;
        _this.output = output;
        _this.params = params;
        _this.input = input;
        _this.connected = false;
        _this.connections = [];
        return _this;
    }
    AudioWorkletVirtualAudioNode.prototype.connect = function () {
        var connectArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            connectArgs[_i] = arguments[_i];
        }
        var audioNode = this.audioNode;
        var filteredConnectArgs = connectArgs.filter(Boolean);
        var firstArg = filteredConnectArgs[0], rest = filteredConnectArgs.slice(1);
        if (audioNode.connect) {
            audioNode.connect.apply(audioNode, __spreadArray([firstArg], rest, false));
        }
        this.connections = this.connections.concat(filteredConnectArgs);
        this.connected = true;
    };
    AudioWorkletVirtualAudioNode.prototype.disconnect = function (node) {
        var audioNode = this.audioNode;
        if (node) {
            if (node instanceof CustomVirtualAudioNode_1.default) {
                var _loop_1 = function (childNode) {
                    if (!this_1.connections.some(function (x) { return x === childNode.audioNode; }))
                        return "continue";
                    this_1.connections = this_1.connections.filter(function (x) { return x !== childNode.audioNode; });
                };
                var this_1 = this;
                for (var _i = 0, _a = (0, utils_1.values)(node.virtualNodes); _i < _a.length; _i++) {
                    var childNode = _a[_i];
                    _loop_1(childNode);
                }
            }
            else {
                if (!this.connections.some(function (x) { return x === node.audioNode; }))
                    return;
                this.connections = this.connections.filter(function (x) { return x !== node.audioNode; });
            }
        }
        if (audioNode.disconnect)
            audioNode.disconnect();
        this.connected = false;
    };
    AudioWorkletVirtualAudioNode.prototype.disconnectAndDestroy = function () {
        var audioNode = this.audioNode;
        if (audioNode.disconnect)
            audioNode.disconnect();
        this.connected = false;
    };
    AudioWorkletVirtualAudioNode.prototype.initialize = function (audioContext) {
        var params = this.params || {};
        this.audioNode = new window.AudioWorkletNode(audioContext, this.node);
        this.params = undefined;
        return this.update(params);
    };
    AudioWorkletVirtualAudioNode.prototype.update = function (params) {
        var _a;
        if (params === void 0) { params = {}; }
        var audioNode = this.audioNode;
        var _loop_2 = function (key) {
            var param = params[key];
            if (((_a = this_2.params) === null || _a === void 0 ? void 0 : _a[key]) === param)
                return "continue";
            var paramInstance = audioNode.parameters.get(key);
            if (Array.isArray(param)) {
                if (this_2.params && !(0, utils_1.equals)(param, this_2.params[key])) {
                    audioNode.parameters.get(key).cancelScheduledValues(0);
                }
                var callMethod = function (_a) {
                    var methodName = _a[0], args = _a.slice(1);
                    return paramInstance[methodName].apply(paramInstance, args);
                };
                Array.isArray(param[0])
                    ? param.forEach(callMethod)
                    : callMethod(param);
                return "continue";
            }
            paramInstance.value = param;
        };
        var this_2 = this;
        for (var _i = 0, _b = Object.keys(params); _i < _b.length; _i++) {
            var key = _b[_i];
            _loop_2(key);
        }
        this.params = params;
        return this;
    };
    return AudioWorkletVirtualAudioNode;
}(VirtualAudioNodeBase_1.default));
exports.default = AudioWorkletVirtualAudioNode;
