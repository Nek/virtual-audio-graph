"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkletNode = exports.createNode = void 0;
var VirtualAudioGraph_1 = require("./VirtualAudioGraph");
__exportStar(require("./nodeFactories"), exports);
var createNode_1 = require("./createNode");
Object.defineProperty(exports, "createNode", { enumerable: true, get: function () { return createNode_1.default; } });
var createWorkletNode_1 = require("./createWorkletNode");
Object.defineProperty(exports, "createWorkletNode", { enumerable: true, get: function () { return createWorkletNode_1.default; } });
exports.default = (function (config) {
    var audioContext = (config === null || config === void 0 ? void 0 : config.audioContext) || new AudioContext();
    var output = (config === null || config === void 0 ? void 0 : config.output) || audioContext.destination;
    return new VirtualAudioGraph_1.default(audioContext, output);
});
