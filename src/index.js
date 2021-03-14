const api = require('./api');

// Debería ser (path,options)
const mdLinks = (example) => {
    const absolutePath = api.resolvePath(example);
    const pathIsValid = api.validPath(absolutePath);
    if (pathIsValid == true) {
        return api.readDir(absolutePath);
    } else {
        return 'The path is not valid';
    };

}

/*console.log(mdLinks('/Carpeta'));
console.log(mdLinks('/Carpeta/Carpeta-1'));*/

module.exports = mdLinks;
