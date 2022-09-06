import { IVirtualAudioNodeParams, Output, VirtualAudioNode } from "../types";
import VirtualAudioNodeBase from "./VirtualAudioNodeBase";
export default class StandardVirtualAudioNode extends VirtualAudioNodeBase {
    readonly node: string;
    output?: Output | undefined;
    params?: IVirtualAudioNodeParams | undefined;
    readonly input?: string | undefined;
    audioNode: AudioNode;
    connected: boolean;
    private connections;
    private stopCalled;
    constructor(node: string, output?: Output | undefined, params?: IVirtualAudioNodeParams | undefined, input?: string | undefined);
    cannotUpdateInPlace(newVirtualAudioNode: VirtualAudioNode): boolean;
    connect(...connectArgs: any[]): void;
    disconnect(node?: VirtualAudioNode): void;
    disconnectAndDestroy(): void;
    initialize(audioContext: AudioContext): this;
    update(_params: IVirtualAudioNodeParams | null | undefined): this;
}
