import videojs from 'video.js';
import './controlBar.mobile';

// import './Progress/Progress';
import './controlBar.scss';

videojs.getComponent('ControlBar').prototype.options_.children = [
  'PlayToggle',
  'CustomControlSpacer',
  'VolumePanel',
  'CurrentTimeDisplay',
  'TimeDivider',
  'DurationDisplay',
  'ProgressControl',
  'CustomControlSpacer',
  'SettingMenuButton',
  'FullscreenToggle'
];

videojs.hook('setup', vjsPlayer => {
  vjsPlayer.on('mouseleave', () => {
    vjsPlayer.userActive(false);
  });

  vjsPlayer.ready(() => {
    vjsPlayer.controls(vjsPlayer.options_.controls !== false);
  });
});
