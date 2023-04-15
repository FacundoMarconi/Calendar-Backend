const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");


const crearUsuario = async (req, res = response) => {

  const { email, password } = req.body;

  //Validaciones
  try {

    let usuario = await Usuario.findOne({email})

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo'
      })
    }

    usuario = new Usuario(req.body);


    //Encriptar constraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync( password, salt) 


    //Guardar Usuario
    await usuario.save();


    //Generar el JSON web Token (JWT)
    const token = await generarJWT(usuario.id, usuario.name)


    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {

    console.log(error)

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }

};

const loginUsuario = async(req, res = response) => {

  const { email, password } = req.body;

  //Validaciones
  try {


    let usuario = await Usuario.findOne({email})

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese correo'
      })
    }

    //Validar los password para el Login del usuario
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El password es incorrecto"
      })
    }

    //Generar el JSON web Token (JWT)
    const token = await generarJWT(usuario.id, usuario.name)

    res.json({
      ok:true,
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch (error) {

    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
    
  }


  // res.json({
  //   ok: true,
  //   msg: "login",
  //   email,
  //   password,
  // });
};

const revalidarToken = async(req, res = response) => {

  // const uid = req.uid
  // const name = req.name
  const {uid, name} = req

  //GENERAR JWT Token
  const token = await generarJWT(uid, name)


  res.json({
    ok: true,
    uid,
    name,
    token
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
