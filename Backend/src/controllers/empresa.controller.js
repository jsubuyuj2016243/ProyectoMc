'use strict'

const jwt = require('../services/jwt');
const bcrypt = require("bcrypt-nodejs");

const empresaModel = require("../models/empresa.model");

function Login(req, res) {
    var params = req.body;
  
    empresaModel.findOne({ empresa: params.nombre }, (err, empresaFound) => {
      if (err) return res.status(404).send({ report: 'Error al iniciar sesión' });
      if (!empresaFound) return res.status(404).send({ report: 'Empresa no encontrada' });
  
      if (empresaFound) {
        bcrypt.compare(params.password, empresaFound.password, (err, Valid) => {
          if (err) return res.status(404).send({ report: 'Contraseña incorrecta' });
          console.log(err)
          if (Valid) {
            return res.status(200).send({ token: jwt.createToken(empresaFound), empresaFound });
          } else {
            return res.status(404).send({ report: 'Usuario no válido' })
          }
        })
      }
    })
  
  }

  module.exports = {
    Login
}