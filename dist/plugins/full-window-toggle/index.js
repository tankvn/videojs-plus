(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = global || self, factory(global.videojs));
}(this, function (videojs) { 'use strict';

  videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var FullWindowToggle =
  /*#__PURE__*/
  function (_videojs$getComponent) {
    _inheritsLoose(FullWindowToggle, _videojs$getComponent);

    function FullWindowToggle(player, options) {
      var _this;

      _this = _videojs$getComponent.call(this, player, options) || this;
      player.requestFullscreen = player.enterFullWindow.bind(player);
      player.enterFullScreen = player.enterFullWindow.bind(player);
      player.exitFullscreen = player.exitFullWindow.bind(player);

      player.isFullscreen = function () {
        return !!player.isFullWindow;
      };

      player.on('enterFullWindow', function () {
        player.trigger('fullscreenchange');
      });
      player.on('exitFullWindow', function () {
        player.trigger('fullscreenchange');
      });
      return _this;
    }

    var _proto = FullWindowToggle.prototype;

    _proto.handleClick = function handleClick() {
      if (!this.player_.isFullWindow) {
        this.player_.enterFullScreen();
      } else {
        this.player_.exitFullscreen();
      }
    };

    return FullWindowToggle;
  }(videojs.getComponent('FullscreenToggle'));

  videojs.registerComponent('FullWindowToggle', FullWindowToggle);
  var controlBarChildren = videojs.getComponent('ControlBar').prototype.options_.children;
  var fullScreenButtonIndex = controlBarChildren.indexOf('FullscreenToggle');
  controlBarChildren[fullScreenButtonIndex] = 'FullWindowToggle';

}));
//# sourceMappingURL=index.js.map
