"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VirtualAudioNodeBase = /** @class */ (function () {
    function VirtualAudioNodeBase() {
    }
    VirtualAudioNodeBase.prototype.cannotUpdateInPlace = function (newVirtualAudioNode) {
        return newVirtualAudioNode.node !== this.node;
    };
    return VirtualAudioNodeBase;
}());
exports.default = VirtualAudioNodeBase;
