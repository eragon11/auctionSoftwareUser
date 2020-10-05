
//Service Provider API CodeBase
//ProjectName : ServiveProvider
//Version : 1.0.0

//include all the packages necessary
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

//include the files
import settings from "./setting";
let config = require("./config/" + settings.environment + ".config");
import database from "./config/database.config";
import logger from "./config/logger.config";
import apiRouters from "./router";
import http from "http";


//Logger Configuration
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};

//set the port
const port = settings.port;

const app = express();
const server = http.createServer(app);

database.connectToMysqlDb();

app.use(
  cors('*')
);

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));
app.use(morgan("dev", { stream: logger.stream }));

app.get("/", function (req, res, next) {
  res.sendFile(__dirname + "/index.html");
});

//healthcheck
app.get("/health_check", function (req, res, next) {
  res.sendStatus(200);
});

//include all the necessary routes in the express
app.use('/api', apiRouters);

server.listen(port, () => {
  logger.info(`Server started on port : ${port}`);
});
