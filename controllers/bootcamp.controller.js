// controllers/bootcamp.controller.js
const db = require("../index.js");
const Bootcamp = db.bootcamps;
const User = db.users;

// Crear y guardar un nuevo Bootcamp
exports.createBootcamp = (req, res) => {
    // Validar request
    if (!req.body.title || !req.body.cue || !req.body.description) {
        res.status(400).send({ message: "El contenido no puede estar vacío" });
        return;
    }

    // Crear un Bootcamp
    const bootcamp = {
        title: req.body.title,
        cue: req.body.cue,
        description: req.body.description
    };

    // Guardar Bootcamp en la base de datos
    Bootcamp.create(bootcamp)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Bootcamp."
            });
        });
};

// Obtener todos los Bootcamp incluyendo los usuarios
exports.findAll = (req, res) => {
    Bootcamp.findAll({ include: ["users"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener los Bootcamp."
            });
        });
};

// Obtener un Bootcamp por Id incluyendo los usuarios
exports.findBootcampById = (req, res) => {
    const id = req.params.id;

    Bootcamp.findByPk(id, { include: ["users"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({ message: `No se encontró el Bootcamp con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el Bootcamp con id=" + id
            });
        });
};