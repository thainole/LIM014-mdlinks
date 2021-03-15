const path = require('path');
const fs = require('fs');

/* Para volver un path absoluto y validar la ruta */
const resolvePath = (somePath) => (path.isAbsolute(somePath) ? somePath : path.resolve(somePath));
const validPath = (paths) => fs.existsSync(paths);

/* Para obtener los MD files */
const elemArr = []; // Crear un array vacío para luego insertar los archivos md
const getMdFiles = (paths) => {
  const extName = path.extname(paths); // método para obtener la extensión (md)
  const pathName = path.basename(paths); // retorna la última porción del path (obtener el nombre)
  const infoPath = fs.statSync(paths); // para acceder a la información de los archivos

  if (infoPath.isDirectory() && pathName !== 'node_modules') { // método que da true && el basename diferente a la carpeta node_modules
    const dirElem = fs.readdirSync(paths); // Para leer directorio, muestra elementos en un array
    if (dirElem.length > 0) { // Si hay más de un elemento...
      dirElem.map((elem) => { // recorrer todos los elementos del array
        const newAbsPath = path.join(paths, elem); // y unir el path + los elementos
        return getMdFiles(newAbsPath); // para luego aplicarles la misma función
      });
    }
  } else if (extName === '.md') { // si la extensión es md
    elemArr.push(paths); // agregar ese path al array creado anteriormente
  }
  return elemArr; // retornar el array de los elementos con extensión md
};

module.exports = {
  resolvePath,
  validPath,
  getMdFiles,
};
