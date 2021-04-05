#!/usr/bin/env node

const paths = require('path');
const chalk = require('chalk');
const mdLinks = require('./index.js');
const { brokenLinks, statsOnly } = require('./cli.js');

const arg = process.argv;
const path = arg[2];
const green = chalk.green.bold;
const blue = chalk.blue.bold;
const red = chalk.red.bold;
const magenta = chalk.magenta.bold;
const gray = chalk.gray.bold;

const tryOtherText = chalk.cyan('Try with --stats, --validate or both (--stats --validate).\nIn case you need some help, try with --help.');
const helpText = `
**********************************************************************************************************************************
Let me help you with the commands after the path:
${magenta('--stats')} is used to get the total number of links, and the ones that are not repeated (unique links).
${magenta('--validate')} is used to validate each link (if it is OK or FAIL, depending on the status), and also obtain its href, text, and file.
If you use both ${magenta('(--stats --validate)')} you can get the total of links, the uniques and broken ones.
In case you do not use any of them and ${chalk.italic('only insert the path')}, you will get just the href, text and file of each link.

**********************************************************************************************************************************
`;

if (arg.length === 5) {
  if (arg.includes('--stats' && '--validate')) {
    mdLinks(path, { validate: true })
      .then((res) => console.log(`${blue(statsOnly(res))}\n${red(brokenLinks(res))}`))
      .catch((err) => console.log(red(err)));
  } else {
    console.log(tryOtherText);
  }
} else if (arg.length === 4) {
  if (arg[3] === '--stats') {
    mdLinks(path)
      .then((res) => console.log(blue(statsOnly(res))))
      .catch((err) => console.log(red(err)));
  } else if (arg[3] === '--validate') {
    mdLinks(path, { validate: true })
      .then((res) => console.log(res.map((obj) => {
        const route = paths.relative(__dirname, obj.file);
        if (obj.text.length > 50) {
          return obj.text.slice(0, 50);
        }
        const status = obj.status === 200 ? green(obj.status) : red(obj.status);
        const statusText = obj.message === 'OK' ? green(obj.message) : red(obj.message);
        return `${gray(route)}  ${obj.href}  ${statusText}  ${status}  ${obj.text}`;
      }).join('\n')))
      .catch((err) => console.log(red(err)));
  } else if (arg[3] === '--help') {
    console.log(chalk.cyan(helpText));
  } else {
    console.log(tryOtherText);
  }
} else if (arg.length === 3) {
  mdLinks(path)
    .then((res) => console.log(res.map((obj) => {
      const route = paths.relative(__dirname, obj.file);
      return `${gray(route)}  ${chalk.cyan(obj.href)}  ${obj.text}`;
    }).join('\n')))
    .catch((err) => console.log(red(err)));
} else {
  console.log(tryOtherText);
}
