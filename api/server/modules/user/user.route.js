import express from "express";
import userController from "./user.controller";
import userAuthController from "../userAuthentication/userAuth.controller";
const router = express.Router();

//Get all users
router.get("/users", userAuthController.verify, userController.getAllUsers);

export default router;
