// Modules
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
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
          <div className='renderBox'>
           <Canvas camera={{position:[-1.5,1.5,-2.5]}} >
            

           {orbitControls && (<OrbitControls />)}
              

            <ScrollControls pages={3} damping={0.1} horizontal={false}>
              <Main />
              <Scroll></Scroll>
              <Scroll html>


                
              </Scroll>

            </ScrollControls>

           </Canvas>
          </div>
    </>
    
  );
}

export default App
