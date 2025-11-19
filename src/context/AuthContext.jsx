import { createContext, useContext, useState} from "react";
import {login as apiLogin, register as apiRegister } from "../api/api"

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
    );
    
    const register = async (username, password, email, avatar) => {
        try {
            const result = await apiRegister(username, password, email, avatar)
            return result;
        } catch (error) {
            console.error("Registreringen misslyckades:", error);
            throw error;
        }
    };

    // Logga in och få jwt samt tillgång till hela user-objektet
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
            login,
            logout,
            register,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
    }

    export function useAuth() {
    return useContext(AuthContext);
    }
