'use strict'

const jwt = require('../services/jwt');
const bcrypt = require("bcrypt-nodejs");

const productoEmpresa = require("../models/productoEmpresa.model")

function crearProducto(req, res){
    var params = req.body;
    var ProductoModel = new productoEmpresa();

        ProductoModel.producto = params.producto;
        ProductoModel.proveedor = params.proveedor;
        ProductoModel.stock = params.stock;

    productoEmpresa.findOne({ producto: productoEmpresa.producto }, (err, productFound) => {
        if (err) return res.status(404).send({ report: 'Error al encontrar un producto' });
        if (productFound) return res.status(202).send({ report: 'Este producto ya existe' })
      
        ProductoModel.save((err, productSaved) => {
            if (err) return res.status(404).send({ report: 'Error al guardar el Producto' });
            return res.status(200).send(productSaved)
        })
    })
}

function mostrarProducto(req,res) {  
    productoEmpresa.find((err,productFound)=>{
      if(err) return res.status(404).send({report:'Error al encontrar productos'});
      return res.status(200).send(productFound)
    })
  }

function editarProducto(req,res){
    var idProducto = req.params.idProducto
    var params = req.body

    productoEmpresa.findByIdAndUpdate(idProducto,params,(err,productUpdated)=>{
      if(err) return res.status(500).send({ report: 'Error en la petición' })
      if(productUpdated == null) return res.status(500).send({ report: 'No se actualizo el producto'})
  
      return res.status(200).send(productUpdated)
    })
  
  }

function eliminarProducto(req,res){
    var idProducto = req.params.idProducto
  
    productoEmpresa.findByIdAndDelete(idProducto, (err,productDeleted)=>{
      if(err) return res.status(500).send({ report: 'Error en la petición' })
      if(productDeleted == null) return res.status(500).send({ report: 'Error al eliminar el Producto'})
  
      return res.status(200).send(productDeleted)
    })
  
  }

function buscarProductoID(req, res){
    var idProducto = req.params.idProducto;

    productoEmpresa.findById(idProducto, (err, productFound)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'})
        if(!productFound) return res.status(500).send({mensaje: 'No se pudo encontrar el producto'})

        return res.status(200).send(productFound)
    })

}

module.exports = {
    crearProducto,
    mostrarProducto,
    editarProducto,
    eliminarProducto,
    buscarProductoID
}