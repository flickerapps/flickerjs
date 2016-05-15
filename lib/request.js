const http = require('http');
const url = require('url');
var Request = {};
Request.body = {};

/*
 * Parametros de la url de la peticion
 * router url: => /user/:id
 * url de la Peticion: => /user/5
 * Parametros de la peticion => {id: 5}
*/
Request.params = {};

/*
 * Parseamos la url de la peticion
 * Ejemplos:
 *  url => '/user/?id=4'
 *  req.query() => 'id=4'
*/
Request.query = function(){
    return url.parse(this.url).query || '';
};

module.exports = Request;

