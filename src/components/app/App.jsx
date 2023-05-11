/* NOTE: Node Modules */
import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import {useControls} from 'leva';


/* NOTE: Custom Imports */
import './App.scss';
import MainHeader from '../Header/Header';
import Main from '../Main/Main';
import BasePopUp from '../Main/PopUps/BasePopUp';

import ShopDetailOverlay from '../Main/Overlays/ShopDetailOverlay';
import RegisterPopUp from '../Header/Register/RegisterPopUp';
/* NOTE: Store Import */
import  useUILogic  from "./../../store/uiStore";



function App() {

  /* NOTE: Handle PopUp Shown */
  const [popUpShown, setPopUpShown] = useState(null);
  
  
    
  
   useEffect(()=>{
     let removeUISub = useUILogic.subscribe(
       (state) => {
         console.log('State Check:',state.showPopUp);
         return state.showPopUp;
       },
       (showPopUp) => {
         console.info("Run Show Popup", showPopUp);
         setPopUpShown(showPopUp);
       }
     );

     return ()=>{
      removeUISub();
     }
   },[])
  



  //NOTE: Change Leva route for Production
  const {orbitControls} = useControls({ orbitControls: false})
  //NOTE: Base Camera Values -> [3, 2, 3]
  return (
    <>
      <MainHeader />
      <ShopDetailOverlay />
      {popUpShown && (<BasePopUp />)}
      {/* 3D Render Element */}
      <div className="renderBox">
        <Canvas camera={{ position: [3, 2, 3], rotation: [0, 1, 0] }}>
          {orbitControls && <OrbitControls />}
          <Environment background={false} blur={0} path="/" preset="city" />
          <Main />
        </Canvas>
      </div>
      {/* Scroll Spacer */}
      <div className="top-spacer"></div>
      <div
        className="scroller box1"
        id="shopId-929de9a601d346e49f23861b67d6575e"
      >
        Wasserhan
      </div>
      <div
        className="scroller box2"
        id="shopId-2c297ef976e741caa67787d93b405866"
      >
        {" "}
        Handtuchhalter
      </div>
      <div
        className="scroller box3"
        id="shopId-88e526e83af241e5a29c1a2c26ab596a"
      >
        Harkensystheme
      </div>
    </>
  );
}

export default App
