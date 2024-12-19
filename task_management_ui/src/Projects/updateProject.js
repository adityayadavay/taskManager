import { useEffect, useState, useContext } from "react";
import DatePicker from 'react-date-picker';
import { useParams } from "react-router-dom";

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import "./updateProject.css"
import { AuthContext } from "../service/authenticate";
import Navbar from "../navbar";


const UpdateProject = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const { token,logout } = useContext(AuthContext);
    const { id } = useParams();
    const [error, setError] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3001/api/project/${id}`, {
                method: "get",
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                if (response.status === 401) {
                    logout()
                } else {
                    setApiError(true);
                }
            } else {
                const prjData = await response.json();

                setName(prjData[0].name);
                setDescription(prjData[0].description);
                setDate(new Date(prjData[0].completionDate))
            }
        }

        fetchData();
    }, [id]);

    const errorMessage = () => {
        let message = "";
        let isDisplaymessage = false;
        if (error) {
            isDisplaymessage = true
            message = "Please enter all the fields";
        } else if (apiError) {
            isDisplaymessage = true;
            message = "Something Went wrong !!!";
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
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: success ? "" : "none",
                }}
            >
                <h1>{name} updated successfully !!</h1>
            </div>
        );
    };
    const resetMessage = () => {
        setError(false);
        setApiError(false);
        setSuccess(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !date) {
            setError(true);
        } else {
            const obj = { name, description, date, id };
            const response = await fetch(`http://localhost:3001/api/project/update`, {
                method: "put",
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            });
            if (!response.ok) {
                if (response.status === 401) {
                    logout()
                } else {
                    setApiError(true);
                }
            } else {
                setApiError(false);
                setSuccess(true);
            }

        }
    }

    return (
        <div className="form updateProject">
            <Navbar/>
            <div>
                <h1>Update Project</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <div>
                <label className="label">Name</label>
                <input
                    onChange={(e) => { resetMessage(); setName(e.target.value) }}
                    className="input"
                    value={name}
                    type="text"
                />
                </div>

                <div>
                <label className="label desc">Description</label>
                <input
                    onChange={(e) => { resetMessage(); setDescription(e.target.value) }}
                    className="input"
                    value={description}
                    type="text"
                />
                </div>

                <div className="completionDate">
                <label className="label">Completion Date</label>
                <DatePicker onChange={(e) => { resetMessage(); setDate(e); }} value={date} />

                </div>
                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UpdateProject;