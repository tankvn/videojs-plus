import videojs, { VideoJsPlayer } from 'video.js';
import { SettingMenu } from '../settingMenu';

const MenuItem = videojs.getComponent('MenuItem');

interface Options extends videojs.ComponentOptions {
  icon?: string;
  label: string;
  menu: SettingMenu;
}

export interface SettingMenuItemOptions extends Options {}

export class SettingMenuItem extends MenuItem {
  menu: SettingMenu;

  options_!: Options;

  constructor(player: VideoJsPlayer, options: Options) {
    super(
      player,
      videojs.mergeOptions(
        {
          selectable: false
        },
        options
      )
    );

    this.menu = options.menu;
  }
}

videojs.registerComponent('SettingMenuItem', SettingMenuItem);
