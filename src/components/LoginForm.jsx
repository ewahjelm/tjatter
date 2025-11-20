import { useState } from 'react';
import Button from './Button';
import InputField from './InputField';

export default function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const completed = username.trim() !== "" && password.trim() !== "";

    function handleSubmit(e) {
        // skickar input upp till Login-container
        e.preventDefault();
        onSubmit({ username, password }); 
    }

    return(
        <form onSubmit={handleSubmit} className="form">
{/*             <label>
                Användarnamn
                <input 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </label> */}

            <InputField
                name="username"
                label="Användarnamn"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <InputField
                name="password"
                label="Lösenord"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        
{/*             <label>
                Lösenord
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </label> */}

            {/* <button type="submit">Logga in</button>    */}
            <Button type="submit" 
            disabled={!completed}> Logga in
            </Button>     
        </form>
    );
}