#!/usr/bin/env node

const mdLinks = require('./index.js');
const { brokenLinks, statsOnly, uniqueAndBroken } = require('./cli.js');

const arg = process.argv;
const path = arg[2];

if (arg.length === 5) {
  if (arg.includes('--stats' && '--validate')) {
    mdLinks(path, { validate: true })
      .then((res) => console.log(uniqueAndBroken(res)))
      .catch((err) => console.log(err));
  }
} else if (arg.length === 4) {
  if (arg[3] === '--stats') {
    mdLinks(path)
      .then((res) => console.log(statsOnly(res)))
      .catch((err) => console.log(err));
  } else if (arg[3] === '--validate') {
    mdLinks(path, { validate: true })
      .then((res) => console.log(brokenLinks(res)))
      .catch((err) => console.log(err));
  }
}
