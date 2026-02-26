import axios from "axios";

const API_BASE = import.meta.env.VITE_APP_API_BASE;

const API = axios.create({ baseURL: `${API_BASE}/api/users` });

API.interceptors.request.use((req) => {
    const profile = localStorage.getItem("profile");
    if (profile) {
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }
    return req;
});

export const signIn = (formData) => API.post("/login", formData);
export const signUp = (formData) => API.post("/signup", formData);