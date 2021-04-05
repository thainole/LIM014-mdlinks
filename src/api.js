const path = require('path');
const fs = require('fs');
// eslint-disable-next-line import/no-unresolved
const fetch = require('node-fetch');

/* Función para volver un path absoluto y validar la ruta */
const absolutePath = (paths) => (path.isAbsolute(paths) ? paths : path.resolve(paths));
const validPath = (paths) => fs.existsSync(paths);

/* Función para obtener los MD files */
const getMdFiles = (paths) => {
  const elemArr = [];
  const infoPath = fs.statSync(paths);

  if (infoPath.isDirectory()) {
    const dirElem = fs.readdirSync(paths);
    if (dirElem.length > 0) {
      return dirElem.reduce((acc, elem) => {
        const newAbsPath = path.join(paths, elem);
        return acc.concat(getMdFiles(newAbsPath)); // del callback del reduce
      }, []);
    }
  } else if (path.extname(paths) === '.md') {
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

const validLink = (arr) => fetch(arr.href)
  .then((res) => {
    const mystatus = res.status;
    const mymessage = res.status !== 200 ? 'FAIL' : res.statusText;
    const newObj = {
      ...arr,
      status: mystatus,
      message: mymessage,
    };
    return newObj;
  })
  .catch(() => {
    const mystatus = 'no status';
    const mymessage = 'FAIL';
    const newObj = {
      ...arr,
      status: mystatus,
      message: mymessage,
    };
    return newObj;
  });

module.exports = {
  absolutePath,
  validPath,
  getMdFiles,
  getMdLinks,
  validLink,
};
