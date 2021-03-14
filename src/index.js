const api = require('./api');

// Debería ser (path,options)
const mdLinks = (example) => {
    const absolutePath = api.resolvePath(example);
    const pathIsValid = api.validPath(absolutePath);

    if (pathIsValid == true) {
        api.getMdFiles(absolutePath);
    }

    //falta acomodar para que funcione
}

console.log(mdLinks('/Carpeta'));
console.log(mdLinks('/Carpeta/Carpeta-1'));

module.exports = mdLinks;
