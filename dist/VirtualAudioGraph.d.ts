import { IVirtualAudioNodeGraph } from "./types";
export default class VirtualAudioGraph {
    readonly audioContext: AudioContext;
    private readonly output;
    private virtualNodes;
    constructor(audioContext: AudioContext, output: AudioDestinationNode);
    getAudioNodeById(id: number | string): AudioNode | void;
    update(newGraph: IVirtualAudioNodeGraph): this;
    get currentTime(): number;
    private disconnectParents;
}
