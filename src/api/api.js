import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: "https://chatify-api.up.railway.app",
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // om servern sätter cookies
});

// Interceptor – JWT skickas alltid om den finns
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

let cachedCsrf = null;

// Hämta CSRF-token
async function getCsrf() {
    if (!cachedCsrf) {
    const { data } = await api.patch("/csrf");
    cachedCsrf = data.csrfToken;
    }
    return cachedCsrf;
}

// Registera ny användare
export async function register(username, password, email, avatar) {
    const csrf = await getCsrf();

    try {
        const res = await api.post("/auth/register", {
        username,
        password,
        email,
        avatar,
        csrfToken: csrf,
        });

        console.log("Register response:", res);
        return { status: res.status, data: res.data };

    } catch (err) {
        console.log("Register error:", err.response || err);
        if (err.response) {
        return { status: err.response.status, data: err.response.data };
        }
        return { status: 500, data: null }
    }
}

// Få jwt med inloggning + csrf
export async function login(username, password) {
    const csrf = await getCsrf();
    const { data } = await api.post("/auth/token", {
    username,
    password,
    csrfToken: csrf,
    });

    const decoded = jwtDecode(data.token)
    // console.log("jwt", data);
    return {
        token: data.token,
        user: decoded
    };
    
}