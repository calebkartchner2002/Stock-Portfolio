import React from 'react';
import { styles } from './styles';

// Dummy data for demonstration purposes
const totalPerformanceData = {
  totalValue: 15000,
  todayChange: 500,
  overallChange: 2000,
};

const portfolioData = [
  { symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, value: 5000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 5, value: 3000 },
  // Add more stocks as needed
];

const featuredStocksData = [
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3500 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 300 },
  // Add more featured stocks as needed
];

const pageStyle = {
    // backgroundColor: styles.colors.aquamarine,
    padding: '20px', // Add padding for better visibility of content
  };

// Homepage component
const HomePage = () => {
  return (
    <div style={pageStyle}>
      {/* Title */}
      <h1 style={{ color: styles.colors.cerulean }}>User's Stock Portfolio</h1>

      {/* Total Performance Section */}
      <div>
        <h2>Total Performance</h2>
        <p>Total Value: ${totalPerformanceData.totalValue}</p>
        <p>Today's Change: ${totalPerformanceData.todayChange}</p>
        <p>Overall Change: ${totalPerformanceData.overallChange}</p>
      </div>

      {/* User Portfolio Section */}
      <div>
        <h2>Your Portfolio</h2>
        {portfolioData.map((stock) => (
          <div key={stock.symbol}>
            <p>{stock.name} ({stock.symbol}): {stock.quantity} shares - ${stock.value}</p>
          </div>
        ))}
      </div>

      {/* Featured Stocks Section */}
      <div>
        <h2>Featured Stocks</h2>
        {featuredStocksData.map((stock) => (
          <div key={stock.symbol}>
            <p>{stock.name} ({stock.symbol}): ${stock.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;