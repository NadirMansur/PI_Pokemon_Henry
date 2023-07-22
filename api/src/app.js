const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");

require("./db.js");

const server = express();

server.name = "API";

// Configuración del body parser para manejar datos en las solicitudes
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

// Configuración del cookie parser para manejar cookies en las solicitudes
server.use(cookieParser());

// Configuración del middleware de logging con morgan
server.use(morgan("dev"));

// Configuración de los encabezados CORS para permitir solicitudes desde un dominio específico
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // actualizar para que coincida con el dominio desde donde se realizará la solicitud
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Configuración del middleware para analizar el cuerpo de las solicitudes como JSON
server.use(express.json());

// Configuración de las rutas de la API
server.use("/api", routes);

// Middleware para capturar y manejar errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
