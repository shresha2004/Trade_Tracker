import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';


import 'bootstrap/dist/css/bootstrap.min.css'; 
const alphavantagekey2=import.meta.env.VITE_ALPHAVANTAGE_KEY2

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const BarChart = ({ data: backEndData }) => {
  const [symbols, setSymbols] = useState([]);
  const [quantityArray, setQuantityArray] = useState([]);
 
  const [currentValue, setCurrentValue] = useState([]);
  const [profitLoss, setProfitLoss] = useState([]);
  const [investmentArray, setInvestmentArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const symbolArray = backEndData.map(entry => entry.symbol);
        const investment = backEndData.map(entry => entry.investment);
        const Quantity = backEndData.map(entry => entry.quantity);

        setSymbols(symbolArray);
        setInvestmentArray(investment);
        setQuantityArray(Quantity);

        const currentValuesArray = await Promise.all(
         
          symbolArray.map(async (s, i) => {
            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${s}&outputsize=full&apikey=${alphavantagekey2}`;
            try {
              const response = await axios.get(url);
              const data = response.data['Time Series (Daily)'];
              if (data && Object.keys(data).length > 0) {
                const latestDate = Object.keys(data)[0];
                const currentValue = parseFloat(data[latestDate]["4. close"]) * Quantity[i];
                return currentValue;
              } else {
                console.error(`No data found for symbol: ${s}`);
                return 0;
              }
            } catch (error) {
              console.error("Error in fetching data:", s, error);
              return 0;
            }
          })
        );

        const PLCalculator = currentValuesArray.map((v, x) => v - investment[x]);

        setCurrentValue(currentValuesArray);
        setProfitLoss(PLCalculator);

      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };
    fetchData();
  }, [backEndData]);

  const data = {
    labels: symbols,
    datasets: [
      {
        label: 'Profit/Loss',
        data: profitLoss,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        

        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels:{
          font:{
            size:18,
          }
        }
      },
      title: {
        display: true,
        text: 'Profit/Loss Data',
        font:{
          size:24
        }
      },
    },
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10 barcss">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
