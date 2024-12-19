import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../service/authenticate";
import Navbar from "../navbar";

import "./projectList.css";

const ProjectList = () => {
    const [projectList, setProjectList] = useState([]);
    const [error, setError] = useState(false);
    const { token, logout, userType, userName, userId, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const url = userType == "1" ? `http://localhost:3001/api/project/list/null` : `http://localhost:3001/api/project/list/${userId}`
        async function fetchData() {
            const response = await fetch(url, {
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
                setProjectList(await response.json());
            }
        }
        if (userType) {
            fetchData();
        }
    }, [userType, isAuthenticated]);

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Something went wrong !!!</h1>
            </div>
        );
    };
    const displayProjectList = () => {

        return projectList.map(project => {

            const formattedTime = moment(project.completionDate).format("DD-MM-YYYY");
            const prjName = <td><Link to={"/project/update/" + project.id}>{project.name}</Link></td>
            const manageMembers = <Link to={"/member/manage/project/" + project.id} className="button manageMembersButtton">Manage Members</Link>
            return (<tr key={project.id}>
                {prjName}
                <td>{project.description}</td>
                <td>{formattedTime}</td>
                {
                    userType == "1" ? <td>{manageMembers}</td> : null
                }
            </tr>
            )
        });

    }
    return (
        <div className="projectList">
            <Navbar />
            <table>
                <thead>
                    <tr>
                        <th className="custom" colSpan={3}>Projects List</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Completion Date</th>
                        {
                            userType == "1" ? <th>Actions</th> : null
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        error ? errorMessage() : displayProjectList()
                    }
                </tbody>
            </table>
            {
                userType == "1" ? <Link to={"/project/create"} className="button createPrjButton">
                    Create Project
                </Link> : null
            }

        </div>
    )
}

export default ProjectList;