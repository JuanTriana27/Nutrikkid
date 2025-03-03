const bcrypt = dcodeIO.bcrypt; // Asegurar que bcrypt está disponible primero

let users = JSON.parse(localStorage.getItem("users")) || [];

// Convertir contraseñas en texto plano a bcrypt
users = users.map(user => {
    if (user.password && !user.password.startsWith("$2a$")) {
        user.password = bcrypt.hashSync(user.password, 10);
    }
    return user;
});

// Asegurar que 'admin' exista con una contraseña cifrada
const adminExists = users.some(u => u.user === "admin");
if (!adminExists) {
    let hashedAdminPass = bcrypt.hashSync("123456", 10);
    users.push({ user: "admin", password: hashedAdminPass });
}

localStorage.setItem("users", JSON.stringify(users));

function login(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="user"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(u => u.user === username);

    if (userFound && bcrypt.compareSync(password, userFound.password)) {
        localStorage.setItem("loggedUser", username);
        window.location.href = "home.html";
    } else {
        let errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
        errorModal.show();
    }
}

// Proteger páginas
function protectPage() {
    if (!localStorage.getItem("loggedUser")) {
        window.location.href = "login.html";
    }
}

// Cerrar Cesion
function logout() {
    console.log("Cerrando sesión..."); // Para depuración
    localStorage.removeItem("loggedUser"); // Eliminar usuario almacenado
    window.location.href = "login.html"; // Redirigir al login
}