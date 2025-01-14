// routes/bootcamp.routes.js
module.exports = app => {
    const bootcamps = require("../controllers/bootcamp.controller.js");

    var router = require("express").Router();

    // Crear un nuevo Bootcamp
    router.post("/", bootcamps.createBootcamp);

    // Obtener todos los Bootcamp
    router.get("/", bootcamps.findAll);

    // Obtener un Bootcamp por Id
    router.get("/:id", bootcamps.findBootcampById);

    app.use("/api/bootcamps", router);
};