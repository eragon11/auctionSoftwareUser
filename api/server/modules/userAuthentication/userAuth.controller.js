import UserService from "./userAuth.service";
import us from "../user/user.service";
import utils from "../../../config/utils";

const UserAuthController = {};

UserAuthController.login = async (req, res) => {
  try {
    let name = req.body.name;
    let password = req.body.password;
    let user = await UserService.getUserByName(name);
    let loggedInUser = user[0];
    console.log(loggedInUser);
    if (loggedInUser) {
      if (loggedInUser.password === utils.md5(utils.md5(name + utils.md5(password)))) {
        let payload = UserService.getPayload(loggedInUser);
        let logInData = await UserService.getJwtToken(payload);
        res.setHeader("xauthtoken", logInData.token);
        res.status(200).send({
          code: 200,
          status: "success",
          user: logInData,
        });
      } else throw new Error("Password Mismatch");
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      code: 400,
      status: "error",
      message: "Authentication Failure",
    });
  }
};

UserAuthController.verify = async (req, res, next) => {
  console.log("verify");
  let tokenSignature = req.headers["xauthtoken"];
  if (tokenSignature != undefined) {
    let token = await UserService.verifyAndDecode(tokenSignature);
    req.userToken = token;
    if (token.valid) {
      let user = await us.getUserByUserId(token.data.id);
      let loggedInUser = user[0];
      let payload = UserService.getPayload(loggedInUser);
      let logInData = await UserService.getUpdatedJwtToken(
        payload,
        tokenSignature
      );
      req.userToken.data = logInData;
      res.setHeader("xauthtoken", logInData.token);
      return next();
    } else {
      res.status(401).send({
        status: "error",
        code: 401,
        message: "Token Invalid",
      });
    }
  } else {
    res.status(401).send({
      status: "error",
      code: 401,
      message: "Authentication Failure",
    });
  }
};

UserAuthController.authenticate = async (req, res) => {
  try {
    let tokenSignature = req.headers["xauthtoken"];
    console.log(tokenSignature);
    if (tokenSignature != undefined) {
      let token = await UserService.verifyAndDecode(tokenSignature);
      if (token.valid) {
        res.status(200).send({
          code: 200,
          status: "success",
          user: token.valid,
        });
      } else {
        res.status(400).send({
          code: 400,
          status: "failure",
          user: token.valid,
        });
      }
    }
  } catch (error) {
    res.status(401).send({
      status: "error",
      code: 401,
      message: "Authentication Failure",
    });
  }
};

export default UserAuthController;
