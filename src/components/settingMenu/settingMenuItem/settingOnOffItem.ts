import videojs from 'video.js';
import { SettingMenuItem } from './settingMenuItem';

export class SettingOnOffItem extends SettingMenuItem {
  active: boolean;

  createEl() {
    const options = this.options_;
    const el = videojs.dom.createEl('li', {
      className: 'vjs-menu-item vjs-setting-onoff-item',
      innerHTML: `
        <div class="vjs-icon-placeholder ${this.options_.icon || ''}"></div>
        <div>${this.localize(options.label)}</div>
        <div class="vjs-spacer"></div>
        <div>
          <div class="vjs-onoff-button"></div>
        </div>
      `
    });

    // required as @types/video.js
    return el as HTMLLIElement;
  }

  update(active?: boolean) {
    this.active = typeof active === 'undefined' ? !this.active : active;

    if (this.active) {
      this.addClass('vjs-active');
    } else {
      this.removeClass('vjs-active');
    }
  }

  handleClick() {
    this.update();
  }

  selected() {}
}

videojs.registerComponent('SettingOnOffItem', SettingOnOffItem);
