import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"

function App() {
    return (
        <div>
            <nav>
                <Link to={"/"}>Homepage</Link>
                <Link to={"/portfolio"}>Portfolio</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default App