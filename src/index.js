const api = require('./api');

// Debería ser (path,options)
const mdLinks = (example) => {
  const absPath = api.absolutePath(example);
  const pathIsValid = api.validPath(absPath);
  /* eslint no-new: "error" */
  const promise = new Promise((resolve, reject) => {
    if (pathIsValid === false) {
      reject();
    } else {
      const getFiles = api.getMdFiles(absPath);
      const getLinks = api.getMdLinks(getFiles);
      const arrHref = [];
      getLinks.forEach((arr) => {
        const links = arr.href;
        arrHref.push(links);
        return arrHref;
      });
      arrHref.forEach((link) => api.validLink(link));
      resolve();
    }
    return promise;
  });
};

console.log(mdLinks('../LIM014-mdlinks'));

module.exports = mdLinks;
