import axios from "axios";
import Cookies from "universal-cookie";
import Router from "next/router";
import { baseUrl } from "../utils/baseUrl";

const cookies = new Cookies();

const instance = axios.create({
    baseURL: baseUrl,
});

instance.interceptors.request.use((config) => {
    const token = cookies.get("TodoApp_userToken");

    // assuming backend use Bearer token
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    } else {
        // token expired or user not logged in
        Router.push("/auth/login");
    }

    return config;
});

export default instance;
