import { useState } from 'react';

export default function RegisterForm({ onSubmit }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");

    function handleSubmit(e) {
        // skickar input upp till Register-container
        e.preventDefault();
        onSubmit({ username, password, email, avatar }); 
    }

    return(
        <form onSubmit={handleSubmit} className="form">
            <label>
                Användarnamn*
                <input 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </label>

            <label>
                Lösenord*
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />  
            </label>

            <label>
                Email-adress*
                <input 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Avatar-URL
                <input 
                    type="url"
                    value={avatar}
                    onChange={e => setAvatar(e.target.value)}
                />
                <p>Öppna https://pravatar.cc i en annan flik. 
                    Välj en bild och klistra in dess url ovan 😇 
                </p>
            </label>

            <button type="submit">Skapa användare</button>       
        </form>
    );
}