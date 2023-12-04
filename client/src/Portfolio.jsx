import './Portfolio.css';


function Portfolio() {
    return (
        <>
            <div class="header">Portfolio Page</div>
            <form class="container">
                <div>
                    Add a Stock to a portfolio:
                </div>
                <label>
                    NYSE code:
                    <input type="text" placeholder="ex: AAPL"/>
                </label>
                <label>
                    How many Shares?
                    <input type="number" min={1} max={9999}/>
                </label>
                <button>Add Stock to Portfolio</button>
            </form>
        </>
    )
}

export default Portfolio