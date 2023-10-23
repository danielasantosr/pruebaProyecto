// login.js
window.onload = init;

function init() {
    // Verificar si el token ya está almacenado en localStorage
    if (localStorage.getItem("token")) {
        // Redirigir al panel de administración si ya está autenticado
        window.location.href = "admin.html";
    } else {
        // Asignar eventos a los botones
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "signin.html";
        });

        document.querySelector('.btn-primary').addEventListener('click', login);
    }
}

function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            email: mail,
            password: pass
        }
    }).then(function(res) {
        if (res.status === 200) {
            var token = res.data.message;
            localStorage.setItem("token", token);

            // Verificar si el usuario existe en la base de datos 'user.sql'
            axios.get(`http://localhost:3000/user/login=${token}`)
                .then(function(response) {
                    if (response.data.exists) {
                        // Usuario válido, redirigir a 'admin.html'
                        window.location.href = "admin.html";
                    } else {
                        alert("Usuario y/o contraseña incorrectos");
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        } else {
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function(err) {
        console.log(err);
    });
}

