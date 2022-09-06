import VirtualAudioGraph from "./VirtualAudioGraph";
export * from "./nodeFactories";
export { default as createNode } from "./createNode";
export { default as createWorkletNode } from "./createWorkletNode";
declare const _default: (config?: {
    audioContext?: AudioContext | undefined;
    output?: AudioDestinationNode | undefined;
} | undefined) => VirtualAudioGraph;
export default _default;
