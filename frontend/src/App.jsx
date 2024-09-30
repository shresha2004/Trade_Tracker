import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import LandingPage from './Screens/LandingPage'
import ProfitLoss from './Screens/ProfitLoss'
import TradingJournal from './Screens/TradingJournal'

import { AuthProvider } from './Contexts/AuthContext'
import HeroPage from './Screens/HeroPage'



function App() {
  const [count, setCount] = useState(0)
 
  return (
   <AuthProvider>
    <BrowserRouter>
     <Routes>
      <Route path="/"  element={<HeroPage/>}></Route>
      <Route path="/LandingPage" element={<LandingPage/>}></Route>
      <Route path="/ProfitLoss" element={<ProfitLoss/>}></Route>
      <Route path="/TradingJournal" element={<TradingJournal/>}></Route>
      
       
     </Routes>
    </BrowserRouter>
    </AuthProvider> 
  )
}

export default App
