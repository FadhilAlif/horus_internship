const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authController = require("../controllers/AuthController");

// Rute untuk autentikasi
router.post("/login", authController.login);

// Rute untuk mengelola user
router.get("/user", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUser);
router.post("/user", userController.createUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
