'use strict'

const app = require('./app');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const empresaModel = require('./src/models/empresa.model');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/McDonalds', {useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{

    var nombre = 'AdminMc';
    var password = '123456';
    var Empresa = new empresaModel();

    Empresa.nombre = nombre;

    empresaModel.find({ empresa : nombre }).exec((err,empresaFound)=>{
        if(empresaFound && empresaFound.length >= 1) return console.log("Esta empresa está en operaciones");

        bcrypt.hash(password, null, null, (err, encryptedPasswords)=>{
            if(err) return console.log("error en la petición");

            Empresa.password = encryptedPasswords;

            Empresa.save((err,empresaSave)=>{
                if(err) return console.log("error en la peticion guardar");
                if(empresaSave){
                    return console.log(empresaSave);
                }else{
                    return console.log("Empresa no iniciada")
                }
            })
        })
    })

    app.listen(3000, function(){
    })

}).catch(err => console.log(err))