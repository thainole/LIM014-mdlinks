/* eslint-disable quotes */
const mdLinks = require('../src/index.js');

describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  test('returns an array of href, text and file', () => {
    const obj = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md',
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md',
      },
    ];
    expect(mdLinks('../LIM014-mdlinks')).resolves.toEqual(obj);
  });

  test('returns an array of href, text and file when option is false', () => {
    const obj = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md',
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md',
      },
    ];
    expect(mdLinks('../LIM014-mdlinks', { validate: false })).resolves.toEqual(obj);
  });

  test('returns an array of all when option validate is true', () => {
    const obj = [{
      file: "D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md",
      href: "https://es.wikipedia.org/wiki/Markdown",
      message: "OK",
      status: 200,
      text: "Markdown",
    },
    {
      file: "D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md",
      href: "https://nodejs.org/",
      message: "OK",
      status: 200,
      text: "Node.js",
    }];
    expect(mdLinks('./README.md', { validate: true })).resolves.toBe(obj);
  });

  test('returns an error when path is not valid', () => {
    const err = 'The path is not valid. Try with another one.';
    return mdLinks('./REDME.md', { validate: true }).catch((error) => {
      expect(error).toEqual(err);
    });
  });
});
