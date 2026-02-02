import { create } from "zustand";
import { Song } from "@/types";
import { useChatStore } from "./useChatStore";

type RepeatMode = "off" | "all" | "one";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  originalQueue: Song[];

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  isShuffled: false,
  repeatMode: "off",
  originalQueue: [],

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];

    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }
    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }

    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;

    const currentSong = get().currentSong;
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity:
          willStartPlaying && currentSong
            ? `Playing ${currentSong.title} by ${currentSong.artist}`
            : "Idle",
      });
    }

    set({
      isPlaying: willStartPlaying,
    });
  },

  playNext: () => {
    const { currentIndex, queue, repeatMode } = get();

    // if repeat one, replay current song
    if (repeatMode === "one") {
      const currentSong = queue[currentIndex];
      if (currentSong) {
        const socket = useChatStore.getState().socket;
        if (socket.auth) {
          socket.emit("update_activity", {
            userId: socket.auth.userId,
            activity: `Playing ${currentSong.title} by ${currentSong.artist}`,
          });
        }
        set({ isPlaying: true });
      }
      return;
    }

    const nextIndex = currentIndex + 1;

    // if there is a next song to play, let's play it
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];

      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
        });
      }

      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else if (repeatMode === "all") {
      // repeat the queue from the beginning
      const firstSong = queue[0];
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${firstSong.title} by ${firstSong.artist}`,
        });
      }
      set({
        currentSong: firstSong,
        currentIndex: 0,
        isPlaying: true,
      });
    } else {
      // no next song
      set({ isPlaying: false });

      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Idle`,
        });
      }
    }
  },
  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    // theres a prev song
    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];

      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
        });
      }

      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else {
      // no prev song
      set({ isPlaying: false });

      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Idle`,
        });
      }
    }
  },

  toggleShuffle: () => {
    const { queue, currentSong, isShuffled, originalQueue } = get();

    if (!isShuffled) {
      // Enable shuffle - save original queue and shuffle
      const currentIndex = queue.findIndex((s) => s._id === currentSong?._id);
      const originalQueueToSave =
        originalQueue.length > 0 ? originalQueue : [...queue];

      // Create shuffled queue keeping current song at current position
      const queueWithoutCurrent = queue.filter(
        (_, idx) => idx !== currentIndex,
      );
      const shuffled = queueWithoutCurrent.sort(() => Math.random() - 0.5);

      // Insert current song at the beginning
      const newQueue = currentSong ? [currentSong, ...shuffled] : shuffled;

      set({
        queue: newQueue,
        currentIndex: 0,
        isShuffled: true,
        originalQueue: originalQueueToSave,
      });
    } else {
      // Disable shuffle - restore original queue
      const currentSongId = currentSong?._id;
      const originalIndex = originalQueue.findIndex(
        (s) => s._id === currentSongId,
      );

      set({
        queue: originalQueue,
        currentIndex: originalIndex !== -1 ? originalIndex : 0,
        isShuffled: false,
      });
    }
  },

  toggleRepeat: () => {
    const { repeatMode } = get();

    // Cycle through: off -> all -> one -> off
    const nextMode: RepeatMode =
      repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off";

    set({ repeatMode: nextMode });
  },
}));
