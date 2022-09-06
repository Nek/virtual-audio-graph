import { CustomVirtualAudioNodeFactory, IVirtualAudioNodeParams, Output } from "./types";
import CustomVirtualAudioNode from "./VirtualAudioNodes/CustomVirtualAudioNode";
declare const _default: (node: CustomVirtualAudioNodeFactory<IVirtualAudioNodeParams>) => (output: Output, params?: IVirtualAudioNodeParams | undefined) => CustomVirtualAudioNode;
export default _default;
