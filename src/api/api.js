///////// Anrop mot chatify API
const API_URL = "https://chatify-api.up.railway.app"

// Hämta CSRF
export async function fetchCsrfToken() {
    try {
        const res = await fetch(`${API_URL}/csrf}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
        });

        if (!res.ok) {
        throw new Error("Något gick fel när CSRF-token hämtades.");
        }

        const data = await res.json();
        const csrfToken = data.csrfToken;

        if (csrfToken) {
        sessionStorage.setItem("csrfToken", csrfToken);
        console.log("CSRF-token sparad:", csrfToken);
        } else {
        console.error("Ingen CSRF-token i svaret.");
        }
    } catch (err) {
        console.error(err);
    }
}

//Använd csrf för att logga in med username & password  - få en jwt
export async function login(username, password) {
    try {
        const csrfToken = sessionStorage.getItem("csrfToken");

        if (!csrfToken) {
        throw new Error("Ingen CSRF-token finns. Kör fetchCsrfToken() först.");
        }

        const res = await fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            csrfToken
        })
        });

        if (!res.ok) {
        throw new Error("Inloggning misslyckades.");
        }

        const data = await res.json();
        const token = data.token;

        if (token) {
        sessionStorage.setItem("jwtToken", token);
        console.log("JWT sparad:", token);
        } else {
        console.error("Ingen token i svaret.");
        }

        return token;
    } catch (err) {
        console.error(err);
    }
}