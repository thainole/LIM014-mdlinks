/* eslint-disable quotes */
const mdLinks = require('../src/index.js');

describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('returns an array of the md files when path is absolute', () => {
    const result = ["D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md"];
    expect(mdLinks('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks')).toStrictEqual(result);
  });

  it('returns an array of the md files when path is relative', () => {
    const result = ["D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md"];
    expect(mdLinks('../LIM014-mdlinks')).toStrictEqual(result);
  });
});
