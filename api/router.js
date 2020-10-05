import express from "express";
import userRouter from './server/modules/user/user.route';
import userAuthRouter from './server/modules/userAuthentication/userAuth.route';

let router = express.Router();
router.use('/',userRouter);
router.use('/',userAuthRouter);

export default router;