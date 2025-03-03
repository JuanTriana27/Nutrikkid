// register.js (Frontend)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const user = document.getElementById("user").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!user || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("/.netlify/functions/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
                window.location.href = "login.html";
            } else {
                alert(data.error || "Error al registrar usuario");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Ocurrió un error. Intenta nuevamente.");
        }
    });
});  