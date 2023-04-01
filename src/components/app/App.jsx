import { useState, useEffect } from 'react'
import reactLogo from './../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

import MainHeader from '../Header/Header'

import axios from 'axios'
import Main from '../Main/Main'
import { Canvas } from '@react-three/fiber'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
          <MainHeader />
          <div className='renderBox'>
           <Canvas>
              <Main />
           </Canvas>
          </div>
    </>
    
  );
}

export default App
