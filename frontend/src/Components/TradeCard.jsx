import React from 'react'

const TradeCard=({trade,onRemove})=>{
    const handleRemove =()=>{
        onRemove(trade.id)
    }
    return(

<>
    <div className="card shadow mt-3 card-custom mb-5 col-sm-12" style={{width:'18rem'}}>
    <div className="card-header"><h5 className='text-center'>{trade.symbol}</h5></div>
   
    <ul className="list-group list-group-flush">
    <li className="list-group-item"><strong>Entry Price:</strong>{trade.entryPrice}</li>
    <li className="list-group-item"><strong>Target:</strong>{trade.target}</li>
    <li className="list-group-item"><strong>Stoploss:</strong>{trade.stoploss}</li>
    <li className="list-group-item"><strong>Quantity:</strong>{trade.quantity}</li>
    <li className="list-group-item"><button onClick={handleRemove}className='btn btn-danger rounded'>Remove</button></li>
    

 
  </ul>
</div>



</>
    )
}

export default TradeCard;