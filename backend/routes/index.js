const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authController = require("../controllers/AuthController");

// Rute untuk autentikasi
router.post("/login", authController.login);

// Rute untuk mengelola user
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.post("/users", userController.createUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
