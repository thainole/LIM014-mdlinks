const path = require('path');
const fs = require('fs');

/* Para volver un path absoluto y validar la ruta */
const resolvePath = (somePath) => (path.isAbsolute(somePath) ? somePath : path.resolve(somePath));
const validPath = (paths) => fs.existsSync(paths);

/* Para obtener los MD files */
const elemArr = [];
const getMdFiles = (paths) => {
  const extName = path.extname(paths);
  const pathName = path.basename(paths);
  const infoPath = fs.statSync(paths);

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

// eslint-disable-next-line no-useless-escape
const regx = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxLink = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxText = /\[([\w\s\d.()]+)\]/g;

/* Funciones para leer archivos y extraer links */
const readFile = (file) => (fs.readFileSync(file, 'utf-8'));
const matchLinks = (file) => (file.match(regx));

const getLinks = (mypath) => {
  const linksArr = [];
  const getMdFilesArr = getMdFiles(mypath);
  getMdFilesArr.map((myfile) => {
    const fileRead = readFile(myfile);
    const links = matchLinks(fileRead);
    if (links) {
      links.map((link) => {
        const myhref = link.match(regxLink).join().slice(1, -1); // con join vuelvo string mi array
        const mytext = link.match(regxText).join().slice(1, -1); // con el slice corto () []
        const arrLinksObj = {
          href: myhref,
          text: mytext,
          file: myfile,
        };
        linksArr.push(arrLinksObj);
      });
    }
  });
  return linksArr;
};
console.log(getLinks('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md'));

module.exports = {
  resolvePath,
  validPath,
  getMdFiles,
  getLinks,
};
