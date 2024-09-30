import React from 'react'
import './TradeWarning.css'
function TradeWarning({navbarDropped}){

return(
    <>
    {navbarDropped==false && (
    <div className="moving-text-container">
        <div className="moving-text">Trading in financial markets involves significant risk of loss.
        Before trading, carefully consider your investment objectives, level of experience, and risk appetite.
        </div>
    </div>
    )}
    </>
)
}
export default TradeWarning;