import React from 'react';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import "./HomePage.css"

// Dummy data for demonstration purposes
const totalPerformanceData = { // NEED TO COMPARE DATABASE Info to api info, use Django
  totalValue: 15000,
  todayChange: 500,
  overallChange: 2000,
};

const portfolioData = [ // NEED TO PULL THESE FROM DATABASE, use router to call endpoint in Django
  { symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, value: 5000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 5, value: 3000 },
  // Add more stocks as needed
];

const featuredStocksData = [ //simple api calls
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3500 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 300 },
  // Add more featured stocks as needed
];

const HomePage = () => {
  const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [trades, setTrades] = useState([])
    const [featuredStocks, setFeaturedStocks] = useState([])

    async function getTrades() {
        const res = await fetch('/me/', {
            credentials: "same-origin",
        })
        const body = await res.json();
        setUser(body.user);

        const trade = await fetch('/getTrade/', {
            credentials: "same-origin",
        })
        const tradesResponse = await trade.json();
        const trades = tradesResponse.trades || []
        setTrades(trades)
        setLoading(false)

        //get featured stocks
        const featuredTickers = ['AMZN', 'MSFT']
        const updatedFeaturedStocks = [];
        for (const ticker of featuredTickers){
          const stock = await fetch(`/displayTrade/${ticker}`, {
              credentials: "same-origin",
          })
          const stockResponse = await stock.json();
          const fstock = stockResponse.trade
          const stockObject = {symbol: ticker, price: fstock }
          updatedFeaturedStocks.push(stockObject)
        }
        setFeaturedStocks([...updatedFeaturedStocks]);



    }
    
    useEffect(() => {
        getTrades();
    }, [])


  return (
    <div className='home-page'>
      <h1>User's Stock Portfolio</h1>

      {/* Total Performance Section */}
      <div className='portfoliocontainer'>
        <h2>Total Performance</h2>
        <p className='portContainer'>Total Value: ${totalPerformanceData.totalValue}</p>
        <p className='portContainer'>Today's Change: ${totalPerformanceData.todayChange}</p>
        <p className='portContainer'>Overall Change: ${totalPerformanceData.overallChange}</p>
      </div>

      {/* User Portfolio Section */}
      <div className='portfoliocontainer'>
        <h2>Your Portfolio</h2>
        {trades && trades.map(trade => (
          <div className='portContainer' key={trade.id}>
            Ticker: {trade.ticker}, Shares: {trade.shares}
          </div>
        ))}
      </div>

      {/* Featured Stocks Section */}
      <div className='portfoliocontainer'>
        <h2>Featured Stocks</h2>
        {featuredStocks.map((stock) => (
          <div className="portContainer" key={stock.symbol}>
            ({stock.symbol}): ${stock.price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;