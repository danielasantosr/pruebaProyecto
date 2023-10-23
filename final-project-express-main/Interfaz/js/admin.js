// admin.js
window.onload = init;
var headers = {};
var url = "http://localhost:3000/api"; // Cambia la URL base a la ruta de tu API

function init() {
    // Verificar si el token ya está almacenado en localStorage
    if (localStorage.getItem("token")) {
        // Configurar encabezados con el token
        headers = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }}
        loadEmployee();
    } else {
        window.location.href = "login.html";
    }
}

function loadEmployee() {
    // Realizar una solicitud GET para obtener la lista de empleados desde tu API
    axios.get(url + "/employees", headers)
        .then(function(res) {
            console.log(res);
            displayEmployee(res.data);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function displayEmployee(employees) {
    var body = document.querySelector("body");
    body.innerHTML = ""; // Limpia el contenido anterior antes de mostrar los empleados

    for (var i = 0; i < employees.length; i++) {
        // Utiliza comillas para interpolar en la cadena
        body.innerHTML += `<h3>${employees[i].name}</h3>`;
    }
}

// Agregar código para manejar la lógica de agregar, modificar, eliminar y buscar empleados
// Utiliza las rutas y métodos apropiados en tu API para realizar estas operaciones
// Puedes agregar funciones y eventos para realizar estas acciones
