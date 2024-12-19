import { useContext, useState } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { AuthContext } from "../service/authenticate";
import Navbar from "../navbar";


const CreateProject = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const { token,logout } = useContext(AuthContext);

    console.log("tokec = ", token);

    const [error, setError] = useState(false);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !date) {
            setError(true);
        } else {
            const obj = { name, description, date };
            const response  = await fetch('http://localhost:3001/api/project/create', {
                method: "post",
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            });
            if(!response.ok) {
                if (response.status === 401) {
                    logout()
                } else {
                    setError(true);
                }
            } else {

            }
        }
    }
    return (
        <div className="form">
            <Navbar/>
            <div>
                <h1>Create Project</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
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

                <label className="label">Description</label>
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    className="input"
                    value={description}
                    type="text"
                />

                <label className="label">Completion Date</label>
                <DatePicker onChange={setDate} value={date} />

                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateProject;