const http = require('http');
const fs = require('fs');
const PUERTO = 9000;

//-- Crear el servidor
const server = http.createServer((req, res) => {

    const data = "main.html"

    fs.readFile(data, null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.setHeader("Content-Type", "text/html")
            res.write(data);
        }
        res.end();
    });;
});

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);

console.log("Happy server activado!. Escuchando en puerto: " + PUERTO);