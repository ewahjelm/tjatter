import { createContext, useContext, useState, useEffect } from "react";
import { fetchCsrfToken, fetchJwtToken } from "../api/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() =>
        JSON.parse(sessionStorage.getItem("user")) || null);

    const [token, setToken] = useState(sessionStorage.getItem("token") || null);
    const [csrfToken, setCsrfToken] = useState(null);

    // Hämtar CSRF när sidan laddas 
    useEffect(() => {
    async function initAuth() {
        try {
            const csrf = await fetchCsrfToken();
            setCsrfToken(csrf);
        } catch (err) {
            console.error("Fick ingen CSRF:", err);
        } 
    }
        initAuth();
    }, []);

    // Logga in och få jwt mha csrf
    const login = async (username, password) => {
        if (!csrfToken) {
        console.error("CSRF-token not loaded yet");
        return false;
        }
        try {
        const data = await fetchJwtToken(username, password, csrfToken);
        setToken(data.token);
        sessionStorage.setItem("token", data.token);

        const decoded = jwtDecode(data.token);
        setUser(decoded);
        sessionStorage.setItem("user", JSON.stringify(decoded));

        return true;
        } catch (err) {
        console.error("Login misslyckades:", err);
        return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
        value={{
            user,
            token,
            csrfToken,
            login,
            logout,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
    }

    export function useAuth() {
    return useContext(AuthContext);
    }
