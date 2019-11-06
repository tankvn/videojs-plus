// eslint-disable-next-line
import * as originVideojs from 'video.js';

declare global {}

declare module 'video.js' {
  interface VideoJsPlayerOptions {
    playsinline?: boolean;
    mobileView?: boolean;
    title?: string;
  }

  export interface VideoJsPlayer {
    cache_: { [key: string]: any };
  }
}
