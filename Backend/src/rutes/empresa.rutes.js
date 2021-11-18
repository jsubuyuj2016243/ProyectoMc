'use strict'

const express = require("express");
const empresaController = require("../controllers/empresa.controller");


var api = express.Router();

api.post('/Login', empresaController.Login)

module.exports = api;