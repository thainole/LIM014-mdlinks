const api = require('./api');

// Debería ser (path,options)
const mdLinks = (example) => {
  const absolutePath = api.resolvePath(example);
  const pathIsValid = api.validPath(absolutePath);

  if (pathIsValid === true) {
    return api.getMdFiles(absolutePath);
  }
};

// console.log(mdLinks('../LIM014-mdlinks'));

module.exports = mdLinks;
