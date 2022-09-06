"use strict";
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
exports.waveShaper = exports.stereoPanner = exports.panner = exports.oscillator = exports.mediaStreamSource = exports.mediaStreamDestination = exports.mediaElementSource = exports.gain = exports.dynamicsCompressor = exports.delay = exports.convolver = exports.channelSplitter = exports.channelMerger = exports.bufferSource = exports.biquadFilter = exports.analyser = void 0;
var StandardVirtualAudioNode_1 = require("./VirtualAudioNodes/StandardVirtualAudioNode");
var createNodeConstructor = function (nodeName) {
    return function (output) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        if (nodeName === "mediaStreamDestination") {
            return new StandardVirtualAudioNode_1.default(nodeName);
        }
        if (output == null) {
            throw new Error("Output not specified for ".concat(nodeName));
        }
        return new (StandardVirtualAudioNode_1.default.bind.apply(StandardVirtualAudioNode_1.default, __spreadArray([void 0, nodeName, output], rest, false)))();
    };
};
exports.analyser = createNodeConstructor("analyser");
exports.biquadFilter = createNodeConstructor("biquadFilter");
exports.bufferSource = createNodeConstructor("bufferSource");
exports.channelMerger = createNodeConstructor("channelMerger");
exports.channelSplitter = createNodeConstructor("channelSplitter");
exports.convolver = createNodeConstructor("convolver");
exports.delay = createNodeConstructor("delay");
exports.dynamicsCompressor = createNodeConstructor("dynamicsCompressor");
exports.gain = createNodeConstructor("gain");
exports.mediaElementSource = createNodeConstructor("mediaElementSource");
exports.mediaStreamDestination = createNodeConstructor("mediaStreamDestination");
exports.mediaStreamSource = createNodeConstructor("mediaStreamSource");
exports.oscillator = createNodeConstructor("oscillator");
exports.panner = createNodeConstructor("panner");
exports.stereoPanner = createNodeConstructor("stereoPanner");
exports.waveShaper = createNodeConstructor("waveShaper");
