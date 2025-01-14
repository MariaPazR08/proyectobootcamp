// routes/user.routes.js
module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Crear un nuevo usuario
    router.post("/", users.createUser);

    // Obtener todos los usuarios
    router.get("/", users.findAll);

    // Obtener un usuario por Id
    router.get("/:id", users.findUserById);

    // Actualizar un usuario por Id
    router.put("/:id", users.updateUserById);

    // Eliminar un usuario por Id
    router.delete("/:id", users.deleteUserById);

    app.use("/api/users", router);
};