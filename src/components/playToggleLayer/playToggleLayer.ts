import videojs from 'video.js';
import './PlayToggleLayer.scss';

const PlayToggleButton: typeof videojs.Button = videojs.getComponent('PlayToggle') as any;
const ClickableComponent = videojs.getComponent('ClickableComponent');

class PlayToggleLayer extends ClickableComponent {
  createEl() {
    return videojs.dom.createEl('div', {
      className: 'vjs-play-toggle-layer'
    });
  }

  handleClick(event: videojs.EventTarget.Event) {
    if (this.player_.userActive() || this.player_.paused()) {
      PlayToggleButton.prototype.handleClick.call(this, event);
    }
  }
}

videojs.registerComponent('PlayToggleLayer', PlayToggleLayer);

const playerChildren = videojs.getComponent('Player').prototype.options_.children!;
const loadSpinnerIndex = playerChildren.indexOf('loadingSpinner');

playerChildren.splice(loadSpinnerIndex, 0, 'PlayToggleLayer');
