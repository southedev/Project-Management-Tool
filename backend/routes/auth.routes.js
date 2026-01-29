const express = require("express");
const { validateRequest } = require("zod-express-middleware");
const router = express.Router();
const { registerSchema, loginSchema } = require("../libs/validate.js");
const { registerUser, loginUser } = require("../controllers/auth.controller.js");

router.post("/register", validateRequest({ body: registerSchema }), registerUser);

router.post("/login", validateRequest({ body: loginSchema }), loginUser);

module.exports = router;