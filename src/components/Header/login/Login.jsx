import React from 'react';

import useUIStore from '../../../store/store';

export default function Login() {
    const [popUpSwitch, popUpLoginSwitch] = useUIStore((state) => [
      state.setShowPopUp,
      state.setLoginPopUp,
    ]);

    function toggle() {
      popUpSwitch();
      popUpLoginSwitch();
    }

    return (
      <button
        onClick={() => {
          toggle();
        }}
      >
        Login
      </button>
    );
}
