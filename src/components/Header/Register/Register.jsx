import React, { useState } from 'react';
import  useUILogic  from '../../../store/uiStore';


export default function Register() {

   const popUpSwitch = useUILogic((state) => state.setRegistrationPopUp)

  return (
    <button onClick={()=>{popUpSwitch()}}>Register</button>
  )
}
