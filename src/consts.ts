// input
// others
type AudioFormat = 'aiff'| 'wav'| 'ac3'| 'mp3'| 'mp4'| 'm4a'| 'ogg'| 'opus'| 'webm';
type AudioFormatOptions = string[]
type Export = Record<AudioFormat, AudioFormatOptions>

/* eslint-disable @typescript-eslint/ban-types */
type Logger = {
  debug: Function,
  info: Function,
  log: Function,
}
/* eslint-enable @typescript-eslint/ban-types */

type Options = {
  output: string; /** @param output Name for the output files */
  path: string;
  export: Array<AudioFormat>;
  format: 'howler' | 'howler2' | 'createjs' | 'default';
  autoplay: string;
  loop: Array<string>;
  silence: number;
  gap: number;
  minlength: number;
  bitrate: number;
  vbr: number;
  'vbr:vorbis': number;
  samplerate: number;
  channels: 1 | 2;
  rawparts: Array<AudioFormat>;
  ignorerounding: 0 | 1;
  logger: Logger,
}

// output

type DefaultOutput = {
  resources: Array<string>,
  spritemap: {[key: string]: { start: number, end: number, loop: boolean }},
  autoplay?: string,
}

type HowlerSprite = {[key: string]: [number, number, boolean?]}
type CreateJSSprite = { id: string, startTime: number, duration: number }

type HowlerOutput = {
  urls: Array<string>,
  sprite: HowlerSprite,
}

type Howler2Output = {
  src: Array<string>,
  sprite: HowlerSprite,
}

type CreateJSOutput = {
  src: string,
  data: {
    audioSprite: Array<CreateJSSprite>,
  }
}

export type {
  Options,
  Logger,
  DefaultOutput,
  HowlerOutput,
  Howler2Output,
  CreateJSOutput,
  HowlerSprite,
  CreateJSSprite,
  Export,
  AudioFormat,
  AudioFormatOptions,
};

const defaultsOptions: Options = {
  output: 'output',
  path: '',
  export: ['ogg','m4a','mp3','ac3'],
  format: 'default',
  autoplay: '',
  loop: [],
  silence: 0,
  gap: 1,
  minlength: 0,
  bitrate: 128,
  vbr: -1,
  'vbr:vorbis': -1,
  samplerate: 44100,
  channels: 1,
  rawparts: [],
  ignorerounding: 0,
  logger: {
    debug() {
      // method for debug logs
    },
    info() {
      // method for info logs
    },
    log() {
      // method for default logs
    },
  },
};

export default defaultsOptions;
