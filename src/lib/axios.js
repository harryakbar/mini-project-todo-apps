import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use((config) => {
    const token = cookies.get("TodoApp_userToken");

    // assusming backend use Bearer token
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    } else {
        console.error("auth token empty!");
    }

    return config;
});

export default instance;
