import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FlashMessage from '../Components/FlashMessage';
import BarChart from '../Components/BarChart';
import Navbar from '../Layouts/Navbar';
import { AuthContext } from '../Contexts/AuthContext';
import LoginForm from '../Components/LoginForm';
import {useNavigate} from 'react-router-dom';
import {Container,Row,Col} from 'react-bootstrap';
import TradeCard from '../Components/TradeCard';
import Footer from '../Layouts/Footer'
const alphavantagekey1=import.meta.env.VITE_ALPHAVANTAGE_KEY1

function ProfitLoss() {
   
    const [symbol, setSymbol] = useState("");
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState(null);
    const [flashMessage, setFlashMessage] = useState(null);
    const [backEndData, setbackEndData] = useState([]);
    const [entryPrice, setEntryPrice] = useState("");
    const [stopLoss, setStopLoss] = useState("");
    const [target, setTarget] = useState("");
    const [quantity, setQuantity] = useState("");
    const [showInputs, setShowInputs] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isLoading,setLoading]=useState(false)
    const { isAuthenticated } = useContext(AuthContext);
    const [tradingView,setTradingView]=useState("")
    const navigate=useNavigate()
   

    useEffect(() => {
        
            if (!isAuthenticated) {
                setShowLoginForm(true);
            }
            else{
                 fetchData();
           
        };
    },[isAuthenticated]
) 

       
    

    const fetchData = async () => {
        setLoading(true)
        const email= localStorage.getItem('Email')
        try {

            const result = await axios.get("http://localhost:4501/stocks",{headers:{
                'email':email
            }},{ withCredentials: true });

           
            setbackEndData(result.data);
           
        } catch (error) {
            console.error("Error in fetching data", error);
        }
        setLoading(false)
    }
    function handleInput(event) {
        let value = event.target.value.toUpperCase();
        
        setTradingView(value)
        setSymbol(value + ".BSE");
        setError(null);

        if (value === "") {
            setStockData(null);
            setFlashMessage(null);
            setShowInputs(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email=localStorage.getItem('Email')
        try {
            

            const response = await axios.post("http://localhost:4501/", { symbol, entryPrice, stopLoss, target, quantity,email },{ withCredentials: true });

            setFlashMessage("Added successfully");
            setShowInputs(false);
            setbackEndData(prevData=>[...prevData,response.data])
            fetchData();
        } catch (err) {
            console.error("Error in sending data to backend", err);
            setFlashMessage("Stock already present");
        }
    }
    
    async function handleSearch() {
        
        setLoading(true);
        setStockData(null)
        setError(null)
        setFlashMessage(null)

        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${alphavantagekey1}`;
        try {
            const response = await axios.get(url);
            const data = response.data['Time Series (Daily)'];
            setStockData(data);
            if (!data) {
                setError("Incorrect symbol");
                setFlashMessage("Incorrect symbol");
            }
        } catch (error) {
            console.error("Error in fetching data:", error);
            setError("Incorrect Stock Symbol");
            setStockData(null);
            setFlashMessage("Incorrect Stock symbol");
            return null;
        }finally{
            setLoading(false)
        }
    }

    const closeLoginForm = () => {
        setShowLoginForm(false);
        navigate('/LandingPage')
    }

    const removeTrade= async(id)=>{
        try{
           

        await axios.delete(`http://localhost:4501/stocks/${id}`,id,{ withCredentials: true })

      
        fetchData()
        }catch(err){
            console.error('Error in deleting trade:',trade)
        }
    }

    return (
        <div> <div className='portfolioImage'>
            <Navbar />
            {showLoginForm ? (
                <LoginForm closeLoginForm={closeLoginForm} />
               
            ) : (
                <div>
                    <div className='mt-5 '>
                        <div className='row justify-content-center'>
                              <div className='col-md-8 '>
                               <div className="col-sm-12 mb-2 me-2 d">

                                <div className='ms-2'>
                     <BarChart data={backEndData}/>
                     </div>
                     </div>
                     </div>
                         <div className='col-md-4  '>
                            <div className='col-sm-12 ms-3 me-3 '>
                        <div className="input-group mb-3">
                        <span className='input-group-text'>
                        <i className="bi bi-search"></i>
                        <div>....</div>
                        </span>
                         <input onChange={handleInput} type="text" className="form-control" placeholder="Enter Stock Symbol" aria-label="Stock symbol" aria-describedby="button-addon2"/>
                        
                        </div>
                        <div className='d-grid'>
                        <button onClick={handleSearch} className="btn btn-success mb-3 nav-bar-background" type="button" id="button-addon2">Search</button>
                        </div>
                        {isLoading ? (<>
                        <div className='position-relative'>
                        <div className="position-absolute top-50 start-50 translate-middle mt-3">
                            <div className="spinner-border text-success align-item-center" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </div>
                                </div>
                                </div></>):(<></>)}

                    <FlashMessage message={flashMessage} duration={3000} onClose={() => setFlashMessage(null)} />
    
               
                    {stockData && (
                        <div>
                            <div className="card" style={{width: "18rem"}}>
                                    <strong className="card-header text-center">
                                    Symbol: {symbol}
                                    </strong>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item ">Price: {stockData[Object.keys(stockData)[0]]["4. close"]}</li>
                                        <li className="list-group-item ">Day High: {stockData[Object.keys(stockData)[0]]["2. high"]}</li>
                                        <li className="list-group-item ">Day Low: {stockData[Object.keys(stockData)[0]]["3. low"]}</li>
                                        <li className="list-group-item ">Volume: {stockData[Object.keys(stockData)[0]]["5. volume"]}</li>
                                        <li className="list-group-item"><button className='btn btn-success me-5 mb-2' onClick={() => setShowInputs(!showInputs)}>
                                                 {showInputs ? "Cancel" : "Add to Portfolio"} </button>
                                                 <a href={`https://in.tradingview.com/chart/c96O1lOu/?symbol=${tradingView}`} 
                                                 className='btn btn-success justify-content-end'
                                                 target='_blank'
                                                 rel='noopener noreferrer'>View Chart</a>
                                                 </li>
                                   
                         
                            {showInputs && (
                                <form onSubmit={handleSubmit} id='tradeForm'>
                                    <div className="list-group-item d-flex align-items-center " >
                                        <label htmlFor='entryPrice' className='form-label me-2' >Entry Price : </label>
                                        <div className='col-sm-4'>
                                        <div className='input-group'>
                                        <input 
                                            type="number"
                                            className='form-control'
                                            value={entryPrice}
                                            placeholder='Entry Price'
                                            onChange={(e) => setEntryPrice(e.target.value)}
                                            required
                                            id='entryPrice'
                                        />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item d-flex align-items-center">
                                        <label htmlFor='stoploss' className='form-label me-2'>Stop Loss : </label>
                                    <div className='col-sm-4'>
                                        <div className='input-group'>

                                        <input
                                            type="number"
                                            value={stopLoss}
                                            onChange={(e) => setStopLoss(e.target.value)}
                                            required
                                            className='form-control'
                                            id='stoploss'
                                            placeholder='Stoploss'
                                        />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item d-flex align-item-center">
                                        <label htmlFor='target' className='form-label me-2 '>Target: </label>
                                        <div className='col-sm-4'>
                                            <div className='input-group'>
                                        <input
                                            type="number"
                                            value={target}
                                            onChange={(e) => setTarget(e.target.value)}
                                            required
                                            id='target'
                                            placeholder='Target'
                                            className='form-control'
                                        />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item d-flex align-item-center"> 
                                        <label htmlFor='quantity' className='form-label me-2'>Quantity: </label>
                                        <div className='col-sm-4'>
                                        <div className='input-group'>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            required
                                            id='quantity'
                                            className='form-control'
                                            placeholder='Quantity'
                                        />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item d-grid"><button type="submit" className='btn btn-success' >Submit</button></div>
                                    
                                </form>
                            )}
                            </ul>
                            </div>
                            
                        </div>
                    )}
                    </div>
                    </div>
                     </div>
                     </div>
                </div>
            )}
            <Container>
                <Row>
                    {backEndData.map((trade,index)=>( 
                    <Col key={index} md={4} sm={12} xs={12} className='mb-4'>
                        <TradeCard trade={trade} onRemove={removeTrade}/>
                        </Col>))}
                </Row>
                
            </Container>
            <Footer/>
            </div>
           
        </div>
    );
}

export default ProfitLoss;
