// Hämtar CSRF från chatify API
export async function fetchCsrfToken() {
  try {
    const res = await fetch("https://chatify-api.up.railway.app/csrf", {
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