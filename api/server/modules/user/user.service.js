import database from "../../../config/database.config";

let UserService = {};

UserService.getAllUsers = async () => {
  try {
    var query =
      "SELECT p.title, u.name, c.category_name FROM projects p LEFT JOIN users u ON p.uid = u.id LEFT JOIN category c ON p.cid = c.id";
    let user = await database.pool.query(query);
    return user;
  } catch (error) {
    throw error;
  }
};

UserService.getUserByUserId = async (userId) => {
  try {
    let query = "SELECT * FROM `users` WHERE `id` = " + userId;
    let user = await database.pool.query(query);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default UserService;
