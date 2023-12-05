import './Portfolio.css';

const portfolioData = [
    { symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, value: 5000 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 5, value: 3000 },
    // Add more stocks as needed
  ];


function Portfolio() {
    return (
        <>
            <div className="header">Portfolio Page</div>
            <div className="formscontainer">
            <form className="container">
                <div>
                    Add a Stock to a portfolio:
                </div>
                <div>
                    <label>
                        NYSE Stock Ticker Symbol:
                        <input type="text" placeholder="ex: AAPL"/>
                    </label>
                </div>
                <div>
                <label>
                    How many Shares?
                    <input type="number" min={1} max={9999}/>
                </label>
                </div>
                
                <button>Add Stock to Portfolio</button>
            </form>
            <form className="container2">
                <div>
                    Remove a Stock from a portfolio:
                </div>
                <div>
                    <label>
                        NYSE Stock Ticker Symbol:
                        <input type="text" placeholder="ex: AAPL"/>
                    </label>
                </div>
                <div>
                <label>
                    How many Shares?
                    <input type="number" min={1} max={9999}/>
                </label>
                </div>
                
                <button>Remove Stock from Portfolio</button>
            </form>
            </div>
            <div className='portfoliocontainer'>
                <h2>Your Portfolio</h2>
                {portfolioData.map((stock) => (
                <div key={stock.symbol}>
                    <p>{stock.name} ({stock.symbol}): {stock.quantity} shares - ${stock.value}</p>
                </div>
                ))}
            </div>
        </>
    )
}

export default Portfolio