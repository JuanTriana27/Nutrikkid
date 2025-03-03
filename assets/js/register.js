function register(event) {
    event.preventDefault();

    let user = document.getElementById("user").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!user || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.some(u => u.user === user);
    if (userExists) {
        alert("El usuario ya existe. Prueba con otro nombre.");
        return;
    }

    // Cifrar la contraseña antes de guardarla
    let hashedPassword = dcodeIO.bcrypt.hashSync(password, 10);

    users.push({ user, password: hashedPassword }); // Usar "user" en lugar de "username"
    localStorage.setItem("users", JSON.stringify(users));

    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
}
