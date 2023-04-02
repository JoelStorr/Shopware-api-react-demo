// Modules
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'


// Custom
import './App.scss'
import MainHeader from '../Header/Header'
import Main from '../Main/Main'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
          <MainHeader />
          <div className='renderBox'>
           <Canvas >
              <Main />
           </Canvas>
          </div>
    </>
    
  );
}

export default App
