import { useState } from 'react';

export default function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ username, password }); // skickas upp till Login page
    }

    return(
        <form onSubmit={handleSubmit} className="form">
            <label>
                Username
                <input 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </label>

            <label>
                Password
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