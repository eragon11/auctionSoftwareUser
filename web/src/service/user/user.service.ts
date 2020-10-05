import axios from "axios";

import User from "../../entities/user";
import axiosInstance from "../../config/axios/axios";
import jwtDecode from "jwt-decode";

const CancelToken = axios.CancelToken;
class UserService {
  source = CancelToken.source();
  user!: User;
  token!: string;
  homeUrl!: string;
  loading = false;

  async initialize() {
    this.loading = true;
    this.getUserInfo();
    this.loading = false;
  }
  getUserInfo(): User {
    const t: string = this.token ? this.token : "";
    const ui: any = jwtDecode(t);
    const name = ui.name;
    this.user = new User(ui.id, name);
    // console.log(ui);
    return this.user;
  }
  async authenticateToken() {
    const token = window.localStorage.getItem("xauthtoken");
    if (token === "undefined" || token === "") {
      return false;
    } else if (
      token !== undefined &&
      token !== "undefined" &&
      token !== "" &&
      token !== null
    ) {
      return await this.tokenRequest(token);
    }
  }

  async tokenRequest(token: any) {
    try {
      const res = await axiosInstance.get("authenticate", {
        headers: {
          xauthtoken: token,
        },
        cancelToken: this.source.token,
      });
      if (res.data.code === 200) {
        this.token = token;
        return true;
      } else return false;
    } catch (e) {
      return false;
    }
  }

  async authenticate(user: any): Promise<string> {
    try {
      const res = await axiosInstance.post("login", user, {
        cancelToken: this.source.token,
      });
      const m = res.data.msg;
      const c = res.data.code;
      console.log(res);
      
      if (c === 200) {
        this.token = res.data.user.token;
        window.localStorage.setItem("xauthtoken", this.token);
        return "success";
      } else {
        if (m === "User Not Verified") {
          return "Not_Verified";
        } else {
          return m;
        }
      }
    } catch (e) {
      console.log(e);
      
      return "Invalid_Credentials";
    }
  }
  cancelRequest() {
    this.source.cancel();
    this.source = CancelToken.source();
  }
  async isAuthenticated() {
    return this.authenticateToken();
  }
}

export default UserService;
