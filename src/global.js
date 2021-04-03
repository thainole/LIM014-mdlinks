#!/usr/bin/env node

const paths = require('path');
const mdLinks = require('./index.js');
const { brokenLinks, statsOnly } = require('./cli.js');

const arg = process.argv;
const path = arg[2];

if (arg.length === 5) {
  if (arg.includes('--stats' && '--validate')) {
    mdLinks(path, { validate: true })
      .then((res) => console.log(`${statsOnly(res)} ${brokenLinks(res)}`))
      .catch((err) => console.log(err));
  }
} else if (arg.length === 4) {
  if (arg[3] === '--stats') {
    mdLinks(path)
      .then((res) => console.log(statsOnly(res)))
      .catch((err) => console.log(err));
  } else if (arg[3] === '--validate') {
    mdLinks(path, { validate: true })
      .then((res) => console.log(res.map((obj) => {
        const route = paths.relative(path, obj.file);
        return `..\\${route}  ${obj.href}  ${obj.message}  ${obj.status}  ${obj.text}`;
      }).join('\n')))
      .catch((err) => console.log(err));
  } else {
    console.log('Try with --stats, --validate or both.');
  }
} else if (arg.length === 3) {
  mdLinks(path)
    .then((res) => console.log(res.map((obj) => {
      const route = paths.relative(path, obj.file);
      return `..\\${route}  ${obj.href}  ${obj.text}`;
    }).join('\n')))
    .catch((err) => console.log(err));
}
