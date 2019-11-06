import videojs from 'video.js';

import { SettingMenuItem, SettingMenuItemOptions } from './SettingMenuItem.js';
import { SettingSubOptionTitle } from './SettingSubOptionTitle.js';
import { SettingSubOptionItem } from './SettingSubOptionItem.js';
import { getMenuDimension } from '../MenuDimension';

interface Entry {
  value: string;
  label: string;
  defalut?: boolean;
  index: number;
}

interface Options extends SettingMenuItemOptions {
  entries: Array<Omit<Entry, 'index'> | string>;
}

function parseEntries(entries: Options['entries']) {
  let selected;

  entries = entries.map((item, index) => {
    let entry =
      typeof item === 'string'
        ? {
            value: item,
            label: item,
            defalut: false,
            index
          }
        : {
            ...item,
            index,
            defalut: item.defalut || false
          };

    if (entry.defalut) {
      selected = entry;
    }

    return entry;
  });

  if (!selected) {
    selected = entries[0];
  }

  return {
    entries,
    selected
  };
}

class SettingOptionItem extends SettingMenuItem {
  name_!: string;

  options_!: Options;

  entries: Entry[] = [];

  selectedValueEl!: Element;

  subMenuItems: Array<SettingSubOptionTitle | SettingSubOptionItem> = [];

  constructor(player: videojs.Player, options: Options) {
    super(player, options);

    this.setEntries(this.options_.entries);

    if (!this.entries.length) {
      this.hide();
    }
  }

  createEl() {
    const { icon, label } = this.options_;
    const el = videojs.dom.createEl('li', {
      className: 'vjs-menu-item vjs-setting-menu-item',
      innerHTML: `
        <div class="vjs-icon-placeholder ${icon || ''}"></div>
        <div class="vjs-setting-menu-label">${this.localize(label)}</div>
        <div class="vjs-spacer"></div>
      `
    });

    this.selectedValueEl = videojs.dom.createEl('div', {
      className: 'vjs-setting-menu-value'
    });

    el.appendChild(this.selectedValueEl);

    return el as HTMLLIElement;
  }

  setEntries(entries_: Options['entries'] = []) {
    Object.assign(this, parseEntries(entries_));

    this.updateSelectedValue();

    const SubOptionItem: typeof SettingSubOptionItem =
      (videojs.getComponent(`${this.name_}Child`) as any) || SettingSubOptionItem;

    this.subMenuItems = this.entries.map(({ label, value }) => {
      return new SubOptionItem(this.player_, {
        label,
        value,
        parent: this,
        menu: this.menu
      });
    });

    this.subMenuItems.splice(
      0,
      0,
      new SettingSubOptionTitle(this.player_, {
        label: this.options_.label,
        menu: this.menu
      })
    );
  }

  handleClick() {
    const dimensions = getMenuDimension(this.player_, this.subMenuItems);

    this.menu.update(this.subMenuItems);
    this.menu.resize(dimensions);
  }

  update({ label, value }) {
    this.selected = {
      label,
      value
    };

    this.updateSelectedValue();

    this.subMenuItems.forEach(function(item) {
      item.update && item.update();
    });
  }

  updateSelectedValue() {
    if (this.selected) {
      this.selectedValueEl.innerHTML = this.localize(this.selected.label);
    }
  }

  show() {
    super.show();
    this.menu.reset();
  }
}

videojs.registerComponent('SettingOptionItem', SettingOptionItem);
