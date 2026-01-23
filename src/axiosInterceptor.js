import axios from "axios";
import Cookies from "js-cookie";
import BASE_URL from "./constants/BaseUrl";
import { ErrorToast } from "./components/Global/ToasterContainer";

// export const baseUrl = "https://0jxxmx1m-3060.inc1.devtunnels.ms";
// export const baseUrl = "http://192.168.9.54:3060";
export const baseUrl = BASE_URL;
// export const baseUrl = "https://155e-45-199-187-86.ngrok-free.app";

// async function getDeviceFingerprint() {
//   const fp = await FingerprintJS.load();
//   const result = await fp.get();
//   return result.visitorId;
// }

const axiosInterceptor = axios.create({
  baseURL: baseUrl,

  timeout: 10000, // 10 seconds timeout
});

axiosInterceptor.interceptors.request.use(async (request) => {
  const token = Cookies.get("token");
  if (!navigator.onLine) {
    // No internet connection
    ErrorToast(
      "No internet connection. Please check your network and try again.",
    );
    return;
    // return Promise.reject(new Error("No internet connection"));
  }
  //   const fingerprint = await getDeviceFingerprint();
  // Merge existing headers with token
  request.headers = {
    ...request.headers,
    // devicemodel: fingerprint,
    // deviceuniqueid: fingerprint, // Keep existing headers like devicemodel and deviceuniqueid
    Accept: "application/json, text/plain, */*",
    ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization only if token exists
  };

  return request;
});

axiosInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      // Slow internet or request timeout
      ErrorToast("Your internet connection is slow. Please try again.");
    }

    if (error.response && error.response.status === 401) {
      // Unauthorized error
      Cookies.remove("token");
      Cookies.remove("data");
      ErrorToast("Session expired. Please relogin");
      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

export default axiosInterceptor;
