import { createContext, useContext, useState} from "react";
import {login as apiLogin, register as apiRegister, getMessages as getApiMessages,
        getMessages as getApiMessages, sendMessage as sendApiMessage, 
 } from "../api/api"

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

    const getMessages = async () => {
        try {
            const messages = await getApiMessages()
            console.log("messagelist", messages)
            return messages;
        } catch (error) {
            console.error("Dina meddelanden kunde inte hämtas från servern:", error);
            throw error;
        }
    };

    const sendMessage = async () => {
        try {
            const messages = await sendApiMessage()
            console.log("messagelist", messages)
            return messages;
        } catch (error) {
            console.error("Dina meddelanden kunde inte hämtas från servern:", error);
            throw error;
        }
    };

    const deleteMessage = async (msg) => {
        const msg = messages.find(m => m.id === id);

        if (!msg) throw new Error("Meddelandet kunde inbte");
        if (msg.userId !== userId) throw new Error("Not authorized");

        messages = messages.filter(m => m.id !== id);

    }
    };

    return (
        <AuthContext.Provider
        value={{
            user,
            login,
            logout,
            register,
            getMessages,
            sendMessage,
            deleteMessage,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
    }

    export function useAuth() {
    return useContext(AuthContext);
    }
