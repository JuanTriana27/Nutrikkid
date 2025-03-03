async function login(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="user"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    const response = await fetch("/.netlify/functions/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: username, password }),
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem("token", data.token); // Guardamos el token
        window.location.href = "home.html";
    } else {
        alert(data.error);
    }
}

// Proteger páginas
function protectPage() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}