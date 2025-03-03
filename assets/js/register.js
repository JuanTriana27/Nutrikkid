async function register(event) {
    event.preventDefault();

    let user = document.getElementById("user").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!user || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        const response = await fetch("/.netlify/functions/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, password }),
        });
        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = "login.html";
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error(error);
        alert("Error al registrar");
    }
}  