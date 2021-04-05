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
  } else {
    console.log('Try with --stats, --validate or both (--stats --validate).\nIn case you need some help, try with --help.');
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
  } else if (arg[3] === '--help') {
    console.log('Let me help you with the commands after the path:\n* --stats is used to get the total number of links, and the ones that are not repeated (unique links).');
    console.log('* --validate is used to validate each link (if it is OK or FAIL, depending on the status), and also obtain its href, text, and file.');
    console.log('* If you use both (--stats --validate), you could get the total of links, the uniques and broken ones.');
    console.log('* In case you do not use any of them and only insert the path, you will get just the href, text and file of each link.');
  } else {
    console.log('Try with --stats, --validate or both (--stats --validate).\nIn case you need some help, try with --help.');
  }
} else if (arg.length === 3) {
  mdLinks(path)
    .then((res) => console.log(res.map((obj) => {
      const route = paths.relative(path, obj.file);
      return `..\\${route}  ${obj.href}  ${obj.text}`;
    }).join('\n')))
    .catch((err) => console.log(err));
} else {
  console.log('Try with --stats, --validate or both (--stats --validate).\nIn case you need some help, try with --help.');
}
