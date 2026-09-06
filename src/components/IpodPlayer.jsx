import React, { useRef, useState } from "react";

/**
 * iPod-style shell for the desk, wired to a single looping track.
 *
 * The audio lives in public/ rather than being imported, so webpack leaves
 * it alone and the browser can stream and range-request it. preload is
 * "metadata" for the same reason: a 3.5MB file has no business downloading
 * before anyone presses play, but the duration is wanted up front so the
 * progress bar has a scale to work against.
 */

const TRACK_SRC = `${process.env.PUBLIC_URL}/vyzee-slowed.mp3`;
const TRACK_NAME = "Vyzee (slowed + reverb)";
const TRACK_ARTIST = "SOPHIE";

// Where the track is worth joining. Everything before this is skipped: on
// first play, on replay after it runs out, and as the floor the back key
// scrubs to, so the intro is never reachable rather than being merely
// skipped once.
const START_AT = 33;

// What the skip keys move by. There is one track, so they scrub within it
// rather than stepping through a queue that does not exist.
const SKIP_SECONDS = 10;

const IpodPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // START_AT only holds if the file is actually longer than it; a shorter
  // one would otherwise be seeked past its own end and never play.
  const startOf = (audio) =>
    audio.duration && audio.duration > START_AT ? START_AT : 0;

  const seekToStart = () => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = startOf(audio);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      // Metadata may not have arrived in time for onLoadedMetadata to have
      // placed the head yet, so this is also checked at the point of play.
      if (audio.currentTime < startOf(audio)) seekToStart();

      // play() rejects when the browser declines the gesture, and an
      // unhandled rejection here would leave the screen claiming to be
      // playing something that is silent.
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const skip = (seconds) => () => {
    const audio = audioRef.current;
    if (!audio) return;

    const duration = audio.duration || 0;
    const next = audio.currentTime + seconds;
    // Clamped rather than wrapped: running off either end of the only track
    // should stop there, not jump to another one. The floor is the start
    // point, not zero, so scrubbing back cannot reach the skipped intro.
    audio.currentTime = Math.min(Math.max(next, startOf(audio)), duration);
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    // Measured across the part that actually plays, so the bar fills from
    // empty rather than jumping to wherever the start point falls.
    const from = startOf(audio);
    const span = audio.duration - from;
    setProgress(span > 0 ? Math.min(Math.max((audio.currentTime - from) / span, 0), 1) : 0);
  };

  return (
    <div className="ipod">
      <audio
        ref={audioRef}
        src={TRACK_SRC}
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={seekToStart}
        // Repeats by hand rather than with the loop attribute, which would
        // send it back to 0 and play the intro this is here to skip.
        onEnded={() => {
          seekToStart();
          const audio = audioRef.current;
          if (audio) audio.play().catch(() => setPlaying(false));
        }}
        // The element is driven by the wheel below, so it carries no
        // controls of its own; these keep the two in step if the browser
        // pauses it for us, as it does when another tab takes over audio.
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div className="ipod__screen">
        <div className="ipod__status">
          <span>{playing ? "▶" : "⏸"}</span>
          <span className="ipod__battery" aria-hidden="true" />
        </div>

        <p className="ipod__track">{TRACK_NAME}</p>
        <p className="ipod__artist">{TRACK_ARTIST}</p>

        <div className="ipod__bar" aria-hidden="true">
          <span
            className="ipod__bar-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="ipod__wheel">
        <button type="button" className="ipod__key ipod__key--menu">
          Menu
        </button>
        <button
          type="button"
          className="ipod__key ipod__key--prev"
          onClick={skip(-SKIP_SECONDS)}
          aria-label={`Back ${SKIP_SECONDS} seconds`}
        >
          {"⏮"}
        </button>
        <button
          type="button"
          className="ipod__key ipod__key--next"
          onClick={skip(SKIP_SECONDS)}
          aria-label={`Forward ${SKIP_SECONDS} seconds`}
        >
          {"⏭"}
        </button>
        <button
          type="button"
          className="ipod__key ipod__key--play"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          {"⏯"}
        </button>
        <button
          type="button"
          className="ipod__center"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        />
      </div>
    </div>
  );
};

export default IpodPlayer;
