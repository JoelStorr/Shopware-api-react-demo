import { create } from "zustand";

export const useTlStore = create((set)=>({
    tl1: {
        isRunning: false,
    },
    tl2: {
        isRunning: false,
    },
    tl3: {
        isRunning: false,
    },

    setTimelineOneState: ()=> set((state)=>({tl1:{isRunning: !state.tl1.isRunning}})),
    setTimelineTwoState: ()=> set((state)=>({tl2:{isRunning: !state.tl2.isRunning}})),
    setTimelineThreeState: ()=> set((state)=>({tl3:{isRunning: !state.tl3.isRunning}})),


}))