const path = require('path');
const fs = require('fs');
const jsdom = require('jsdom');
const marked = require('marked');
// const html = marked('# Marked in Node.js\n\nRendered by **marked**.')

const { JSDOM } = jsdom;

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

/* Funciones para leer archivos y extraer links */
const readFile = (file) => (fs.readFileSync(file, 'utf-8'));

/* Necesito convertir mi archivo a html, luego hacer un dom de eso y
Finalmente extraer los links */

const getLinks = (paths) => {
  const linksArr = [];
  const mdfiles = getMdFiles(paths);
  if (mdfiles.length > 0) {
    mdfiles.map((files) => {
      const filesRead = readFile(files);
      const html = marked(filesRead);
      const dom = new JSDOM(html);
      const tag = dom.window.document.querySelectorAll('a');
      tag.forEach((elem) => {
        const arrObj = {
          href: elem.getAttribute('href'),
          text: elem.innerHTML, // se puede usar tb textContent
          file: files,
        };
        return linksArr.push(arrObj);
      });
    });
  }
  return linksArr;
};

console.log(getLinks('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md'));

// console.log(getLinks('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md'));
module.exports = {
  resolvePath,
  validPath,
  getMdFiles,
};
