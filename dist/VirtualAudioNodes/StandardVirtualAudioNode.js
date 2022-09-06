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
var data_1 = require("../data");
var utils_1 = require("../utils");
var CustomVirtualAudioNode_1 = require("./CustomVirtualAudioNode");
var VirtualAudioNodeBase_1 = require("./VirtualAudioNodeBase");
var createAudioNode = function (audioContext, name, audioNodeFactoryParam) {
    var audioNodeFactoryName = "create".concat((0, utils_1.capitalize)(name));
    if (typeof audioContext[audioNodeFactoryName] !== "function") {
        throw new Error("Unknown node type: ".concat(name));
    }
    var audioNode = audioNodeFactoryParam
        ? audioContext[audioNodeFactoryName](audioNodeFactoryParam)
        : audioContext[audioNodeFactoryName]();
    return audioNode;
};
var StandardVirtualAudioNode = /** @class */ (function (_super) {
    __extends(StandardVirtualAudioNode, _super);
    function StandardVirtualAudioNode(node, output, params, input) {
        var _this = _super.call(this) || this;
        _this.node = node;
        _this.output = output;
        _this.params = params;
        _this.input = input;
        _this.connected = false;
        _this.connections = [];
        _this.stopCalled = (params === null || params === void 0 ? void 0 : params.stopTime) !== undefined;
        return _this;
    }
    StandardVirtualAudioNode.prototype.cannotUpdateInPlace = function (newVirtualAudioNode) {
        var _a, _b, _c, _d;
        return (_super.prototype.cannotUpdateInPlace.call(this, newVirtualAudioNode) ||
            ((_a = newVirtualAudioNode.params) === null || _a === void 0 ? void 0 : _a.startTime) !== ((_b = this.params) === null || _b === void 0 ? void 0 : _b.startTime) ||
            ((_c = newVirtualAudioNode.params) === null || _c === void 0 ? void 0 : _c.stopTime) !== ((_d = this.params) === null || _d === void 0 ? void 0 : _d.stopTime));
    };
    StandardVirtualAudioNode.prototype.connect = function () {
        var _a;
        var connectArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            connectArgs[_i] = arguments[_i];
        }
        var filteredConnectArgs = connectArgs.filter(Boolean);
        var firstArg = filteredConnectArgs[0], rest = filteredConnectArgs.slice(1);
        (_a = this.audioNode) === null || _a === void 0 ? void 0 : _a.connect.apply(_a, __spreadArray([firstArg], rest, false));
        this.connections = this.connections.concat(filteredConnectArgs);
        this.connected = true;
    };
    StandardVirtualAudioNode.prototype.disconnect = function (node) {
        var _a;
        if (node) {
            if (node instanceof CustomVirtualAudioNode_1.default) {
                var _loop_1 = function (childNode) {
                    if (!this_1.connections.some(function (x) { return x === childNode.audioNode; }))
                        return "continue";
                    this_1.connections = this_1.connections.filter(function (x) { return x !== childNode.audioNode; });
                };
                var this_1 = this;
                for (var _i = 0, _b = (0, utils_1.values)(node.virtualNodes); _i < _b.length; _i++) {
                    var childNode = _b[_i];
                    _loop_1(childNode);
                }
            }
            else {
                if (!this.connections.some(function (x) { return x === node.audioNode; }))
                    return;
                this.connections = this.connections.filter(function (x) { return x !== node.audioNode; });
            }
        }
        (_a = this.audioNode) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.connected = false;
    };
    StandardVirtualAudioNode.prototype.disconnectAndDestroy = function () {
        var _a, _b, _c;
        var stopCalled = this.stopCalled;
        if (!stopCalled)
            (_b = (_a = this.audioNode).stop) === null || _b === void 0 ? void 0 : _b.call(_a);
        (_c = this.audioNode) === null || _c === void 0 ? void 0 : _c.disconnect();
        this.connected = false;
    };
    StandardVirtualAudioNode.prototype.initialize = function (audioContext) {
        var params = this.params || {};
        var constructorParam = params[Object.keys(params).find(function (key) { return data_1.constructorParamsKeys.indexOf(key) !== -1; })];
        var offsetTime = params.offsetTime, startTime = params.startTime, stopTime = params.stopTime;
        // TODO remove `any` when AudioScheduledSourceNode typings are correct
        var audioNode = createAudioNode(audioContext, this.node, constructorParam);
        this.audioNode = audioNode;
        this.params = undefined;
        this.update(params);
        if (data_1.startAndStopNodes.indexOf(this.node) !== -1) {
            audioNode.start(startTime == null ? audioContext.currentTime : startTime, offsetTime || 0);
            if (stopTime != null)
                audioNode.stop(stopTime);
        }
        return this;
    };
    StandardVirtualAudioNode.prototype.update = function (_params) {
        var params = _params !== null && _params !== void 0 ? _params : {};
        var audioNode = this.audioNode;
        var _loop_2 = function (key) {
            if (data_1.constructorParamsKeys.indexOf(key) !== -1)
                return "continue";
            var param = params[key];
            if (this_2.params && (0, utils_1.equals)(this_2.params[key], param))
                return "continue";
            if (data_1.audioParamProperties.indexOf(key) !== -1) {
                if (Array.isArray(param)) {
                    if (this_2.params)
                        audioNode[key].cancelScheduledValues(0);
                    var callMethod = function (_a) {
                        var _b;
                        var methodName = _a[0], args = _a.slice(1);
                        return (_b = audioNode[key])[methodName].apply(_b, args);
                    };
                    Array.isArray(param[0])
                        ? param.forEach(callMethod)
                        : callMethod(param);
                    return "continue";
                }
                audioNode[key].value = param;
                return "continue";
            }
            if (data_1.setters.indexOf(key) !== -1) {
                audioNode["set".concat((0, utils_1.capitalize)(key))].apply(audioNode, param);
                return "continue";
            }
            audioNode[key] = param;
        };
        var this_2 = this;
        for (var _i = 0, _a = Object.keys(params); _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_2(key);
        }
        this.params = params;
        return this;
    };
    return StandardVirtualAudioNode;
}(VirtualAudioNodeBase_1.default));
exports.default = StandardVirtualAudioNode;
