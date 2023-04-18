import { create } from "zustand";

export const useTlStore = create((set) => ({
  tl1: {
    isRunning: false,
    trigger: '.box1',
    position: { duration: 2, x: -3, y: 1.8, z: 0 },
    rotation: { duration: 2, x: 0, y: -(Math.PI * 0.5), z: 0 },
  },
  tl2: {
    isRunning: false,
    trigger: '.box2',
    position: { duration: 2, x: -2.5, y: 1.5, z: -0.5 },
    rotation: { duration: 2, x: 0, y: Math.PI * 0.5, z: 0 },
  },
  tl3: {
    isRunning: false,
    trigger: '.box3',
    position: { duration: 2, x: -1, y: 1.5, z: 4 },
    rotation: { duration: 2, x: -(Math.PI * 0.1), y: Math.PI * 0, z: 0 },
  },

  setTimelineOneState: (change) =>
    set((state) => ({ ...state ,tl1: { ...state.tl1, isRunning: change } })),
   setTimelineTwoState: (change) =>
    set((state) => ({ ...state ,tl2: { ...state.tl2, isRunning: change } })),
  setTimelineThreeState: (change) =>
    set((state) => ({ ...state, tl3: { ...state.tl3, isRunning: change } })), 
}));