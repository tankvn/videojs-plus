(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = global || self, factory(global.videojs));
}(this, function (videojs) { 'use strict';

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

  var QualityHlsSettingItem =
  /*#__PURE__*/
  function (_SettingOptionItem) {
    _inheritsLoose(QualityHlsSettingItem, _SettingOptionItem);

    function QualityHlsSettingItem(player, options) {
      var _this;

      _this = _SettingOptionItem.call(this, player, _extends({}, options, {
        name: 'QualityHlsSettingItem',
        label: 'Quality',
        icon: 'vjs-icon-hd'
      })) || this;

      _this.addClass('vjs-setting-quality');

      _this.levels = [];

      _this.handleAllLevelsAdded();

      return _this;
    }

    var _proto = QualityHlsSettingItem.prototype;

    _proto.handleAllLevelsAdded = function handleAllLevelsAdded() {
      var _this2 = this;

      var player = this.player_;

      if (!player.qualityLevels) {
        videojs.log.warn('plugin videojs-contrib-quality-levels do not exsits');
        return false;
      }

      var qualityLevels = player.qualityLevels();
      var levels = [];
      var timeout;
      qualityLevels.on('addqualitylevel', function (_ref) {
        var qualityLevel = _ref.qualityLevel;
        clearTimeout(timeout);
        levels.push(qualityLevel);

        var callback = function callback() {
          _this2.levels = levels.slice(0);
          player.trigger('before-quality-setup', {
            levels: _this2.levels
          });

          _this2.onAllLevelsAdded();

          levels = [];
        };

        timeout = setTimeout(callback, 10);
      });
    };

    _proto.onAllLevelsAdded = function onAllLevelsAdded() {
      var _this3 = this;

      var entries = [].concat(this.levels.map(function (_ref2) {
        var height = _ref2.height;
        return {
          label: _this3.localize(height + "p"),
          value: height,
          default: false
        };
      }).sort(function (a, b) {
        return b.value - a.value;
      }), [{
        label: 'Auto',
        value: 'auto',
        default: true
      }]);
      this.setEntries(entries);
      this.show();
      this.player_.trigger('qualities', this.levels);
    };

    _proto.onChange = function onChange(selected) {
      var _this4 = this;

      var value = selected.value;

      _SettingOptionItem.prototype.onChange.call(this, selected);

      this.levels.forEach(function (lv) {
        lv.enabled = lv.height === value || value === 'auto';
      });
      this.player_.trigger('qualitychange', this.entries.reduce(function (acc, entry, index) {
        if (entry.value === value) {
          var level = _this4.levels.find(function (v) {
            return v.height === value;
          }) || {};
          acc = _extends({
            index: index
          }, entry, level);
        }

        return acc;
      }, {}));
    };

    return QualityHlsSettingItem;
  }(SettingOptionItem);

  videojs.getComponent('SettingMenuButton').prototype.options_.entries.push('QualityHlsSettingItem');
  videojs.registerComponent('QualityHlsSettingItem', QualityHlsSettingItem);

}));
//# sourceMappingURL=index.js.map
