import videojs, { VideoJsPlayer } from 'video.js';

const ClickableComponent = videojs.getComponent('ClickableComponent');

interface Options extends videojs.ComponentOptions {
  // FIXME:
  menu: any;
}

class CloseSettingMenu extends ClickableComponent {
  el_: HTMLElement;

  options_: Options;

  constructor(player: VideoJsPlayer, options: Options) {
    super(player, options);
  }

  buildCSSClass() {
    return 'vjs-close-menu-layer vjs-close-setting-menu';
  }

  handleClick() {
    this.options_.menu.menuButton_.hideMenu();
  }
}

videojs.registerComponent('CloseSettingMenu', CloseSettingMenu);

export default CloseSettingMenu;
