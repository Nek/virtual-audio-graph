"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomVirtualAudioNode_1 = require("./VirtualAudioNodes/CustomVirtualAudioNode");
exports.default = (function (node) {
    return function (output, params) {
        return new CustomVirtualAudioNode_1.default(node, output, params);
    };
});
