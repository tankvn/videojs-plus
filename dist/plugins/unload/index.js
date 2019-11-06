/* eslint-disable */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = global || self, factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

  var unloaded = false;

  function middleware(player) {
    return {
      callPlay: function callPlay() {
        return unloaded && videojs.middleware.TERMINATOR;
      }
    };
  }

  function reset() {
    unloaded = false;
    this.tech_.show();
  }

  function unload(options) {
    if (options === void 0) {
      options = {};
    }

    unloaded = true;
    this.pause();
    this.tech_.hide();
    this.off('loadstart', reset);
    this.on('loadstart', reset);

    if (options.loading) {
      this.addClass('vjs-seeking');
    }
  }

  videojs.use('*', middleware);
  videojs.registerPlugin('unload', unload);

})));
//# sourceMappingURL=index.js.map
