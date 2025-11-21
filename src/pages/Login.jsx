import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";


export default function Login () {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleLogin({ username, password }) {
        setError(null);
        if (!username || !password) {
            setError("Fyll i både användarnam och lösenord.");
            return;
        }
        try {
            await login(username, password);
            navigate("/chat")
        } catch (err) {
            setError("Fel användarnamn eller lösenord.")
        }
    }

    return (
    <div className="form-container">
        <h2>Välkommen till chat-appen</h2>
        <h1>Tjatter</h1>
        {error && <p className="error">{error}</p>}
        <LoginForm onSubmit={handleLogin} />
        <p>Har du inget konto?  <Link to="/register">Registrera dig här</Link> </p>
    </div>
    );
};
