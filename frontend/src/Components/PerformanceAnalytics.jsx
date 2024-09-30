import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import Footer from '../Layouts/Footer';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const PerformanceAnalytics = () => {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [instrument, setInstrument] = useState([]);
    const [NetprofLoss, setNetProfLoss] = useState([]);
    const [tradeProfit,setTradeProfit]=useState([]);


    const fetchData = async () => {
        try {

            const response = await axios.get('https://trade-tracker-slgz.onrender.com/TradeEntryForm',{withCredentials:true});

            const fetchedTrades = Array.isArray(response.data) ? response.data : [response.data];
            setTrades(fetchedTrades);
            setLoading(false);

            const instruments = [];
            const profLossData = [];
            const tradeProf=[]

            fetchedTrades.forEach((trade,i) => {
                instruments.push(trade.instrument);
                const pl = (trade.exitPrice - trade.entryPrice) * trade.quantity;
                profLossData.push(pl);
                tradeProf.push(pl);

                
            });
                

            for(var i=0;i<profLossData.length;i++){
               
                if(i>0){
                    var value=profLossData[i-1]+profLossData[i]
                    profLossData[i]=value

                }
            }
            
            setInstrument(instruments);
            setNetProfLoss(profLossData);
            setTradeProfit(tradeProf)

        } catch (er) {
            console.error(er);
            setError(er);
            setLoading(false);
        }
    };

    useEffect(() => {
       
        fetchData();
    }, []);
    
    if (loading) {
        return <div> <div className='position-relative'>
        <div className="position-absolute top-50 start-50 translate-middle mt-3">
            <div className="spinner-border text-success align-item-center" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
                </div>
                </div></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const validTrades = trades.filter(trade => trade && trade.exitPrice !== null && trade.entryPrice !== null && trade.quantity !== null);

    const totalPL = validTrades.reduce((acc, trade) => acc + (trade.exitPrice - trade.entryPrice) * trade.quantity, 0);
    const winTrades = validTrades.filter(trade => (trade.exitPrice - trade.entryPrice) * trade.quantity > 0).length;
    const lossTrades = validTrades.filter(trade => (trade.exitPrice - trade.entryPrice) * trade.quantity <= 0).length;
    const winRate = validTrades.length > 0 ? (winTrades / validTrades.length) * 100 : 0;

    const data = {
        labels: instrument,
        datasets: [
            {
                type: 'bar',
                label: 'Profit/Loss of Instrument',
                data: tradeProfit,
                borderColor: 'rgb(255,99,132)',
                backgroundColor: 'rgba(255,99,132,0.5)',
            },
            {
                type: 'line',
                label: 'Overall Profit/Loss',
                data: NetprofLoss,
                fill: false,
                borderColor: 'rgb(54,162,235)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Performance Analytics',
                font:{
                    size:24
                }
            },
        },
    };

    return (<>        <div className='container '>
        <div className='mt-5 mb-3 row justify-content-center'>
             <div className=' col-lg-9 col-md-12 custom-analytics rounded card'>
                <div className='w-100 h-100 mb-3 ' >
                <Bar data={data} options={options} />
                </div>
            </div>
          
            <div className='col-lg-3 col-md-12   d-flex align-items-center'>
                
                <div className='card w-100'  >
                    <strong className="card-header text-center">Trade Analysis Report</strong>
                
                <ul className="list-group list-group-flush custom-analytics">
                    <li className="list-group-item"><strong>Total P&L:</strong>${totalPL.toFixed(2)}</li>
                    <li className="list-group-item"><strong>win Rate:</strong> {winRate.toFixed(2)}</li>
                    <li className="list-group-item"><strong>Winning Trades:</strong> {winTrades}</li>
                    <li className="list-group-item"><strong>Losing Trades:</strong> {lossTrades}</li>

                </ul>
                </div>
            
           
           </div>
           
        </div>
        </div>
        <div>
                <Footer/>
            </div>
        </>

    );
};

export default PerformanceAnalytics;
