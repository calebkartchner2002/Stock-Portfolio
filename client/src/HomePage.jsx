import React from 'react';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import "./HomePage.css"

const HomePage = () => {
  const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [trades, setTrades] = useState([])
    const [featuredStocks, setFeaturedStocks] = useState([])
    const [totalMoney, setTotalMoney] = useState(0)
    const [pastMoney, setPastMoney] = useState(0)

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
        const featuredTickers = ['GOOGL', 'NFLX',]
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

        //get total money
        let money = 0
        const totalTickers = []
        let pastMoney = 0
        trades.map(trade => {
          totalTickers.push(trade)
          pastMoney += (trade.priceWhenBought * trade.shares)
        })
        for (const tick of totalTickers){
          const stock = await fetch(`/displayTrade/${tick.ticker}`, {
              credentials: "same-origin",
          })
          const stockResponse = await stock.json();
          const fstock = stockResponse.trade
          money += (fstock * tick.shares)
        }
        setTotalMoney(money)
        setPastMoney(pastMoney)
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
        <p className='portContainer'>Total Value: ${totalMoney.toFixed(2)}</p>
        <p className='portContainer'>Overall Change: ${(totalMoney - pastMoney).toFixed(2)}</p>
      </div>

      {/* User Portfolio Section NEEDS TO BE FIXED */}
      <div className='portfoliocontainer'>
        <h2>Your Portfolio</h2>
        {trades && trades.map(trade => (
          <div className='portContainer' key={trade.id}>
            Ticker: {trade.ticker}, Shares: {trade.shares} Money in Stock: ${trade.priceWhenBought * trade.shares}
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