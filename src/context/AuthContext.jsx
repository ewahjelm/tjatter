import { createContext, useContext, useState} from "react";
import {
    login as apiLogin, 
    register as apiRegister, 
    getMessages as getApiMessages,
    sendMessage as sendApiMessage, 
    deleteMessage as deleteApiMessage, 
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
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    };

    const getMessages = async () => {
        try {
            return await getApiMessages()
        } catch (error) {
            console.error("Kunde inte hämta meddelanden:", error);
            throw error;    
        }
    };

    const sendMessage = async (cleanInput) => {
        try {
            return await sendApiMessage(cleanInput)
        } catch (error) {
            console.error("Kunde inte skicka meddelanden:", error);
            throw error;
        }
    };
   const deleteMessage = async (id) => {
    try {
      return await deleteApiMessage(id)
    } catch (error) {
      console.error('Kunde inte ta bort meddelande:', error)
      throw error
    }
  }


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
