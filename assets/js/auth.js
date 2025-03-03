async function login(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="user"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    try {
        const response = await fetch("/.netlify/functions/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: username, password }),
        });
        const data = await response.json();

        if (response.ok && data.token) {
            console.log("Token recibido:", data.token);
            localStorage.setItem("token", data.token);
            document.location = "home.html";
        } else {
            console.error("Error en login:", data.error);
            let errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
            errorModal.show();
        }
    } catch (error) {
        console.error(error);
        alert("Error en el login");
    }
}

// Para proteger páginas:
function protectPage() {
    if (!localStorage.getItem("token")) {
        window.location.href = "home.html";
    }
}

// Para cerrar sesión:
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}  