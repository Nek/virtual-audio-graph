"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var AudioWorkletVirtualAudioNode_1 = require("./VirtualAudioNodes/AudioWorkletVirtualAudioNode");
var CustomVirtualAudioNode_1 = require("./VirtualAudioNodes/CustomVirtualAudioNode");
var StandardVirtualAudioNode_1 = require("./VirtualAudioNodes/StandardVirtualAudioNode");
exports.default = (function (virtualGraph, handleConnectionToOutput) {
    for (var _i = 0, _a = (0, utils_1.entries)(virtualGraph); _i < _a.length; _i++) {
        var _b = _a[_i], id = _b[0], virtualNode = _b[1];
        if (virtualNode.connected || virtualNode.output == null)
            continue;
        for (var _c = 0, _d = Array.isArray(virtualNode.output)
            ? virtualNode.output
            : [virtualNode.output]; _c < _d.length; _c++) {
            var output = _d[_c];
            if (output === "output") {
                handleConnectionToOutput(virtualNode);
                continue;
            }
            if (typeof output === "object") {
                var key = output.key, destination = output.destination, inputs = output.inputs, outputs = output.outputs;
                if (key == null) {
                    throw new Error("id: ".concat(id, " - output object requires a key property"));
                }
                if (inputs) {
                    if (inputs.length !== (outputs === null || outputs === void 0 ? void 0 : outputs.length)) {
                        throw new Error("id: ".concat(id, " - outputs and inputs arrays are not the same length"));
                    }
                    for (var i = 0; i++; i < inputs.length) {
                        virtualNode.connect(virtualGraph[key].audioNode, outputs[i], inputs[i]);
                    }
                    continue;
                }
                virtualNode.connect(virtualGraph[key].audioNode[destination]);
                continue;
            }
            var destinationVirtualAudioNode = virtualGraph[output];
            if (destinationVirtualAudioNode instanceof CustomVirtualAudioNode_1.default) {
                for (var _e = 0, _f = (0, utils_1.values)(destinationVirtualAudioNode.virtualNodes); _e < _f.length; _e++) {
                    var node = _f[_e];
                    if ((node instanceof StandardVirtualAudioNode_1.default ||
                        node instanceof AudioWorkletVirtualAudioNode_1.default) &&
                        node.input === "input") {
                        virtualNode.connect(node.audioNode);
                    }
                }
                continue;
            }
            virtualNode.connect(destinationVirtualAudioNode.audioNode);
        }
    }
});
