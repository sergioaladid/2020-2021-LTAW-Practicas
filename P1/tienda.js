const http = require('http');
const fs = require('fs');
const PUERTO = 9000;

//-- Crear el servidor
const server = http.createServer((req, res) => {

    let fichero = ""
    const url = new URL(req.url, 'http://' + req.headers['host']);

    console.log("Recurso solicitado (URL):" + req.url)
    console.log("Recurso:" + url.pathname)

    if (url.pathname == "/") //--http://localhost:8080/
        fichero = "main.html"  //--Página principal
        
    else{
        fichero = url.pathname; //-- q.pathname es otro recurso que se pide en el localhost
    }
    //-- Para sacar el tipo de fichero
    extension = fichero.split(".")[1] //--Se coge la extensión del archivo
    //fichero = "." + fichero //--Para leer el fichero. Sin "." no funciona
    console.log("Final:" + fichero)
    console.log("Extension Final:" + extension)
    
    fs.readFile(fichero, null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            if (extension == "jpg" || extension == "png"){
                tipo_texto = "image/" + extension;
            }

            if (extension == "css"){
                tipo_texto = "text/css";
            }

            if (extension == "html"){
                tipo_texto = "text/html";
            }
            res.setHeader("Content-Type", tipo_texto)
            res.write(data);
        }
        res.end();
    });;
});

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);

console.log("Happy server activado!. Escuchando en puerto: " + PUERTO);