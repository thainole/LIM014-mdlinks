const api = require('./api');

const mdLinks = (path, option) => {
  const absPath = api.absolutePath(path);
  const pathIsValid = api.validPath(absPath);
  const promise = new Promise((resolve, reject) => {
    if (pathIsValid === false) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('The path is not valid. Try with another one.');
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
  .catch((err) => console.log(err));

module.exports = mdLinks;
