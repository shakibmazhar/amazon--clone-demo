import axios from "axios";

const instance = axios.create({
    // URL of API
    baseURL: "http://localhost:5001/clone-demo-8b9c7/us-central1/api",
});

export default instance;
