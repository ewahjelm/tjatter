import { createContext, useContext, useState} from "react";
import {login as apiLogin } from "../api/api"

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
    );
    
    // Logga in och få jwt sam tillgång till hela user-objektet
    const login = async (username, password) => {
        try {
        const { user, token } = await apiLogin(username, password)
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        setUser(user);

        } catch (error) {
        console.error("Login misslyckades:", error);
        throw error;
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
            // token,
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
