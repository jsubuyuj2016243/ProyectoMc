'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = '123456';

exports.ensureAuth = function (req,res,next){
    if(!req.headers.authorization){
        return res.status(404).send({ report: 'No tienes autorización'});
    }

    var token = req.headers.authorization.replace(/['"']+/g,'');

    try{
        var payload = jwt.decode(token,secret);
        
        if(payload.exp <= moment().unix()){
            return res.status(200).send({ report: 'El token ha expirado'})
        }}catch(err){
        return res.status(404).send({ report: 'Token no válido'});
    }

    req.empresa = payload;
    next();
}