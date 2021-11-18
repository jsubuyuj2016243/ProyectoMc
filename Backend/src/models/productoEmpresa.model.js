'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = Schema({
    producto: String,
    proveedor: String,
    stock: String
})

module.exports = mongoose.model('ProductoEmpresa', productoSchema);