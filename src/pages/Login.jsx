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
        const success = await login(username, password);
        if (success) {
            navigate("/chat");
        } else {
            setError("Felaktigt användarnamn eller lösenord");
        }
    }


return (
<div className="login-container">
    <h4>Välkommen till chat-appen</h4>
    <h1>Tjatter</h1>
    <h4>Logga in</h4>
    <LoginForm onSubmit={handleLogin} />
    <p>Har du inget konto?  <Link to="/register">Registrera dig här</Link> </p>

    {error && <p style={{ color: "red" }}>{error}</p>}
</div>
);
};
