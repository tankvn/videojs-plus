/* eslint-disable */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = global || self, factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var SettingOptionItem = videojs.getComponent('SettingOptionItem');

  var SubtitleSettingMenuItem =
  /*#__PURE__*/
  function (_SettingOptionItem) {
    _inheritsLoose(SubtitleSettingMenuItem, _SettingOptionItem);

    function SubtitleSettingMenuItem(player, options) {
      var _this;

      _this = _SettingOptionItem.call(this, player, _extends({}, options, {
        name: 'SubtitleSettingMenuItem',
        label: 'Subtitles',
        icon: 'vjs-icon-subtitles',
        entries: player.options_.subtitles || []
      })) || this;

      _this.addClass('vjs-setting-subtitles');

      player.on('subtitles', function (_, subtitles) {
        _this.setEntries([].concat(subtitles.map(function (val, index) {
          return _extends({}, val, {
            value: index
          });
        }), [{
          label: 'Close Subtitles',
          value: -1,
          "default": false
        }]));

        _this.show();
      });
      player.on('subtitlechange', function (_, _ref) {
        var index = _ref.index;

        if (index === -1) {
          // close subtitles
          index = _this.entries.length - 1;
        }

        _this.select(index);

        _this.update(index);
      });
      return _this;
    }

    var _proto = SubtitleSettingMenuItem.prototype;

    _proto.onChange = function onChange(_ref2) {
      var value = _ref2.value;
      this.player_.subtitles().pick(value);
    };

    return SubtitleSettingMenuItem;
  }(SettingOptionItem);

  videojs.getComponent('SettingMenuButton').prototype.options_.entries.push('SubtitleSettingMenuItem');
  videojs.registerComponent('SubtitleSettingMenuItem', SubtitleSettingMenuItem);

  var subtitles =
  /*#__PURE__*/
  function (_videojs$getPlugin) {
    _inheritsLoose(subtitles, _videojs$getPlugin);

    function subtitles(player, options) {
      var _this;

      _this = _videojs$getPlugin.call(this, player, options) || this;
      _this.flag = null;
      _this.track = null;
      var timeout;

      var handleSubtitleChangeEvent = function handleSubtitleChangeEvent() {
        clearTimeout(timeout);

        var subtitles = _this.values();

        var currentSubtitle = subtitles.find(function (t) {
          return t.mode === 'showing';
        }) || {};
        var newFlag = currentSubtitle.label || currentSubtitle.id || -1; // multiple `change` event will reveiced when subtitles changed ( depends on number of subtitles or browser ? )
        // so that timeout is used to make sure `subtitlechange` event emit once;

        timeout = setTimeout(function () {
          if (_this.flag !== newFlag) {
            _this.flag = newFlag;
            player.trigger('subtitlechange', {
              index: subtitles.indexOf(currentSubtitle),
              label: currentSubtitle.label || ''
            });
          }
        }, 10);
      };

      player.textTracks().on('change', handleSubtitleChangeEvent);
      player.on('dispose', function () {
        player.textTracks().off('change', handleSubtitleChangeEvent);
      });
      return _this;
    }

    var _proto = subtitles.prototype;

    _proto.values = function values() {
      var tracks = this.player.textTracks();
      var subtitles = [];

      for (var i = 0; i < tracks.length; i++) {
        if (tracks[i].kind === 'subtitles') {
          subtitles.push(tracks[i]);
        }
      }

      return subtitles;
    };

    _proto.load = function load(subtitles_) {
      var _this2 = this;

      if (subtitles_ === void 0) {
        subtitles_ = [];
      }

      var player = this.player;
      var subtitles = subtitles_.map(function (a) {
        return Object.assign({}, a);
      });

      if (subtitles && subtitles.length) {
        this.remove();
        subtitles.forEach(function (subtitle) {
          if (_this2.flag) {
            subtitle["default"] = _this2.flag === subtitle.label || -1;
          }

          var manualCleanup = true; // set default to false, otherwise subtitle will reset to the default subtitle
          // when user switch quality with quality plugin

          var trackEl = player.addRemoteTextTrack(_extends({}, subtitle, {
            "default": false
          }), manualCleanup);

          if (subtitle["default"]) {
            _this2.flag = subtitle.label;
            _this2.track = trackEl.track;
            trackEl.track.mode = 'showing';
          }
        });
        player.trigger('subtitles', subtitles);
      }

      return this;
    };

    _proto.remove = function remove() {
      var _this3 = this;

      this.values().forEach(function (track) {
        _this3.player.removeRemoteTextTrack(track);
      });
      return this;
    };

    _proto.pick = function pick(index) {
      var subtitles = this.values();
      var newTrack = subtitles[index];

      if (newTrack) {
        this.track.mode = 'disabled';
        this.track = newTrack;
        newTrack.mode = 'showing';
      } else {
        this.track.mode = 'disabled';
      }

      return this;
    };

    return subtitles;
  }(videojs.getPlugin('plugin'));

  videojs.hook('setup', function (vjsPlayer) {
    vjsPlayer.ready(function () {
      vjsPlayer.subtitles().load(vjsPlayer.options_.subtitles);
    });
  });
  videojs.registerPlugin('subtitles', subtitles);

})));
//# sourceMappingURL=index.js.map
