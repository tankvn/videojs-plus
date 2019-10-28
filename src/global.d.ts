// eslint-disable-next-line
import * as videojs from 'video.js';

declare module 'video.js' {
  interface VideoJsPlayerOptions {
    playsinline?: boolean;
  }
}
