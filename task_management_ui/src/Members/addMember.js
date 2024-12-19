import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../service/authenticate";

const AddMember = (props) => {
    const [members, setMembers] = useState([]);
    const [success, setSuccess] = useState(false);
    const [apiError, setApiError] = useState(false);
    const {token,logout} = useContext(AuthContext);
    const { projectId,projectName,fetchMembersByProjectId } = props;

    useEffect(() => {
        fetchAllMembersByProjectId();
    }, [projectId]);

    async function fetchAllMembersByProjectId() {
        const response = await fetch(`http://localhost:3001/api/member/list/not-in-project/${projectId}`, {
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
            const membersData = await response.json();

            setMembers(membersData);
        }
    }

    const errorMessage = () => {
        let message = "";
        let isDisplaymessage = false;
        if (apiError) {
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
                <h1>Member added successfully !!</h1>
            </div>
        );
    };

    const addMember = async (memberId) => {
        const obj ={projectId,memberId};
        const response = await fetch(`http://localhost:3001/api/member/add/projectId`, {
            method: "post",
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
            setSuccess(true);
            fetchAllMembersByProjectId();
            props.fetchMembersByProjectId();
        } 
    }

    const displayMembersList = () => {
        console.log("members = ",members);
        return members.map(member => {
            const addMembers = <Link onClick={() => addMember(member.id)} className="button memberButton">Add</Link>;
            return (<tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.emailId}</td>
                <td>{addMembers}</td>
            </tr>
            )
        });

    }
    return (
        <div className="form">
            <div>
                <h1>Add Member</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <table>
                <thead>
                    <tr>
                        <th className="custom" colSpan={3}>Members to add in {projectName}</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayMembersList()}
                </tbody>
            </table>
        </div>
    )
}

export default AddMember;