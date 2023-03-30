import { useState, useEffect } from 'react'
import reactLogo from './../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

import MainHeader from '../Header/Header'

import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)


  return (
    <div className="App">

      <MainHeader />

    </div>
  )
}

export default App
