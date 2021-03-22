const api = require('./api');

// Debería ser (path,options)
const mdLinks = (path, option) => {
  const absPath = api.absolutePath(path);
  const pathIsValid = api.validPath(absPath);
  const promise = new Promise((resolve, reject) => {
    if (pathIsValid === false) {
      reject();
    } else {
      const getFiles = api.getMdFiles(absPath);
      const getLinks = api.getMdLinks(getFiles);
      if (option && option.validate === true) {
        const validatingLinks = getLinks.map((arr) => {
          const validating = api.validLink(arr);
          return validating;
        });
        Promise.all(validatingLinks).then((values) => {
          console.log(values);
        });
      } else {
        resolve(getLinks);
      }
    }
  });
  return promise;
};

mdLinks('../LIM014-mdlinks', { validate: true })
  .then((result) => console.log(result))
  .catch(console.error);

module.exports = mdLinks;
