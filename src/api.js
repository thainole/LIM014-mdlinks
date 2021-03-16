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

module.exports = {
  resolvePath,
  validPath,
  getMdFiles,
};
