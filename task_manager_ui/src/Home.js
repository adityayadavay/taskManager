import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Task Management Portal</h1>
            <Link to={`/login`}>
                Login
            </Link>
            <Link to={`/register`}>
                Sign up
            </Link>
        </div>
    )
}

export default Home;