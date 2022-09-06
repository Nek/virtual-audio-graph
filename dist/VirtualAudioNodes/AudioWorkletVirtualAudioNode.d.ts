import { IVirtualAudioNodeParams, Output, VirtualAudioNode } from "../types";
import VirtualAudioNodeBase from "./VirtualAudioNodeBase";
export default class AudioWorkletVirtualAudioNode extends VirtualAudioNodeBase {
    readonly node: string;
    output?: Output | undefined;
    params?: IVirtualAudioNodeParams | undefined;
    readonly input?: string | undefined;
    audioNode: AudioNode;
    connected: boolean;
    private connections;
    constructor(node: string, output?: Output | undefined, params?: IVirtualAudioNodeParams | undefined, input?: string | undefined);
    connect(...connectArgs: any[]): void;
    disconnect(node?: VirtualAudioNode): void;
    disconnectAndDestroy(): void;
    initialize(audioContext: AudioContext): this;
    update(params?: IVirtualAudioNodeParams): this;
}
