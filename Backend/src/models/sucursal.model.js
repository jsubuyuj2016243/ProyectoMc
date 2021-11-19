'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sucursalSchema = Schema({
    nombre: String,
    direccion: String,
    idEmpresa: { type: Schema.Types.ObjectId, ref: 'Empresa' }
})

module.exports = mongoose.model('Sucursales', sucursalSchema);