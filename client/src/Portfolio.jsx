import './Portfolio.css';


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
            
        </>
    )
}

export default Portfolio