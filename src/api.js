const path = require('path');
const fs = require('fs');

const fetch = require('node-fetch');

const absolutePath = (paths) => (path.isAbsolute(paths) ? paths : path.resolve(paths));
const validPath = (paths) => fs.existsSync(paths);

const getMdFiles = (paths) => {
  const elemArr = [];
  const infoPath = fs.statSync(paths);

  if (infoPath.isDirectory()) {
    const dirElem = fs.readdirSync(paths);
    if (dirElem.length > 0) {
      return dirElem.reduce((acc, elem) => {
        const newAbsPath = path.join(paths, elem);
        return acc.concat(getMdFiles(newAbsPath));
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

const getMdLinks = (paths) => {
  const linksArr = [];
  paths.forEach((myfile) => {
    const fileRead = fs.readFileSync(myfile, 'utf-8');
    const links = fileRead.match(regx);
    if (links) {
      links.forEach((link) => {
        const myhref = link.match(regxLink).join().slice(1, -1);
        const mytext = link.match(regxText).join().slice(1, -1);
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
