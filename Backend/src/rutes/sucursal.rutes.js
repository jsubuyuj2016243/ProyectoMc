'use strict'

const express = require("express");
const sucursalController = require("../controllers/sucursal.controller")
var authenticated = require("../middlewares/authenticated");

var api = express.Router();

api.post('/crearSucursal', authenticated.ensureAuth, sucursalController.crearSucursal)
api.get('/mostrarSucursal', authenticated.ensureAuth, sucursalController.mostrarSucursal)
api.put('/editarSucursal/:idSucursal', authenticated.ensureAuth, sucursalController.editarSucursal)
api.delete('/eliminarSucursal/:idSucursal', authenticated.ensureAuth, sucursalController.eliminarSucursal)
api.get('/buscarSucursalID/:idSucursal', sucursalController.buscarSucursalID)

module.exports = api;