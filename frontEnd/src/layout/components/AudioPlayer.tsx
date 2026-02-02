import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioref = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext, repeatMode } = usePlayerStore();

  useEffect(() => {
    if (isPlaying) audioref.current?.play();
    else audioref.current?.pause();
  }, [isPlaying]);

  // handle end of song
  useEffect(() => {
    const audio = audioref.current;
    const handleEnded = () => {
      // if repeat one is enabled, the playNext will handle replaying
      playNext();
    };
    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // handle song change
  useEffect(() => {
    if (!audioref.current || !currentSong) return;
    const audio = audioref.current;
    // check if this is new song
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      //reset playback position
      audio.currentTime = 0;

      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  // Update audio loop attribute based on repeat mode
  useEffect(() => {
    if (audioref.current) {
      audioref.current.loop = repeatMode === "one";
    }
  }, [repeatMode]);

  return <audio ref={audioref} />;
};

export default AudioPlayer;
