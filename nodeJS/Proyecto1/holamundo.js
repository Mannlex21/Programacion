var http = require('http');
http.createServer(function(peticion, respuesta){
   respuesta.writeHead(200, 'text/plain');
   respuesta.end('Hola mundo.');
}).listen(8080, '127.0.0.1');
console.log('El servidor esta funcionando correctamente en https://localhost:8080/');