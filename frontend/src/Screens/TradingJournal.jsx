import React, { useContext, useState, useEffect } from 'react';
import TradeEntryForm from '../Components/TradeEntryForm';
import TradeLog from '../Components/TradeLog';
import PerformanceAnalytics from '../Components/PerformanceAnalytics';
import Navbar from '../Layouts/Navbar';
import { AuthContext } from '../Contexts/AuthContext';
import LoginForm from '../Components/LoginForm';
import {useNavigate} from 'react-router-dom'

const TradingJournal = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [trades, setTrades] = useState([]);
  const [showTradeEntryForm,setTradeEntryForm]=useState(false);
  
  const navigate=useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginForm(true);
    }
  }, [isAuthenticated]);

  const addTrade = (trade) => {
    setTrades([...trades, trade]);
    setTradeAdded(true);
  
    setTradeEntryForm(false);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
    navigate('/LandingPage')
  };

  const closeTradeForm=()=>{
    
    setTradeEntryForm(false)
    
  }

  return (
    <> <div className='backGroundImage'>
      <Navbar />
      {showLoginForm ? (
        <LoginForm closeLoginForm={closeLoginForm} />
      ) : (
        <> 
        <div className='mt-5'>
       <div className='row justify-cntent-center'>
          <h1 className='text-center  tradingJournalFont col-12 mb-3'>-:Trading Journal:-<div className='curlyText'>Every trade is a lesson; every journal entry is growth.
            </div></h1>
            </div>
        <div className='row justify-content-center ms-2 mt-3 me-2'>
          <div className='mt-4 col-md-11 ms-1 me-1'>
          <TradeLog trades={trades} />
      </div>
      

          
         
          </div>
          
          <PerformanceAnalytics  />
         
          </div>
          {showTradeEntryForm ? (<>
      <TradeEntryForm onAddTrade={addTrade} onClose={closeTradeForm}/>
      </>):(<></>)}
        </>
      )}
      </div>
    </>
  );
};

export default TradingJournal;
