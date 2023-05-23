import axios from "axios";
import store from "@/store";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${store.state.token}`;
  return config;
});

export default instance;
