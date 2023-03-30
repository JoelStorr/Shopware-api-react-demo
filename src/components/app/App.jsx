import { useState, useEffect } from 'react'
import reactLogo from './../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from '../nav/Navigation'

import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)


  return (
    <div className="App">

    <Navigation />

    </div>
  )
}

export default App
