import { useState } from 'react';

export default function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        // skickar input upp till Login-container
        e.preventDefault();
        onSubmit({ username, password }); 
    }

    return(
        <form onSubmit={handleSubmit} className="form">
            <label>
                Användarnamn
                <input 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </label>

            <label>
                Lösenord
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </label>

            <button type="submit">Logga in</button>       
        </form>
    );
}