import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useTlStore = create(
  subscribeWithSelector((set) => ({
    tl1: {
      isRunning: false,
      trigger: ".box1",
      position: { duration: 2, x: -2, y: 1.3, z: 0.5 },
      rotation: { duration: 2, x: 0, y: -(Math.PI * 0.5), z: 0 },
      groupRef: null,
      categoryID: null,
    },
    tl2: {
      isRunning: false,
      trigger: ".box2",
      position: { duration: 2, x: -2.5, y: 1.5, z: -1.3 },
      rotation: { duration: 2, x: 0, y: Math.PI * 0.5, z: 0 },
      groupRef: null,
      categoryID: null,
    },
    tl3: {
      isRunning: false,
      trigger: ".box3",
      position: { duration: 2, x: -1, y: 1.5, z: 4 },
      rotation: { duration: 2, x: -(Math.PI * 0.1), y: Math.PI * 0, z: 0 },
      groupRef: null,
      categoryID: null,
    },

    setTimelineOneState: (change) =>
      set((state) => ({ ...state, tl1: { ...state.tl1, isRunning: change } })),
    setTimelineTwoState: (change) =>
      set((state) => ({ ...state, tl2: { ...state.tl2, isRunning: change } })),
    setTimelineThreeState: (change) =>
      set((state) => ({ ...state, tl3: { ...state.tl3, isRunning: change } })),

    setRefTl1: (currRef) =>
      set((state) => ({ ...state, tl1: { ...state.tl1, groupRef: currRef } })),
    setRefTl2: (currRef) =>
      set((state) => ({ ...state, tl2: { ...state.tl2, groupRef: currRef } })),
    setRefTl3: (currRef) =>
      set((state) => ({ ...state, tl3: { ...state.tl3, groupRef: currRef } })),

    setTl1CategoryId: (id) =>
      set((state) => ({ ...state, tl1: { ...state.tl1, categoryID: id } })),
    setTl2CategoryId: (id) =>
      set((state) => ({ ...state, tl2: { ...state.tl2, categoryID: id } })),
    setTl3CategoryId: (id) =>
      set((state) => ({ ...state, tl3: { ...state.tl3, categoryID: id } })),
  }))
);