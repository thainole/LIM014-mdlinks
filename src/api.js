const path = require('path');
const fs = require('fs');

/* Función para volver un path absoluto y validar la ruta */
const validPath = (paths) => {
  const absPath = path.isAbsolute(paths) ? paths : path.resolve(paths);
  const existPath = fs.existsSync(absPath);
  return existPath;
};

/* Función para obtener los MD files */
const getMdFiles = (paths) => {
  const extName = path.extname(paths);
  const pathName = path.basename(paths);
  const infoPath = fs.statSync(paths);
  const elemArr = [];

  if (infoPath.isDirectory() && pathName !== 'node_modules') {
    const dirElem = fs.readdirSync(paths);
    if (dirElem.length > 0) {
      dirElem.map((elem) => {
        const newAbsPath = path.join(paths, elem);
        return getMdFiles(newAbsPath);
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
const getLinks = (paths) => {
  const linksArr = [];
  const mdfilesArr = getMdFiles(paths);
  mdfilesArr.forEach((myfile) => {
    const fileRead = fs.readFileSync(myfile, 'utf-8');
    const links = fileRead.match(regx);
    if (links) {
      links.forEach((link) => {
        const myhref = link.match(regxLink).join().slice(1, -1); // con join vuelvo string mi array
        const mytext = link.match(regxText).join().slice(1, -1); // con el slice corto () []
        const linksObj = {
          href: myhref,
          text: mytext,
          file: myfile,
        };
        linksArr.push(linksObj);
      });
    }
  });
  return linksArr;
};

console.log(getLinks('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md'));

module.exports = {
  validPath,
  getMdFiles,
  getLinks,
};
