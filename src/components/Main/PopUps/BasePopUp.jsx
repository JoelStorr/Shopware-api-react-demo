import React, { useEffect, useState } from 'react'
import './BasePopUp.scss'

import  useUIStore  from '../../../store/store'
import RegisterPopUp from '../../Header/Register/RegisterPopUp';
import LoginPopUp from '../../Header/login/LoginPopUp';

export default function BasePopUp(props) {

   const [logInOrRegister, setLogInOrRegister] = useState(
     useUIStore((state) => state.logInOrRegister)
   );
  


    
    


    console.log('Loded Base PopUp');

   /*  useEffect(()=>{
         const unsubScribeUIStore = useUIStore.subscribe(
           (state) => state.showRegistrationPopUp,
           (showRegistrationPopUp) => setPopUpShown(showRegistrationPopUp)
         );

         return () => {
           unsubScribeUIStore();
         };
    },[]) */



  return (
    <>
      <div className="basePopUp">
        {logInOrRegister === "login" && <LoginPopUp />}
        {logInOrRegister === 'register' && <RegisterPopUp />}
      </div>
    </>
  );
}
