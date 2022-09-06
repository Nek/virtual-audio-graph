import { CustomVirtualAudioNodeFactory, VirtualAudioNode } from "../types";
export default abstract class VirtualAudioNodeBase {
    readonly node: string | CustomVirtualAudioNodeFactory;
    cannotUpdateInPlace(newVirtualAudioNode: VirtualAudioNode): boolean;
}
