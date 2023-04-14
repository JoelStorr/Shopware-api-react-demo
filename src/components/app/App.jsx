// Modules
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import {useControls} from 'leva';
import { ScrollControls, Scroll } from '@react-three/drei';


// Custom
import './App.scss'
import MainHeader from '../Header/Header'
import Main from '../Main/Main'
import { Camera } from 'three';


function App() {


  //NOTE: Change Leva route for Production
  const {orbitControls} = useControls({ orbitControls: false})

  return (
    <>
      <MainHeader />
      <div className="renderBox">
        <Canvas camera={{ position: [-1.5, 1.5, -2.5] }}>
          {orbitControls && <OrbitControls />}
          <Environment background={false} blur={0} path="/" preset="city" />
          <Main />
        </Canvas>
      </div>
      <div className="top-spacer"></div>
      <div className="scroller box1" id="wasserhahn">Wasserhan</div>
      <div className="scroller box2" id="2c297ef976e741caa67787d93b405866"> Handtuchhalter</div>
      <div className="scroller box3" id="hakensysteme">Harkensystheme</div>
    </>
  );
}

export default App
