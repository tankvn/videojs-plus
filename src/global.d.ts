// eslint-disable-next-line
import videojs from 'video.js';

declare module 'video.js' {
  interface VideoJsPlayerOptions {
    playsinline?: boolean;
    mobileView?: boolean;
    title?: string;
  }

  interface VideoJsPlayer {
    cache_: { [key: string]: any };
  }
}
