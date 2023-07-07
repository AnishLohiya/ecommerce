import axios from "axios";

export const BACKEND = 
    process.env.NODE_ENV === "production"
        ? "https://mern-backend-dav5.onrender.com"
        : "http://localhost:4000";

export const api = axios.create({ withCredentials: true });
