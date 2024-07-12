import axios from "axios";

const instance = axios.create({
    // production
    // baseURL: "https://api.example.com/api/v1",
    // development
    baseURL: `http://localhost:8000/api/v1/`,
    withCredentials: true,

});

export default instance;