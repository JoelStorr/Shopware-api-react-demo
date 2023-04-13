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
          <Environment background={false} blur={0} path="/" preset="city"  />

          <ScrollControls pages={4} damping={0} horizontal={false}>
            <Main />
            <Scroll></Scroll>
            <Scroll html>
              <div
                id="wasserhahn"
                style={{ position: "absolute", top: "0vh", color: "black" }}
              >
                Wasserhan
              </div>
              <div
                id="2c297ef976e741caa67787d93b405866"
                style={{ position: "absolute", top: "100vh", color: "black" }}
              >
                handtuchhalter
              </div>
              <div
                id="hakensysteme"
                style={{ position: "absolute", top: "200vh", color: "black" }}
              >
                harkensystem
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
}

export default App
