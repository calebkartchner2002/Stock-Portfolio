import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import './App.css'

function App() {
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