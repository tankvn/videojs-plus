import videojs from 'video.js';

import './title.scss';

class Title extends videojs.getComponent('Component') {
  title_: string;

  contentEl_!: Element;

  constructor(player: videojs.Player, options: any) {
    super(player, options);

    this.title_ = options.playerOptions.title || '';

    this.update(this.title_);
  }

  createEl() {
    const el = super.createEl('div', {
      className: 'vjs-title'
    });

    this.contentEl_ = videojs.dom.createEl('div', {
      className: 'vjs-title-field'
    });

    el.appendChild(this.contentEl_);

    return el;
  }

  update(title_: string) {
    if (!title_) {
      this.hide();
    } else {
      this.show();
    }

    this.player_.cache_.title = this.title_;
    this.title_ = title_;

    this.contentEl_.innerHTML = title_;
  }
}

const name = 'VideoTitle';

function title(this: videojs.Player, title_: string) {
  const videoTitle: Title = this.player_.getChild(name) as any;

  if (typeof title_ === 'undefined') {
    return videoTitle.title_;
  }

  videoTitle.update(title_);
}

videojs.registerPlugin('title', title);

videojs.registerComponent(name, Title);

videojs.getComponent('Player').prototype.options_.children!.splice(2, 0, name);
