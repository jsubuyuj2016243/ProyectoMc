'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    nombre: String,
    password: String,
})

module.exports = mongoose.model('Empresa', EmpresaSchema);