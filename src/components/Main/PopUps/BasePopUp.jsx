import React, { useEffect } from 'react'
import './BasePopUp.scss'

import  useUIStore  from '../../../store/store'

export default function BasePopUp() {

   

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
        <div className='basePopUp'>
           <h1>Hello World Pop Up</h1>
        </div>
    </>
  );
}
