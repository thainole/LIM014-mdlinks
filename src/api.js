const path = require('path');
const fs = require('fs');

// Para volver un path absoluto
const resolvePath = (somePath) => (path.isAbsolute(somePath) ? somePath : path.resolve(somePath));
/*console.log(resolvePath('./Carpeta'));*/


// Para saber si la ruta existe/ es correcta)
const validPath = (absolutePath) => fs.existsSync(absolutePath);
/*console.log(validPath('D:/Carpeta'));*/

// Para leer un directorio (retorna en un array los elementos encontrados)
const readDir = (absolutePath) => fs.readdirSync(absolutePath);
/*console.log(readDir('D:/Carpeta'));*/



module.exports = {
    resolvePath,
    validPath,
    readDir,
}