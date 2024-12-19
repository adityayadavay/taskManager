import express from "express";
import ProjectConroller from "./projectController.js";
import AuthenticationController from "../services/authentication.js";

const ProjectRoutes = express.Router();
const objProject = new ProjectConroller();
const objAuth = new AuthenticationController();

ProjectRoutes.post("/create", objAuth.verifyToken, objProject.addProject);
ProjectRoutes.put("/update", objAuth.verifyToken, objProject.updateProject);
ProjectRoutes.get("/list/:userId", objAuth.verifyToken, objProject.getAllProjects);
ProjectRoutes.get("/:id", objAuth.verifyToken, objProject.getProjectById);

export default ProjectRoutes;