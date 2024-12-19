import express from "express";
import UserController from "./userController.js";

const UserRoutes = express.Router();
const objUser = new UserController();

UserRoutes.post("/register", objUser.addUser);
UserRoutes.post("/login", objUser.login);

export default UserRoutes;