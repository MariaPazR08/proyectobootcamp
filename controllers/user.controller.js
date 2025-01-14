// controllers/user.controller.js
const db = require("../index.js");
const User = db.users;
const Bootcamp = db.bootcamps;

// Crear y guardar un nuevo usuario
exports.createUser = (req, res) => {
    // Validar request
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
        res.status(400).send({ message: "El contenido no puede estar vacío" });
        return;
    }

    // Crear un usuario
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    // Guardar usuario en la base de datos
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el usuario."
            });
        });
};

// Obtener los Bootcamp de un usuario
exports.findUserById = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, { include: ["bootcamps"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({ message: `No se encontró el usuario con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el usuario con id=" + id
            });
        });
};

// Obtener todos los usuarios incluyendo los Bootcamp
exports.findAll = (req, res) => {
    User.findAll({ include: ["bootcamps"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener los usuarios."
            });
        });
};

// Actualizar un usuario por Id
exports.updateUserById = (req, res) => {
    const id = req.params.id;

    User.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Usuario actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar el usuario con id=${id}. Tal vez el usuario no se encontró o req.body está vacío.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el usuario con id=" + id
            });
        });
};

// Eliminar un usuario por Id
exports.deleteUserById = (req, res) => {
    const id = req.params.id;

    User.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Usuario eliminado correctamente." });
            } else {
                res.send({ message: `No se pudo eliminar el usuario con id=${id}. Tal vez el usuario no se encontró.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el usuario con id=" + id
            });
        });
};