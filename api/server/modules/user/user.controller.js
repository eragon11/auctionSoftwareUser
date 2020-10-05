
import UserService from "../User/user.service";
import logger from "../../../config/logger.config";
import _ from "lodash";
import url from "url";
import settings from '../../../setting';
let config = require('../../../config/' + settings.environment + '.config').default;

const UserController = {};

UserController.getAllUsers = async (req, res, next) => {
    try {

        let userData = await UserService.getAllUsers();
        console.log(userData)
        let users = JSON.parse(JSON.stringify(userData));
        res.status(200).send({
            code: 200,
            status: "sucess",
            data: users
        });
    } catch (error) {
        console.log(error);

        res.status(400).send({
            code: 400,
            status: "error",
            message: "Failed to retrieve"
        });
    }
};

export default UserController;  