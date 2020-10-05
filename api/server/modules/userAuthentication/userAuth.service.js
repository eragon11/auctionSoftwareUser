import jwt from "jsonwebtoken";
import database from "../../../config/database.config";
const JWT_SECRET = "This is Secret";
let UserService = {};

UserService.getJwtToken = async (payload) => {
  payload.token = await jwt.sign(
    {
      data: payload,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return payload;
};

UserService.getUpdatedJwtToken = async (payload, token) => {
  let decodedPayload = jwt.verify(token, JWT_SECRET);
  payload.token = await jwt.sign(
    {
      data: payload,
    },
    JWT_SECRET,
    {
      expiresIn: decodedPayload.exp,
    }
  );
  return payload;
};

UserService.verifyAndDecode = (token) => {
  let decodedPayload = {};
  try {
    decodedPayload = jwt.verify(token, JWT_SECRET);
    if (decodedPayload.exp >= Date.now() / 1000) {
      decodedPayload.valid = true;
    } else {
      decodedPayload.valid = false;
    }
  } catch (error) {
    return (decodedPayload.valid = false);
  }
  return decodedPayload;
};

UserService.getUserByName = async (name) => {
  try {
    let query = 'select * from users where name="' + name + '"';
    let user = await database.pool.query(query);
    return user;
  } catch (error) {
    throw error;
  }
};

UserService.getPayload = function (loggedInUser) {
  let payload = {
    id: loggedInUser.id,
    name: loggedInUser.name,
  };
  return payload;
};


export default UserService;