import axios from "axios";

let loc = window.location;
// dev server
let url;

if (loc.hostname === "localhost") {
  url = "http://localhost:8000/api/"
} else {
  url = loc.origin + "/api/";
}

const axInstance = axios.create({
  baseURL: url,
});

axInstance.interceptors.request.use(request => {
  let token: any;
  if (window.localStorage) {
      // local storage available
      token = localStorage.getItem('xauthtoken');
  }
  request.headers['xauthtoken'] = token;
  return request;
});

axInstance.interceptors.response.use(
  (response) => response,
  function error(error) {
    if (error.response && error.response.status === 401) {
      window.localStorage.clear();
      window.location.reload();
    }
    console.log("Error received from server: ", error);
    return Promise.reject(error);
  }
);

// interceptor
export default axInstance;
