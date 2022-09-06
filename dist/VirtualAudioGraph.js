"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connectAudioNodes_1 = require("./connectAudioNodes");
var utils_1 = require("./utils");
var VirtualAudioGraph = /** @class */ (function () {
    function VirtualAudioGraph(audioContext, output) {
        this.audioContext = audioContext;
        this.output = output;
        this.virtualNodes = {};
    }
    VirtualAudioGraph.prototype.getAudioNodeById = function (id) {
        var _a;
        return (_a = this.virtualNodes[id]) === null || _a === void 0 ? void 0 : _a.audioNode;
    };
    VirtualAudioGraph.prototype.update = function (newGraph) {
        var _this = this;
        if (newGraph.hasOwnProperty("output")) {
            throw new Error('"output" is not a valid id');
        }
        for (var _i = 0, _a = (0, utils_1.entries)(this.virtualNodes); _i < _a.length; _i++) {
            var _b = _a[_i], id = _b[0], virtualAudioNode = _b[1];
            if (newGraph.hasOwnProperty(id))
                continue;
            virtualAudioNode.disconnectAndDestroy();
            this.disconnectParents(virtualAudioNode);
            delete this.virtualNodes[id];
        }
        for (var _c = 0, _d = Object.keys(newGraph); _c < _d.length; _c++) {
            var key = _d[_c];
            var newVirtualAudioNode = newGraph[key];
            var virtualAudioNode = this.virtualNodes[key];
            if (virtualAudioNode == null) {
                this.virtualNodes[key] = newVirtualAudioNode.initialize(this.audioContext);
                continue;
            }
            if (virtualAudioNode.cannotUpdateInPlace(newVirtualAudioNode)) {
                virtualAudioNode.disconnectAndDestroy();
                this.disconnectParents(virtualAudioNode);
                this.virtualNodes[key] = newVirtualAudioNode.initialize(this.audioContext);
                continue;
            }
            if (!(0, utils_1.equals)(newVirtualAudioNode.output, virtualAudioNode.output)) {
                virtualAudioNode.disconnect();
                this.disconnectParents(virtualAudioNode);
                virtualAudioNode.output = newVirtualAudioNode.output;
            }
            virtualAudioNode.update(newVirtualAudioNode.params, this.audioContext);
        }
        (0, connectAudioNodes_1.default)(this.virtualNodes, function (vNode) {
            return vNode.connect(_this.output);
        });
        return this;
    };
    Object.defineProperty(VirtualAudioGraph.prototype, "currentTime", {
        get: function () {
            return this.audioContext.currentTime;
        },
        enumerable: false,
        configurable: true
    });
    VirtualAudioGraph.prototype.disconnectParents = function (vNode) {
        for (var _i = 0, _a = (0, utils_1.values)(this.virtualNodes); _i < _a.length; _i++) {
            var node = _a[_i];
            node.disconnect(vNode);
        }
    };
    return VirtualAudioGraph;
}());
exports.default = VirtualAudioGraph;
