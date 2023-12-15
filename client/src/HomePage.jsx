import React from 'react';
import { styles } from './styles';
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
        {portfolioData.map((stock) => (
          <div className='portContainer' key={stock.symbol}>
            {stock.name} ({stock.symbol}): {stock.quantity} shares - ${stock.value}
          </div>
        ))}
      </div>

      {/* Featured Stocks Section */}
      <div className='portfoliocontainer'>
        <h2>Featured Stocks</h2>
        {featuredStocksData.map((stock) => (
          <div className="portContainer" key={stock.symbol}>
            {stock.name} ({stock.symbol}): ${stock.price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;