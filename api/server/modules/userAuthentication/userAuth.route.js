import express from "express";

import UserAuthController from "./userAuth.controller";
const router = express.Router();

//Authenticate admin and provide token for login
router.post('/login', (req, res) => {
    return UserAuthController.login(req, res);
});

router.get('/authenticate', (req, res) => {
    return UserAuthController.authenticate(req, res);
});

export default router;