import { CustomVirtualAudioNodeFactory, IVirtualAudioNodeGraph, IVirtualAudioNodeParams, Output, VirtualAudioNode } from "../types";
import VirtualAudioNodeBase from "./VirtualAudioNodeBase";
export default class CustomVirtualAudioNode extends VirtualAudioNodeBase {
    readonly node: CustomVirtualAudioNodeFactory;
    output?: Output | undefined;
    readonly audioNode: undefined;
    connected: boolean;
    params: IVirtualAudioNodeParams;
    virtualNodes: IVirtualAudioNodeGraph;
    constructor(node: CustomVirtualAudioNodeFactory, output?: Output | undefined, params?: IVirtualAudioNodeParams);
    connect(...connectArgs: any[]): void;
    disconnect(node?: VirtualAudioNode): void;
    disconnectAndDestroy(): void;
    initialize(audioContext: AudioContext): this;
    update(_params: IVirtualAudioNodeParams | null | undefined, audioContext: AudioContext): this;
}
