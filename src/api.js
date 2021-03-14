const path = require('path');
const fs = require('fs');
const Console = require('console');

// Para volver un path absoluto
const resolvePath = (somePath) => (path.isAbsolute(somePath) ? somePath : path.resolve(somePath));

// Para saber si la ruta existe / es correcta)
const validPath = (paths) => fs.existsSync(paths);

//Para obtener los MD files
const elemArr = [];
const getMdFiles = (paths) => {
    const extName = path.extname(paths);
    const pathName = path.basename(paths)
    const infoPath = fs.statSync(paths);

    if (infoPath.isDirectory() && pathName !== 'node_modules') {
        const dirElem = fs.readdirSync(paths);  
        if (dirElem.length > 0) {
            dirElem.map((elem) => {
                const newAbsPath = `${paths}/${elem}`;
                return getMdFiles(newAbsPath);
            }) 
        } else {
            return 'This directory does not contain any file'
        }
    } else if (extName == '.md') {
        elemArr.push(paths);
    } 
    return elemArr;
}    
    
console.log(getMdFiles('D:/Documentos/Laboratoria/Bootcamp'));
//Duda, no puedo hacerlo con la diagonal invertida :c no sé porqué

module.exports = {
    resolvePath,
    validPath,
    getMdFiles
}


// Los console log
/* 
console.log(resolvePath('./Carpeta'));
console.log(validPath('D:/Carpeta'));
console.log(isDirectory('D:/Carpeta'));
console.log(readDir('D:/Carpeta'));
console.log(isFile('D:/Carpeta/primer-archivo.md'));
*/