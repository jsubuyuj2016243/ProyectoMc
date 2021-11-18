'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = '123456';

exports.createToken = function (empresa){
    var payload = {
        sub: empresa._id,
        nombre: empresa.nombre,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }
    return jwt.encode(payload,secret);
}