import axios from "axios";

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

// Hämta CSRF-token
export async function fetchCsrfToken() {
  const { data } = await api.patch("/csrf", {});
  console.log("csrf", data); //test
  return data.csrfToken;
}

// Få jwt med inloggning + csrf
export async function fetchJwtToken(username, password, csrfToken) {
  const { data } = await api.post("/auth/token", {
    username,
    password,
    csrfToken,
  });
  console.log("jwt", data);
  return data; // jwt    { token: "..." }
}

export default api;