import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import './App.css'
import { useState } from "react";


function App() {
    const [user, setUser] = useState(null);
    
    
    async function getUser() {
        const res = await fetch('/me/', {
            credentials: "same-origin",
        })
        const body = await res.json();
        setUser(body.user);
    }

    return (
        <div>
            <nav>
                <Link className="link" to={"/"}>Homepage</Link>
                <Link className="link" to={"/portfolio"}>Portfolio</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default App