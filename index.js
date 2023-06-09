const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

// console.log(process.env);

// Crear el servidor de express
const app = express();

//Base de Datos
dbConnection();

//CORS
app.use(cors());

// Directorio Publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

// Rutas
// TODO: auth  // crear, login, renew
app.use("/api/auth", require("./routes/auth"));

// TODO: CRUD: eventos
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo con el puerto ${process.env.PORT}`);
});
