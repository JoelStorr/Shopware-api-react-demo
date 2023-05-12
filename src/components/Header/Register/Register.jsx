import React, { useState } from 'react';
import  useUIStore  from '../../../store/store';


export default function Register() {

   const popUpSwitch = useUIStore((state) => state.setRegistrationPopUp)

  return (
    <button onClick={()=>{popUpSwitch()}}>Register</button>
  )
}
