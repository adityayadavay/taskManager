import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./members.css";
import AddMember from "./addMember";
import { AuthContext } from "../service/authenticate";
import Navbar from "../navbar";

const ManageMember = () => {
    const [members, setMembers] = useState([]);
    const [prjDetails, setProjectDetails] = useState({});
    const [error, setError] = useState(false);
    const [isDisplay, setIsDisplay] = useState(false);
    const { token,logout } = useContext(AuthContext);
    const { id } = useParams();

    useEffect(() => {
        fetchMembersByProjectId();
        fetchProjectById();
    }, [id]);

    async function fetchProjectById() {
        const response = await fetch(`http://localhost:3001/api/project/${id}`, {
            method: "get",
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            if (response.status === 401) {
                logout()
            } else {
                setError(true);
            }
        } else {
            const prjData = await response.json();
            setProjectDetails(prjData[0]);
        }
    }

    async function fetchMembersByProjectId() {
        const response = await fetch(`http://localhost:3001/api/member/list/project/${id}`, {
            method: "get",
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            if (response.status === 401) {
                logout()
            } else {
                setError(true);
            }
        } else {
            const membersData = await response.json();

            setMembers(membersData);
        }
    }

    const errorMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Something went wrong !!</h1>
            </div>
        );
    };

    const displayMembersList = () => {

        return members.map(member => {
            const addMembers = <Link to={"/member/remove/project/" + member.id} className="button memberButton">Remove</Link>;
            return (<tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.emailId}</td>
                <td>{addMembers}</td>
            </tr>
            )
        });

    }
    return (
        <div className="members">
            <Navbar/>
            <div className="header">
                <div className="prjHeader">
                    <span>Project:</span>
                    <span>{prjDetails.name}</span>
                </div>
                <div className="prjHeader">
                    <span>Description:</span>
                    <span>{prjDetails.description}</span>
                </div>
            </div>
            <div className="messages">
                {errorMessage()}
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="custom" colSpan={4}>Members in the project</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayMembersList()}
                </tbody>
            </table>
            <button onClick={() => setIsDisplay(!isDisplay)}>Add Member</button>
            {
                isDisplay ? <AddMember projectId={id} projectName={prjDetails.name} fetchMembersByProjectId={fetchMembersByProjectId} /> : null
            }
        </div>
    )
}

export default ManageMember;