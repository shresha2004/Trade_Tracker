import React,{useState,useEffect} from 'react';
import axios from 'axios';
import TradeEntryForm from '../Components/TradeEntryForm';


 const TradeLog = ()=>{
   const [trades,setTrades]=useState([]);
   const [fullView,setFullView]=useState(false)
   const [Url,setUrl]=useState("")
   const [showTradeEntryForm,setTradeEntryForm]=useState(false)
  



   useEffect(()=>{
   
    fetchData()
   },[])
   const fetchData=async()=>{
    const email=localStorage.getItem("Email")
    try{

        const response =await axios.get("http://localhost:4501/TradeEntryForm",{headers:{
          email:email
        }},{withCredentials:true});

        setTrades(Array.isArray(response.data) ? response.data : [response.data]);
    }catch(err){
        console.error(err);
    };

}

const imageView=(url)=>{
    setFullView(true)
    setUrl(url)
 }

 const closeFullView=()=>{
    setFullView(false)
    setUrl(null)
 }
   const remove=async(id)=>{
    

    const response=await axios.delete(`http://localhost:4501/TradeEntryForm/${id}`,id)
    
    fetchData()
   }

   const handleTradeForm=(e)=>{
    e.preventDefault()
   setTradeEntryForm(true) 
   
  }
  const closeTradeForm=()=>{
    setTradeEntryForm(false)
  }
  const addTrade = (trade) => {
    setTrades([...trades, trade]);
    setTradeEntryForm(false)
  };


    return(<>

          <div className='d-block d-md-none mb-3'>
                          <button className='btn btn-success' onClick={handleTradeForm}>Add Trade</button>
                      </div>

    <div className='table-responsive rounded custom-analytics'>
        <table className='table table-bordered'>
            <thead >
                <tr className='table-primary'  >
                    <th scope='col'>Date</th>
                    <th scope='col'>Type</th>
                    <th scope='col'>Instrument</th>
                    <th scope='col'>Trade Type</th>
                    <th scope='col'>Entry Price</th>
                    <th scope='col'>Exit Price</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>P&L</th>
                    <th scope='col'>Before Entry</th>
                    <th scope='col'>After Exit</th>
                    <th scope='col'><button  className='btn btn-success' onClick={handleTradeForm}>Add Trade</button>
                    </th>
                    
                </tr>
            </thead>
            <tbody >
                {trades.map((trade,index)=>(
                    <tr key={index}>
                        <td className='hover-area' >{trade.date} <div className='hover-content card'>Note:{trade.notes}.<div>Strategy:{trade.strategy}</div></div></td>
                        <td >{trade.type}</td>
                        <td >{trade.instrument}</td>
                        <td >{trade.tradeType}</td>
                        <td >{trade.entryPrice}</td>
                        <td >{trade.exitPrice}</td>
                        <td >{trade.quantity}</td>
                        <td>{ 
                        ((trade.exitPrice - trade.entryPrice) * trade.quantity).toFixed(2)}</td>
                        <td>{trade.beforeScreenshotUrl ?
                        <button onClick={()=>{imageView(trade.beforeScreenshotUrl)}}> <img src={trade.beforeScreenshotUrl} alt="Before Screenshot" width="100" /> </button>
                        : null}
                        </td>
            <td>{trade.afterScreenshotUrl ? ( <button onClick={()=>{imageView(trade.afterScreenshotUrl)}}>
             <img src={trade.afterScreenshotUrl} alt="After Screenshot" width="100" />
             </button>) : null}</td>
                            <td><button className='btn btn-danger' onClick={()=>{remove(trade._id)}}>Remove</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        {fullView?(<>
        <div style={ContainerStyle} className='d-flex align-items-center justify-content-center'>
          <div style={imageContainerStyle}>

        <button type="button" className="btn-close" style={closeButtonStyle} aria-label="Close" onClick={closeFullView}></button>
            <img src={Url} alt="Image"  style={formStyle} />
            </div>
        </div>
        </>):(<></>)}

        {showTradeEntryForm ? (<>
      <TradeEntryForm onAddTrade={addTrade} onClose={closeTradeForm}/>
      </>):(<></>)}


        </>
    )
 }
 export default TradeLog;

 

 const ContainerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    zIndex:1000
  };
const imageContainerStyle={
    position:'relative',
    display: 'inline-block'
}

  const formStyle = {
    width: '1100px',
    height:'600px',
    textAlign: 'center',
    borderRadius: '10px',
  };

  const closeButtonStyle={
    position:'absolute',
    top:'10px',
    right:'10px',
    backgroundColor:'white',
    borderRadius:'50%',
    padding:'5px',

    zIndex:1001
  }
