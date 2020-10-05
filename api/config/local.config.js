 
import path from "path";

let config = {
  mysql: {
    database_name: "auction",
    host: "127.0.0.1",
    port: "3306",
    username: "root",
    password: "123456"
  },
  logs: {
    path: path.join(__dirname, "../logs"),
    file_name: "local.fiero.logs"
  },
  media: {
    local_file_path: "/home/fiero/",
    s3_file_path: "",
    use_S3: "false"
},
  WEB_ENDPOINT: "http://localhost:4200",
  api_end_point: "http://localhost:8080",
};

export default config;