const api = require('./api');

const mdLinks = (path, option) => new Promise((resolve, reject) => {
  const absPath = api.absolutePath(path);
  const pathIsValid = api.validPath(absPath);
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
      resolve(Promise.all(validatingLinks).then((values) => values));
    } else {
      resolve(getLinks);
    }
  }
});

/* mdLinks('./__test__/files', { validate: true })
  .then((result) => console.log(result))
  .catch((err) => console.log(err)); */

module.exports = mdLinks;
