import React from "react";
import { Route,Routes } from "react-router-dom";
import ProjectList from "./projectList";
import CreateProject from "./createProject";
import UpdateProject from "./updateProject";

const ProjectContainer = () => {
    return (
        <Routes>
            <Route path="list" element={<ProjectList />}/>
            <Route path="create" element={<CreateProject/>}/>
            <Route path="update/:id" element={<UpdateProject/>}/>
        </Routes>
    )
}

export default ProjectContainer;


