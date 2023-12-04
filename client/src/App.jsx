import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import './App.css'
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";


async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

function App() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        document.title = "Stock Portfolio Homepage"
    }, []);


    
    async function getUser() {
        const res = await fetch('/me/', {
            credentials: "same-origin",
        })
        const body = await res.json();
        setUser(body.user);
    }

    return (
        <div>
            <nav className="header-container">
                <div className="links-parent">
                    <Link className="link" to={"/"}>Homepage</Link>
                    <Link className="link" to={"/portfolio"}>Portfolio</Link>
                </div>
                <button className='logout' onClick={logout}>
                    <CiLogout />
                    Logout
                </button>
            </nav>
            <Outlet />
        </div>
    );
}

export default App