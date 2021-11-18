'use strict'

const express = require("express");
const productoEmpresaController = require("../controllers/productoEmpresa.controller")
var authenticated = require("../middlewares/authenticated");

var api = express.Router();

api.post('/crearProducto', productoEmpresaController.crearProducto)
api.get('/mostrarProducto', authenticated.ensureAuth, productoEmpresaController.mostrarProducto)
api.put('/editarProducto/:idProducto', authenticated.ensureAuth, productoEmpresaController.editarProducto)
api.delete('/eliminarProducto/:idProducto', authenticated.ensureAuth, productoEmpresaController.eliminarProducto)
api.get('/buscarProductoID/:idProducto', productoEmpresaController.buscarProductoID)

module.exports = api;