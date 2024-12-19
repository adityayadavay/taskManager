import express from "express";
import UserRoutes from "./User/routes.js";
import ProjectRoutes from "./Project/routes.js";
import MemberRoutes from "./Member/routes.js";
// import AuthenticationController from "./services/authentication.js";

const Routes = express.Router();
// const objAuth = new AuthenticationController();

Routes.use('/user', UserRoutes);
Routes.use("/project", ProjectRoutes);
Routes.use("/member", MemberRoutes);
Routes.use("/member", MemberRoutes);
// Routes.get("/verify", MemberRoutes);

export default Routes;