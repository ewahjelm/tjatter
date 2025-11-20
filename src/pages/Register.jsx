import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RegisterForm from "../components/RegisterForm";

export default function Register () {
    const { register } = useAuth();
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const navigate = useNavigate();

    async function handleRegister({ username, password, email, avatar }) {
        setError(null);
        setFeedback(null);

        if (!username || !password) {
            setError("Användarnamn och lösenord är obligatoriska");
            return;
        }

        const {data, status} = await register(username, password, email, avatar)

        if (status === 201) {
            setFeedback( "Grattis! Du har nu registerat ett konto 🎉")

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } else if (status === 400) {
            setError("Ooooops! Användarnamnet eller e-postadressen finns redan. Logga in eller välj ett annat namn"|| data.error)
        } else {
            setError(" Något gick fel på servern. Försök igen senare.")
        }
    }

    return (
    <div className="form-container">
        <h2>Välkommen till chat-appen</h2>
        <h1>Tjatter</h1>
        <h3>Fyll i dina uppgifter för att skapa en användare:</h3>
        <RegisterForm onSubmit={handleRegister} />
        {error && <p className="error">{error}</p>}
        {feedback ? (
        <p className="success">{feedback}</p>
        ) : (
        <p>
            Har du redan ett konto? <Link to="/login">Logga in här</Link>
        </p>
        )}
    </div>
    );
};
