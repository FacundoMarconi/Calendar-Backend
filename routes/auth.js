/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// ENDPOINTS

router.post(
  "/new",
  [
    //middlewares
    check("name", "el Nombre es obligatorio").not().notEmpty(),
    check("email", "el Email es obligatorio").isEmail(),
    check("password", "el Password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    //middlewares
    check("email", "el Email es obligatorio").isEmail(),
    check("password", "el Password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
