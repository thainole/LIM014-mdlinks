const api = require('./api');

// Debería ser (path,options)
const mdLinks = (example) => {
  const absPath = api.absolutePath(example);
  const pathIsValid = api.validPath(absPath);
  if (pathIsValid === false) {
    console.log('The path is not valid');
  } else {
    const getFiles = api.getMdFiles(absPath);
    const getLinks = api.getMdLinks(getFiles);
    return getLinks;
  }
};

// console.log(mdLinks('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md'));
// console.log(mdLinks('../LIM014-mdlinks'));

module.exports = mdLinks;
