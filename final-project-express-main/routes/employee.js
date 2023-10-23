const express = require('express');
const employee = express.Router();
const db = require('../config/database');
const authMiddleware = require('../middleware/auth');

employee.use(authMiddleware);

employee.post("/", async (req, res, next) => {
    const { name, last_name, phone, email, address } = req.body;

    if (name && last_name && phone && email && address) {
        let query = "INSERT INTO employees (name, last_name, phone, email, address)";
        query += ` VALUES('${name}', ${last_name}, ${phone}, ${email}, ${address})`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" });
        }
        
        return res.status(500).json({ code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
}); 

employee.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM employees WHERE employee_id=$(req.params.id)`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

employee.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { name, last_name, phone, email, address } = req.body;
    if (name && last_name && phone && email && address) {
        let query = `UPDATE employees SET name='${name}', last_name=${last_name},`;
        query += `phone=${phone}, email=${email}, address=${address} WHERE employee_id=${req.params.id};`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }
        
        return res.status(500).json({ code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

employee.patch("/:id([0-9]{1,3})", async (req, res, next) => {
    
    if (req.body.name) {
        let query = `UPDATE employees SET name='${req.body.name}', WHERE employee_id=${req.params.id};`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });

    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

employee.get('/', async (req, res, next) => {
    const emp = await db.query("SELECT * FROM employees");
    return res.status(200).json({ code: 1, message: emp });
});

employee.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    // CAMBIAR DE ACUERDO A LOS EMPLEADOS EN LA BASE DE DATOS
    if (id >= 1 && id <= 10) { 
        const emp = await db.query("SELECT * FROM employees WHERE employee_id=" + id + ";");
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado" });
});

employee.get('/:name([A-Za-z]+)', async (req, res, next) => {
    // Condicion ? valor si verdadero: valor si falso
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM employees WHERE name'" + name + "';"); 
    if (emp.length > 0) {
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado"});
});

module.exports = employee;