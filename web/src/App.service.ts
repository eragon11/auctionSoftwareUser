import axios from "axios";
import axiosInstance from "./config/axios/axios";

const CancelToken = axios.CancelToken;
class AppService {
  source = CancelToken.source();

  async users() {
    try {
      let res = await axiosInstance.get("users", {
        cancelToken: this.source.token,
      });
      console.log(res.data.data);
      
      return res.data.data;
    } catch (e) {
      if (e.message.indexOf("code 400") > -1) {
        return "LINK_EXPIRED";
      } else {
        return "NETWORK_FAILURE";
      }
    }
  }

  cancelRequest() {
    this.source.cancel();
    this.source = CancelToken.source();
  }
}

export default AppService;
