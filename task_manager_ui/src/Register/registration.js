import React, { useState } from "react";
import { USER_TYPE } from "../utils/constants.js";
import "./registration.css"

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>User {name} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Please enter all the fields</h1>
            </div>
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("userType = ", userType);
        if (!name || !email || !password || !userType) {
            setError(true);
        } else {
            // setSubmitted(true);
            const obj = { name, email, password, userType };
            console.log(obj)
            setError(false);
            fetch("http://localhost:3001/api/user/register", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            });
        }
    };
    
    return (
        <div className="form">
            <div>
                <h1>User Registration</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Name</label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    value={name}
                    type="text"
                />

                <label className="label">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    value={email}
                    type="email"
                />

                <label className="label">Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    value={password}
                    type="password"
                />

                <label className="label">User Type</label>
                <select className="select" onChange={(e) => setUserType(e.target.value)}>
                    <option>Please choose one option</option>
                    {USER_TYPE.map((option, index) => {
                        return (
                            <option key={index} value={option.code}>
                                {option.name}
                            </option>
                        );
                    })}
                </select>

                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}
export default Register;