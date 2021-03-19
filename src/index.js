const api = require('./api');

// Debería ser (path,options)
const mdLinks = (example) => {
  const absPath = api.absolutePath(example);
  const pathIsValid = api.validPath(absPath);
  const promise = new Promise((resolve, reject) => {
    if (pathIsValid === false) {
      reject();
    } else {
      const getFiles = api.getMdFiles(absPath);
      const getLinks = api.getMdLinks(getFiles);
      getLinks.map((arr) => {
        const links = arr.href;
        const validating = api.validLink(links);
        return validating;
      });
      resolve();
    }
    return promise;
  });
};

console.log(mdLinks('../LIM014-mdlinks'));

module.exports = mdLinks;
