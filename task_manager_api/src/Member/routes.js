import express from "express";
import MemberController from "./memberController.js";
import AuthenticationController from "../services/authentication.js";

const MemberRoutes = express.Router();
const objMember = new MemberController();
const objAuth = new AuthenticationController();

MemberRoutes.get("/list", objAuth.verifyToken, objMember.getAllMembers);
MemberRoutes.get("/list/project/:id", objAuth.verifyToken, objMember.getMembersByProjectId);
MemberRoutes.get("/list/not-in-project/:id", objAuth.verifyToken, objMember.getMembersNotPrtOfProjectId);
MemberRoutes.post("/add/projectId", objAuth.verifyToken, objMember.addMemberToProject);

export default MemberRoutes;