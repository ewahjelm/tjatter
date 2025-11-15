import { createContext, useContext, useState, useEffect } from "react";
import { fetchCsrfToken } from "../api/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
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

    // Login och få jwt mha csrf
    const login = async (username, password) => {
        if (!csrfToken) {
        console.error("CSRF-token not loaded yet");
        return false;
        }
        try {
        const data = await fetchJwtToken(username, password, csrfToken);
        console.log("data före decoding i AuthContext: login fetchJwt", data);
        console.log("data.token:", data.token );
        setToken(data.token);
        const decoded = jwtDecode(data.token)
        console.log("decoded token", decoded);
        sessionStorage.setItem("token", data.token )
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
