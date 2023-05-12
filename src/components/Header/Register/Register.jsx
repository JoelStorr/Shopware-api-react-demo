import React, { useState } from 'react';
import  useUIStore  from '../../../store/store';


export default function Register() {

   const [popUpSwitch, popUpRegisterSwitch] = useUIStore((state) => [
     state.setShowPopUp,
     state.setRegistrationPopUp,
   ]);

   

   function toggle(){
    popUpSwitch();
    popUpRegisterSwitch()
   }

  return (
    <button onClick={()=>{toggle()}}>Register</button>
  )
}
