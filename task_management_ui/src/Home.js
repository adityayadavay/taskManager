import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Task Management Portal</h1>
            <Link className="button login" to={`/login`}>
                Login
            </Link>
            <Link className="button signup" to={`/register`}>
                Sign up
            </Link>
        </div>
    )
}

export default Home;