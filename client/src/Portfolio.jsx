import React from 'react';
import { useEffect, useState } from 'react';
import './Portfolio.css';

function Portfolio() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [trades, setTrades] = useState([])

    async function getUser() {
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
    }
    
    useEffect(() => {
        getUser();
    }, [])


    return (
        <>
            <div className="header">Portfolio Page</div>
            <div className="formscontainer">
            <form className="container" action="/makeTrade/" method="get">
                <div>
                    Add a Stock to a portfolio:
                </div>
                <div>
                    <label>
                        NYSE Stock Ticker Symbol:
                        <input name='tickerAdd' id='tickerAdd' type="text" placeholder="ex: AAPL"/>
                    </label>
                </div>
                <div>
                <label>
                    How many Shares?
                    <input name='sharesAdd' id='sharesAdd' type='number' min={1} max={9999}/>
                </label>
                </div>
                
                <button>Add Stock to Portfolio</button>
            </form>
            <form className="container2" action="/removeTrade/" method="get">
                <div>
                    Remove a Stock from a portfolio:
                </div>
                <div>
                    <label>
                        NYSE Stock Ticker Symbol:
                        <input name="tickerRemove" id="tickerRemove" type="text" placeholder="ex: AAPL"/>
                    </label>
                </div>
                <div>
                <label>
                    How many Shares?
                    <input name='sharesRemove' id='sharesRemove' type="number" min={1} max={9999}/>
                </label>
                </div>
                
                <button>Remove Stock from Portfolio</button>
            </form>
            </div>
            <div className='portfoliocontainer'>
                <h2>Your Portfolio</h2>
                {loading && <div>loading...</div> }
                {user && <div> {user.email} </div> }
                
                {trades && trades.map(trade => (
                    <li key={trade.id}>
                        Ticker: {trade.ticker}, Shares: {trade.shares}
                    </li>
                ))}
            </div>
        </>
    )
}

export default Portfolio