'use strict'

const jwt = require('../services/jwt');
const bcrypt = require("bcrypt-nodejs");

const sucursal = require("../models/sucursal.model")

function crearSucursal(req, res){
    var params = req.body;
    var SucursalModel = new sucursal();
    var idEmpresa = req.empresa.sub;

        SucursalModel.nombre = params.nombre;
        SucursalModel.direccion = params.direccion;
        SucursalModel.idEmpresa = idEmpresa;

    sucursal.findOne({ nombre: sucursal.nombre }, (err, sucFound) => {
        if (err) return res.status(404).send({ report: 'Error al encontrar una sucursal' });
        if (sucFound) return res.status(202).send({ report: 'Esta sucursal ya existe' })
      
        SucursalModel.save((err, sucSaved) => {
            if (err) return res.status(404).send({ report: 'Error al guardar la sucursal' });
            return res.status(200).send(sucSaved)
        })
    })
}

function mostrarSucursal(req,res) {  
    sucursal.find((err,sucFound)=>{
      if(err) return res.status(404).send({report:'Error al encontrar sucursales'});
      return res.status(200).send(sucFound)
    })
  }

function editarSucursal(req,res){
    var idSucursal = req.params.idSucursal
    var params = req.body

    sucursal.findByIdAndUpdate(idSucursal,params,(err,sucUpdated)=>{
      if(err) return res.status(500).send({ report: 'Error en la petición' })
      if(sucUpdated == null) return res.status(500).send({ report: 'No se actualizo la sucursal'})
  
      return res.status(200).send(sucUpdated)
    })
  
  }

function eliminarSucursal(req,res){
    var idSucursal = req.params.idSucursal
  
    sucursal.findByIdAndDelete(idSucursal, (err,sucDeleted)=>{
      if(err) return res.status(500).send({ report: 'Error en la petición' })
      if(sucDeleted == null) return res.status(500).send({ report: 'Error al eliminar la sucursal'})
  
      return res.status(200).send(sucDeleted)
    })
  
  }

function buscarSucursalID(req, res){
    var idSucursal = req.params.idSucursal;

    sucursal.findById(idSucursal, (err, sucFound)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'})
        if(!sucFound) return res.status(500).send({mensaje: 'No se pudo encontrar la sucursal'})

        return res.status(200).send(sucFound)
    })

}

module.exports = {
    crearSucursal,
    mostrarSucursal,
    editarSucursal,
    eliminarSucursal,
    buscarSucursalID
}