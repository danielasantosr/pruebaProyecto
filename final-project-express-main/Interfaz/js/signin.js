// signin.js
window.onload = init;

function init() {
    // Verificar si el token ya está almacenado en localStorage
    if (localStorage.getItem("token")) {
        // Redirigir al panel de inicio de sesión si ya está autenticado
        window.location.href = "login.html";
    } else {
        // Asignar eventos a los botones
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "login.html";
        });

        document.querySelector('.btn-primary').addEventListener('click', signin);
    }
}

function signin() {
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin', // Asegúrate de que la ruta coincida con tu servidor
        data: {
            user_name: name,
            user_mail: mail,
            user_password: pass
        }
    }).then(function(res) {
        console.log(res);
        alert("Registro exitoso");
        window.location.href = "login.html";
    }).catch(function(err) {
        console.log(err);
    })
}
