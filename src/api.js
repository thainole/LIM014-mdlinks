const path = require('path');
const fs = require('fs');

/* Función para volver un path absoluto y validar la ruta */
const absolutePath = (paths) => (path.isAbsolute(paths) ? paths : path.resolve(paths));
const validPath = (paths) => fs.existsSync(paths);
/* Función para obtener los MD files */
const elemArr = [];
const getMdFiles = (paths) => {
  const extName = path.extname(paths);
  const pathName = path.basename(paths);
  const infoPath = fs.statSync(paths);

  if (infoPath.isDirectory() && pathName !== 'node_modules') {
    const dirElem = fs.readdirSync(paths);
    if (dirElem.length > 0) {
      dirElem.forEach((elem) => {
        const newAbsPath = path.join(paths, elem);
        getMdFiles(newAbsPath);
      });
    }
  } else if (extName === '.md') {
    elemArr.push(paths);
  }
  return elemArr;
};

const regx = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxLink = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxText = /\[([\w\s\d.()]+)\]/g;

/* Función para leer archivos y extraer links */
const getMdLinks = (paths) => {
  const linksArr = [];
  paths.forEach((myfile) => {
    const fileRead = fs.readFileSync(myfile, 'utf-8');
    const links = fileRead.match(regx);
    if (links) { // si se llega a encontrar un match
      links.forEach((link) => {
        const myhref = link.match(regxLink).join().slice(1, -1); // con join vuelvo string mi array
        const mytext = link.match(regxText).join().slice(1, -1); // con el slice corto () []
        const linksObj = {
          href: myhref,
          text: mytext,
          file: myfile,
        };
        return linksArr.push(linksObj);
      });
    }
  });
  return linksArr;
};

// console.log(getMdFiles('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks'));
// console.log(getMdLinks('D:\\Carpeta\\primer-archivo.md'));
console.log(getMdLinks(['D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md']));
// console.log(getLinks('../LIM014-mdlinks'));
// Funciona solo con rutas completas, si le paso esto en index no funciona.

module.exports = {
  absolutePath,
  validPath,
  getMdFiles,
  getMdLinks,
};
