'use strict'


const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")

//[rutas]
const empresa_rutes = require("./src/rutes/empresa.rutes");
const producto_rutes = require("./src/rutes/productoEmpresa.rutes")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(cors());


app.use('/api', empresa_rutes, producto_rutes)


module.exports = app;