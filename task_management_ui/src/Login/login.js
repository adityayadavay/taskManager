import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../service/authenticate";
import { useLocation } from "react-router-dom";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [userCredError, setUserCredError] = useState(false);
    const { isAuthenticated, login, logout, userType } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const logoutAction = location.state ? location.state.action : null;

    useEffect(() => {
        console.log("isAuthenticated,userType = ", isAuthenticated, userType);
        if (isAuthenticated && userType) {
            navigate('/project/list', { replace: true });
        }
    }, [isAuthenticated, userType]);

    useEffect(() => {
        if (logoutAction) {
            logout();
        }

    }, [logoutAction]);
    // Showing error message if error is true
    const errorMessage = () => {
        let message = "";
        let isDisplaymessage = false;
        if (error) {
            isDisplaymessage = true
            message = "Please enter all the fields";
        } else if (apiError) {
            isDisplaymessage = true;
            message = "Something Went wrong !!!";
        } else if (userCredError) {
            isDisplaymessage = true;
            message = "Pleas enter correct email or password";
        }
        return (
            <div
                className="error"
                style={{
                    display: isDisplaymessage ? "" : "none",
                }}
            >
                <h1>{message}</h1>
            </div>
        );
    };
    const resetError = () => {
        setApiError(false);
        setUserCredError(false);
        setError(false);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError(true);
        } else {
            try {
                const obj = { email, password };
                console.log(obj)
                setError(false);
                const response = await fetch("http://localhost:3001/api/user/login", {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(obj)
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        setUserCredError(true);
                    } else {
                        setApiError(true);
                    }
                } else {
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    console.log(data);
                    login(data.token);
                }
            } catch (err) {
                setApiError(true);
            }
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <div className="messages">
                {errorMessage()}
            </div>

            <form>
                <div>
                    <label className="label">Email</label>
                    <input
                        onChange={(e) => { resetError(); setEmail(e.target.value); }}
                        className="input email"
                        value={email}
                        type="email"
                    />
                </div>

                <div>
                <label className="label">Password</label>
                <input
                    onChange={(e) => { resetError(); setPassword(e.target.value) }}
                    className="input"
                    value={password}
                    type="password"
                />
                </div>
                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Login;