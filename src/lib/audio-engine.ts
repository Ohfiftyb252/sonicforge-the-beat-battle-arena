export class AudioEngine {
  private static instance: AudioEngine;
  private context: AudioContext;
  private constructor() {
    this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }
  getContext() {
    return this.context;
  }
  async decode(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
    return await this.context.decodeAudioData(arrayBuffer);
  }
  createBufferSource(buffer: AudioBuffer): AudioBufferSourceNode {
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    return source;
  }
  async renderOffline(buffer: AudioBuffer, transform: (ctx: OfflineAudioContext, source: AudioBufferSourceNode) => void): Promise<AudioBuffer> {
    const offlineCtx = new OfflineAudioContext(
      buffer.numberOfChannels,
      buffer.length,
      buffer.sampleRate
    );
    const source = offlineCtx.createBufferSource();
    source.buffer = buffer;
    transform(offlineCtx, source);
    source.start(0);
    return await offlineCtx.startRendering();
  }
  trimBuffer(buffer: AudioBuffer, start: number, end: number): AudioBuffer {
    const sampleRate = buffer.sampleRate;
    const startSample = Math.floor(start * sampleRate);
    const endSample = Math.floor(end * sampleRate);
    const frameCount = endSample - startSample;
    if (frameCount <= 0) return buffer;
    const newBuffer = this.context.createBuffer(
      buffer.numberOfChannels,
      frameCount,
      sampleRate
    );
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      const channelData = buffer.getChannelData(i);
      const newChannelData = newBuffer.getChannelData(i);
      newChannelData.set(channelData.subarray(startSample, endSample));
    }
    return newBuffer;
  }
  // Basic WAV Encoder implementation for 44.1k 16-bit
  async encodeWAV(audioBuffer: AudioBuffer): Promise<Blob> {
    const numOfChan = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];
    let i, sample, offset = 0, pos = 0;
    const setUint16 = (data: number) => { view.setUint16(pos, data, true); pos += 2; };
    const setUint32 = (data: number) => { view.setUint32(pos, data, true); pos += 4; };
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8);
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt "
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(audioBuffer.sampleRate);
    setUint32(audioBuffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);
    setUint32(0x61746164); // "data"
    setUint32(length - pos - 4);
    for (i = 0; i < audioBuffer.numberOfChannels; i++) {
      channels.push(audioBuffer.getChannelData(i));
    }
    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (sample < 0 ? sample * 0x8000 : sample * 0x7FFF) | 0;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }
    return new Blob([buffer], { type: "audio/wav" });
  }
}