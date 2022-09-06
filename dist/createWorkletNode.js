"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AudioWorkletVirtualAudioNode_1 = require("./VirtualAudioNodes/AudioWorkletVirtualAudioNode");
exports.default = (function (nodeName) {
    return function (output, params) {
        return new AudioWorkletVirtualAudioNode_1.default(nodeName, output, params);
    };
});
