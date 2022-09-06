import { IVirtualAudioNodeParams, Output } from "./types";
import AudioWorkletVirtualAudioNode from "./VirtualAudioNodes/AudioWorkletVirtualAudioNode";
declare const _default: (nodeName: string) => (output: Output, params?: IVirtualAudioNodeParams | undefined) => AudioWorkletVirtualAudioNode;
export default _default;
