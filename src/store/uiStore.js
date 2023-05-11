import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

 const useUILogic = create(
  subscribeWithSelector((set) => ({
    /* NOTE: Login UI */

    showPopUp: 0,
    setShowPopUp: () =>
      set((state) => ({ ...state, showPopUp: !state.showPopUp })),

    showLoginPopUp: false,
    setLoginPopUp: () =>
      set((state) => ({ ...state, showLoginPopUp: !state.showLoginPopUp })),

    /* NOTE: Register UI */
    showRegistrationPopUp: false,
    setRegistrationPopUp: () =>
      set((state) => ({
        ...state,
        showRegistrationPopUp: !state.showRegistrationPopUp,
      })),
  }))
);



export default useUILogic;