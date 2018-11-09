import { hook, registerPlugin } from "video.js";
import List from "../../Utils/List.js";

import "./BeforePlayNextLayer.js";
import "./ToggleAutoPlayNext.js";
import "./PrevNextButton.js";
import "./CancelPlayNextEl.js";

import "./Playlist.scss";

class PlayList extends List {
  constructor(player, array, startIndex = 0) {
    super(array, startIndex);

    this.player = player;

    this.loadPoster_ = true;

    this.autoPlayNext_ = true;

    this.play(startIndex);

    player.off("ended", player.playNext);
    player.on("ended", player.playNext);
  }

  autoPlayNext(value) {
    if (typeof value !== "undefined") {
      this.autoPlayNext_ = !!value;
    } else {
      return this.autoPlayNext_;
    }
  }

  play(index) {
    if (typeof index !== "undefined") {
      this.index(index);
    }

    const current = this.current();
    const { poster, sources, title } = current;
    const player = this.player;
    const addPoster = () => {
      player.poster(poster || "");
    };

    player.title("");
    player.poster("");

    if (this.loadPoster_) {
      this.loadPoster_ = false;

      // For Safari, poster will not hidden when video playing
      if (player.autoplay()) {
        player.one("autoplay-failure", addPoster);
      } else {
        addPoster();
      }
    } else {
      player.one("loadedmetadata", () => {
        player.play();
      });
    }

    if (player.preload() !== "none") {
      player.addClass("vjs-waiting");
      player.one("loadedmetadata", () => {
        player.removeClass("vjs-waiting");
      });
    }

    player.src(sources);
    player.title(title || "");

    player.trigger(
      "playlistchange",
      Object.assign(this.current(), {
        index: this.index()
      })
    );
  }
}

registerPlugin("setPlayList", function(playlist) {
  const player = this.player_;

  player.playlist = new PlayList(player, playlist);
  player.trigger("playlist");
});

hook("setup", vjsPlayer => {
  const playlist = vjsPlayer.options_.playlist || [];

  if (playlist.length) {
    vjsPlayer.setPlayList(playlist);
  }
});