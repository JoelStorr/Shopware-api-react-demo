// Modules
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {useControls} from 'leva';


// Custom
import './App.scss'
import MainHeader from '../Header/Header'
import Main from '../Main/Main'

function App() {
  const [count, setCount] = useState(0)

  //NOTE: Change Leva route for Production
  const {orbitControls} = useControls({ orbitControls: true})

  return (
    <>
          <MainHeader />
          <div className='renderBox'>
           <Canvas >
           {orbitControls && (<OrbitControls />)}
              <Main />
           </Canvas>
          </div>
    </>
    
  );
}

export default App
